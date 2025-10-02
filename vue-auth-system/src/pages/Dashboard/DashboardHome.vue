<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Dashboard Overview
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your portfolio and projects
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <button 
          @click="fetchDashboardStats"
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>Refresh Data</span>
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="card in stats"
        :key="card.label"
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {{ card.label }}
          </h3>
          <component :is="card.icon" class="w-6 h-6 text-indigo-500" />
        </div>
        <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {{ card.value }}
        </p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Recent Activity
      </h2>
      
      <div class="space-y-3">
        <div
          v-for="(activity, index) in activities"
          :key="index"
          class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <div class="flex items-start">
            <div class="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p class="text-sm">{{ activity }}</p>
          </div>
        </div>
      </div>

      <div v-if="activities.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p>No recent activity</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="stats.length === 0 && !error" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
      <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Failed to load data</h3>
      <p class="text-red-600 dark:text-red-300 mb-4">{{ error }}</p>
      <button 
        @click="fetchDashboardStats"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Try Again
      </button>
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
const error = ref<string>('')
const isLoading = ref(true)

// Map API keys to icons
const iconMap: Record<string, any> = {
  total_projects: FolderIcon,
  total_education: AcademicCapIcon,
  total_experiences: BriefcaseIcon,
  hire_me: RocketLaunchIcon,
}

const fetchDashboardStats = async () => {
  try {
    error.value = ''
    isLoading.value = true
    
    const response = await fetch('http://localhost:8000/api/dashboard/stats')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
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
    activities.value = data.activities as string[] || []
    
  } catch (err) {
    console.error('Failed to fetch dashboard stats', err)
    error.value = err instanceof Error ? err.message : 'Failed to load dashboard data'
    
    // Fallback demo data for development
    stats.value = [
      { label: 'Total Projects', value: '12', icon: FolderIcon },
      { label: 'Total Education', value: '4', icon: AcademicCapIcon },
      { label: 'Total Experiences', value: '8', icon: BriefcaseIcon },
      { label: 'Hire Me', value: 'Available', icon: RocketLaunchIcon }
    ]
    activities.value = [
      'Created new project "Portfolio Website"',
      'Updated work experience at Tech Corp',
      'Added new certification to education',
      'Profile viewed 15 times this week'
    ]
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDashboardStats()
})
</script>

<style scoped>
/* Custom styles if needed */
</style>