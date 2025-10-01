// src/composables/useRegister.ts
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getTownships, getWards } from '@/api/queries/locationQuery'
import { useErrorStore } from '@/stores/errorStore'
import { registerUser } from '@/api/commands/authCommand'
import { registerFields } from '@/config/forms/registerFields'
import { validateRegisterForm } from '@/utils/registerValidation'
import { handleApiError } from '@/utils/errorHandler'

interface Township { id: number; name: string }
interface Ward { id: string | number; name: string; township_id: number }

export interface RegisterForm {
  name: string
  email: string
  password: string
  password_confirmation: string
  township_id: string
  ward_id: string
}

export function useRegister() {
  const router = useRouter()
  const errorStore = useErrorStore()

  const form = ref<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    township_id: '',
    ward_id: '',
  })

  const townships = ref<Township[]>([])
  const wards = ref<Ward[]>([])

  const filteredWards = computed(() => {
    const selected = form.value.township_id
    if (!selected) return []
    return wards.value.filter(w => w.township_id.toString() === selected)
  })

  // Load townships on mount
  onMounted(async () => {
    errorStore.clearErrors()
    try {
      const tRes = await getTownships()
      townships.value = Array.isArray(tRes) ? tRes : []
    } catch (err) {
      console.error('Failed to fetch townships:', err)
    }
  })

  // Watch township change to reload wards
  watch(
    () => form.value.township_id,
    async (newVal) => {
      form.value.ward_id = ''
      if (!newVal) {
        wards.value = []
        return
      }
      try {
        const wRes = await getWards(Number(newVal))
        wards.value = Array.isArray(wRes) ? wRes : []
      } catch (err) {
        console.error('Failed to fetch wards:', err)
        wards.value = []
      }
    }
  )

  const handleRegister = async () => {
    errorStore.clearErrors()
    const validationErrors = validateRegisterForm(form.value)
    if (Object.keys(validationErrors).length) {
      errorStore.setValidationErrors(validationErrors)
      return
    }

    try {
      const payload = {
        ...form.value,
        township_id: Number(form.value.township_id),
        ward_id: Number(form.value.ward_id),
      }
      const res = await registerUser(payload)
      if (res?.data) router.push('/home/login')
      else errorStore.setGeneralError(res?.message || 'Registration failed')
    } catch (err) {
      handleApiError(err)
    }
  }

  return {
    form,
    townships,
    wards,
    filteredWards,
    fields: computed(() => registerFields(townships.value, filteredWards.value)),
    errorStore,
    handleRegister,
  }
}
