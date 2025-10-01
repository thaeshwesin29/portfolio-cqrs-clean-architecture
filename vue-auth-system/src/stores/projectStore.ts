// src/stores/projectStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProjects } from '@/api/queries/projectQuery'
import type { Project } from '@/types/project'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  let fetched = false

  // Fetch projects once
  const fetchProjectsOnce = async () => {
    if (fetched) return
    loading.value = true
    error.value = null
    try {
      const data = await getProjects()
      projects.value = data ?? []
      fetched = true
    } catch (err: any) {
      error.value = err.message || 'Failed to load projects'
    } finally {
      loading.value = false
    }
  }

  // Update a project in the store
  const updateProjectInStore = (updatedProject: Project) => {
    const index = projects.value.findIndex(p => p.id === updatedProject.id)
    if (index !== -1) projects.value[index] = updatedProject
  }

  return { projects, loading, error, fetchProjectsOnce, updateProjectInStore }
})
