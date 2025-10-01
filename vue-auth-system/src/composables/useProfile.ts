import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLocationStore } from '@/stores/location'
import { updateProfile } from '@/api/commands/authCommand'

export function useProfile() {
  const router = useRouter()
  const auth = useAuthStore()
  const locationStore = useLocationStore()

  const pageLoading = ref(true)

  const localUser = ref({
    ...auth.user,
    township_id: auth.user?.township_id?.toString() || '',
    ward_id: auth.user?.ward_id?.toString() || '',
    password: '',
    password_confirmation: '',
  })

  const townships = ref<any[]>([])
  const wards = ref<any[]>([])

  const getTownships = async () => {
    await locationStore.fetchTownships()
    townships.value = locationStore.townships
  }

  const getWards = async (townshipId: number | string) => {
    if (!townshipId) {
      wards.value = []
      return
    }
    await locationStore.fetchWards(Number(townshipId))
    wards.value = locationStore.wards
  }

  const init = async () => {
    pageLoading.value = true
    await getTownships()

    // Load wards for current township without clearing ward_id
    if (localUser.value.township_id) {
      await getWards(localUser.value.township_id)
    }

    pageLoading.value = false
  }

  onMounted(init)

  const update = async () => {
    try {
      const payload: any = {
        name: localUser.value.name?.trim(),
        email: localUser.value.email?.trim(),
        township_id: Number(localUser.value.township_id),
        ward_id: Number(localUser.value.ward_id),
      }

      if (localUser.value.password) {
        payload.password = localUser.value.password
        payload.password_confirmation = localUser.value.password_confirmation
      }

      console.log("Submitting payload:", payload)

      const res = await updateProfile(payload)

      if (res?.data?.user) {
        auth.user = { ...auth.user, ...res.data.user }
      }

      alert('Profile updated successfully!')
      router.push({ name: 'InformationView' })
    } catch (err: any) {
      console.error('Profile update failed:', err)
      if (err.response?.data?.errors) {
        alert('Validation failed: ' + JSON.stringify(err.response.data.errors))
      } else {
        alert('Profile update failed!')
      }
    }
  }

  return {
    auth,
    localUser,
    update,
    pageLoading,
    townships,
    wards,
    getTownships,
    getWards,
    init,
  }
}
