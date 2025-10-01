// src/types/experience.ts

// -------------------------
// Data sent to API for create/update
// -------------------------
export interface ExperienceFormData {
  user_id: number               // ID of the user who owns this experience
  position: string              // Job position/title
  company: string               // Company name
  location: string              // Job location
  start_date: string            // Start date in YYYY-MM-DD format
  end_date?: string             // Optional end date
  responsibilities: string[]    // Array of responsibility descriptions
}

// -------------------------
// Full Experience returned from API
// -------------------------
export interface Experience extends ExperienceFormData {
  id: number                    // Unique experience ID
  created_at: string            // Timestamp of creation
  updated_at: string            // Timestamp of last update
}
