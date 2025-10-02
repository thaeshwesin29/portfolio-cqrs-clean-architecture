<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-xl font-semibold mb-2">Search results</h2>
    <p class="text-sm text-gray-500 mb-4">Results for: <strong>"{{ query }}"</strong></p>

    <div v-if="loading" class="text-gray-500">Searching…</div>

    <div v-else>
      <div v-if="results.length === 0" class="text-gray-500">No results found.</div>

      <ul v-else class="space-y-2">
        <li v-for="item in results" :key="item.id" class="p-4 border rounded-md">
          <h3 class="font-medium">{{ item.title }}</h3>
          <p class="text-sm text-gray-600">{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = ref(String(route.query.q ?? ''))
const loading = ref(false)
const results = ref<Array<{ id: number; title: string; description: string }>>([])

// Replace with your real data source or API.
const mockData = [
  { id: 1, title: 'Portfolio website', description: 'Personal portfolio built with Vue & Tailwind.' },
  { id: 2, title: 'Invoice System', description: 'Restaurant invoice management system (Laravel).' },
  { id: 3, title: 'Auth System', description: 'Authentication and role-based access.' },
  { id: 4, title: 'Vue Dashboard', description: 'Dashboard with charts and filters.' },
]

// Perform a simple local "search" against mockData.
// Replace this function with an API call if desired.
async function doSearch() {
  const q = query.value.trim()
  if (!q) {
    results.value = []
    return
  }
  loading.value = true

  // simulate latency
  await new Promise(res => setTimeout(res, 250))

  const qLower = q.toLowerCase()
  results.value = mockData.filter(item =>
    item.title.toLowerCase().includes(qLower) ||
    item.description.toLowerCase().includes(qLower)
  )

  loading.value = false
}

// keep query synced when route changes
watch(
  () => route.query.q,
  (v) => {
    query.value = String(v ?? '')
    doSearch()
  }
)

// initial load
onMounted(() => {
  query.value = String(route.query.q ?? '')
  doSearch()
})
</script>
