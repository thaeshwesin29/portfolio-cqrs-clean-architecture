// src/api/queries/educationQuery.ts
import { gql } from '@apollo/client/core'
import { gqlClient } from '../gql/client'
import type { Education } from '@/types/education'

// =====================
// GraphQL Queries
// =====================

export const GET_EDUCATIONS = gql`
  query GetEducations {
    educations {
      id
      user_id
      institution
      degree
      location
      start_date
      end_date
      is_current
      details
      created_at
      updated_at
    }
  }
`

export const GET_EDUCATION = gql`
  query GetEducation($id: ID!) {
    education(id: $id) {
      id
      user_id
      institution
      degree
      location
      start_date
      end_date
      is_current
      details
      created_at
      updated_at
    }
  }
`

// =====================
// Functions
// =====================

/**
 * Fetch all education records
 */
export async function getEducations(): Promise<Education[]> {
  try {
    const { data } = await gqlClient.query<{ educations: Education[] }>({
      query: GET_EDUCATIONS,
      fetchPolicy: 'no-cache', // disable cache for fresh data
    })
    return Array.isArray(data.educations) ? data.educations : []
  } catch (err) {
    console.error('Error fetching educations:', err)
    return []
  }
}

/**
 * Fetch a single education record by ID
 */
export async function getEducation(id: number | string): Promise<Education | null> {
  try {
    const { data } = await gqlClient.query<{ education: Education | null }>({
      query: GET_EDUCATION,
      variables: { id },
      fetchPolicy: 'no-cache', // always fetch fresh data for edit form
    })
    return data.education ?? null
  } catch (err) {
    console.error(`Error fetching education ${id}:`, err)
    return null
  }
}
