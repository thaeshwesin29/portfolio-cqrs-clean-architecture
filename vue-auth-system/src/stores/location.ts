import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTownships, getWards } from '@/api/queries/locationQuery'

export const useLocationStore = defineStore('location', () => {
  // Reactive state
  const townships = ref<{ id: number; name: string }[]>([])
  const wards = ref<{ id: number; name: string; township_id: number }[]>([])

  // Fetch all townships
  const fetchTownships = async () => {
    try {
      const data = await getTownships()
      townships.value = data
    } catch (err) {
      console.error('Failed to fetch townships:', err)
      townships.value = []
    }
  }

// Fetch wards for a given township
const fetchWards = async (townshipId: string | number) => {
  console.log("🔍 fetchWards CALLED with townshipId:", townshipId) // <--- debug log
  try {
    const id = Number(townshipId)
    const data = await getWards(id)
    console.log("✅ Wards fetched:", data) // <--- debug log
    wards.value = data
  } catch (err) {
    console.error('❌ Failed to fetch wards:', err)
    wards.value = []
  }
}

  return { townships, wards, fetchTownships, fetchWards }
})
