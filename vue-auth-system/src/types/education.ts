// src/types/education.ts

// Full education record returned from API
export interface Education {
  id: number | string
  user_id: number | string | null  // sometimes nullable
  institution: string
  degree: string
  location: string
  start_date: string
  end_date: string | null
  is_current: boolean
  details: string
  created_at: string
  updated_at: string
}

// Form data (used for create/update commands)
export interface EducationFormData {
  user_id?: number | string         // optional for forms, defaulted in commands
  institution: string
  degree: string
  location: string
  start_date: string
  end_date: string | null
  is_current?: boolean
  details: string
}
