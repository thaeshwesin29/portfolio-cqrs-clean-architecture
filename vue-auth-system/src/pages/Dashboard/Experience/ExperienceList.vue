<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Experiences</h1>
      <RouterLink
        to="/dashboard/experience/create"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
      >
        + New Experience
      </RouterLink>
    </div>

    <!-- Loading / Error -->
    <div v-if="loading" class="text-center py-10 text-gray-900 dark:text-gray-100">
      Loading experiences...
    </div>
    <div v-else-if="error" class="text-center py-10 text-red-500">{{ error }}</div>

    <!-- Table -->
    <div v-else class="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
      <table class="min-w-full text-sm text-left text-gray-900 dark:text-gray-100">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
          <tr>
            <th class="px-6 py-3">Position</th>
            <th class="px-6 py-3">Company</th>
            <th class="px-6 py-3">Location</th>
            <th class="px-6 py-3">Duration</th>
            <th class="px-6 py-3">Responsibilities</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="fade-slide">
          <tr
            v-for="exp in paginatedExperiences"
            :key="exp.id"
            class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <td class="px-6 py-4 font-medium">{{ exp.position }}</td>
            <td class="px-6 py-4">{{ exp.company }}</td>
            <td class="px-6 py-4">{{ exp.location }}</td>
            <td class="px-6 py-4">
              {{ formatDate(exp.start_date) }} - {{ exp.end_date ? formatDate(exp.end_date) : 'Present' }}
            </td>
            <td class="px-6 py-4 line-clamp-2" :title="exp.responsibilities">{{ exp.responsibilities }}</td>
            <td class="px-6 py-4 text-right space-x-2">
              <RouterLink :to="`/dashboard/experience/edit/${exp.id}`" class="text-indigo-600 hover:text-indigo-800">
                <PencilIcon class="w-5 h-5 inline" />
              </RouterLink>
              <button class="text-red-600 hover:text-red-800" @click="confirmDelete(exp.id)">
                <TrashIcon class="w-5 h-5 inline" />
              </button>
            </td>
          </tr>
        </transition-group>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center p-4 text-gray-900 dark:text-gray-100">
        <button @click="goToPage(currentPage-1)" :disabled="currentPage===1" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="goToPage(currentPage+1)" :disabled="currentPage===totalPages" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">Next</button>
      </div>
    </div>

    <!-- Delete Modal -->
    <DeleteModal v-if="showDeleteModal" @confirm="deleteExperience" @cancel="showDeleteModal=false" />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { gqlClient } from '@/api/gql/client'
import { GET_EXPERIENCES } from '@/api/queries/experienceQuery'
import { RouterLink } from 'vue-router'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import DeleteModal from '@/components/Dashboard/DeleteModal.vue'
import { deleteExperience as deleteExperienceCommand } from '@/api/commands/experienceCommand'
import type { Experience } from '@/types/experience'

// Data
const experiences = ref<Experience[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Pagination
const currentPage = ref(1)
const perPage = ref(5)
const totalPages = ref(1)

const sortedExperiences = computed(() => [...experiences.value].sort((a,b) => b.id - a.id))
const paginatedExperiences = computed(() => {
  const start = (currentPage.value-1)*perPage.value
  return sortedExperiences.value.slice(start, start + perPage.value)
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// Responsibilities expansion
const expandedResponsibilities = ref<Record<number, boolean>>({})
function toggleResponsibilities(id: number) {
  expandedResponsibilities.value[id] = !expandedResponsibilities.value[id]
}

// Load experiences
async function loadExperiences() {
  loading.value = true
  error.value = null
  try {
    const { data } = await gqlClient.query({ query: GET_EXPERIENCES, fetchPolicy: 'no-cache' })
    experiences.value = data.experiences ?? []
    totalPages.value = Math.ceil(experiences.value.length / perPage.value)
  } catch (err: any) {
    error.value = err.message || 'Failed to load experiences'
  } finally {
    loading.value = false
  }
}

// Delete experience
const showDeleteModal = ref(false)
let experienceToDelete: number | null = null

function confirmDelete(id: number) {
  experienceToDelete = id
  showDeleteModal.value = true
}

async function deleteExperience() {
  if (!experienceToDelete) return
  await deleteExperienceCommand(experienceToDelete)
  showDeleteModal.value = false
  experienceToDelete = null
  loadExperiences()
}

// Format date
function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })
}

onMounted(loadExperiences)
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from,
.fade-slide-leave-to { opacity: 0; transform: translateY(10px); }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
