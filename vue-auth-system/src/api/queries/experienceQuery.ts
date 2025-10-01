import { gql } from '@apollo/client/core'
import { gqlClient } from '../gql/client'

// -------------------------
// Get all experiences
// -------------------------
export const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      id
      position
      company
      location
      start_date
      end_date
      responsibilities
      created_at
      updated_at
    }
  }
`

export async function getExperiences(): Promise<any[]> {
  try {
    const { data } = await gqlClient.query({
      query: GET_EXPERIENCES,
      fetchPolicy: 'no-cache',
    })
    return Array.isArray(data.experiences) ? data.experiences : []
  } catch (err) {
    console.error('Error fetching experiences:', err)
    return []
  }
}

// -------------------------
// Get single experience by ID
// -------------------------
export const GET_EXPERIENCE_BY_ID = gql`
  query GetExperience($id: ID!) {
    experience(id: $id) {
      id
      user_id
      position
      company
      location
      start_date
      end_date
      responsibilities
      created_at
      updated_at
    }
  }
`

export async function getExperienceById(id: string | number): Promise<any | null> {
  try {
    const { data } = await gqlClient.query({
      query: GET_EXPERIENCE_BY_ID,
      variables: { id },
      fetchPolicy: 'no-cache',
    })
    return data.experience ?? null
  } catch (err) {
    console.error('Error fetching experience by ID:', err)
    return null
  }
}
