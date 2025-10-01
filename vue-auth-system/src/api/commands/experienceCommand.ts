// src/api/commands/experienceCommand.ts
import type { ExperienceFormData, Experience } from '../../types/experience'
import { commandApi, withCsrf } from '../axios'
import { ROUTES } from '../routes'

// Generic wrapper for commands
async function executeCommand<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn()
  } catch (error) {
    console.error('Experience command failed:', error)
    return null
  }
}

// -------------------------
// Create Experience
// -------------------------
export const createExperience = (data: ExperienceFormData): Promise<Experience | null> =>
  executeCommand(() =>
    withCsrf(() =>
      commandApi.post<Experience>(ROUTES.experiences.list, data)
    ).then(res => res.data)
  )

// -------------------------
// Update Experience
// -------------------------
export const updateExperienceCommand = (id: number | string, data: ExperienceFormData): Promise<Experience | null> =>
  executeCommand(() =>
    withCsrf(() =>
      commandApi.put<Experience>(ROUTES.experiences.item(id), data)
    ).then(res => res.data)
  )

// -------------------------
// Delete Experience
// -------------------------
export const deleteExperience = (id: number | string): Promise<boolean> =>
  executeCommand(() =>
    withCsrf(() =>
      commandApi.delete(ROUTES.experiences.item(id))
    ).then(() => true)
  ).then(res => !!res)
