<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Dashboard Overview
      </h1>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        v-for="card in stats"
        :key="card.label"
        class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-sm text-gray-500 dark:text-gray-400">
            {{ card.label }}
          </h2>
          <component :is="card.icon" class="w-6 h-6 text-indigo-500" />
        </div>
        <p
          class="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          {{ card.value }}
        </p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
      <h2
        class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100"
      >
        Recent Activity
      </h2>

      <ul class="space-y-3">
        <li
          v-for="(activity, index) in activities"
          :key="index"
          class="p-3 rounded-md bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {{ activity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  FolderIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
} from '@heroicons/vue/24/outline'

interface Stat {
  label: string
  value: string | number
  icon: any
}

const stats = ref<Stat[]>([])
const activities = ref<string[]>([])

// Map API keys to icons
const iconMap: Record<string, any> = {
  total_projects: FolderIcon,
  total_education: AcademicCapIcon,
  total_experiences: BriefcaseIcon,
  hire_me: RocketLaunchIcon, // 🚀 Hire Me replaces Profile Views
}

const fetchDashboardStats = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/dashboard/stats')
    const data = await response.json()

    // Force add Hire Me stat
    data.hire_me = 'Available'

    // Map stats (exclude activities)
    stats.value = Object.entries(data)
      .filter(([key]) => key !== 'activities')
      .map(([key, value]) => ({
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: value as string | number,
        icon: iconMap[key] || RocketLaunchIcon,
      }))

    // Map activities
    activities.value = data.activities as string[]
  } catch (error) {
    console.error('Failed to fetch dashboard stats', error)
  }
}

onMounted(() => {
  fetchDashboardStats()
})
</script>
