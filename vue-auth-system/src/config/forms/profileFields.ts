// src/config/forms/profileFields.ts
import type { Field } from '@/types/formTypes'

export const profileFields = (
  townships: { label: string; value: string }[],
  wards: { label: string; value: string }[],
  isDisabled: boolean
): Field[] => [
  {
    model: 'name',
    type: 'text',
    label: 'Name',
    required: true,
    props: { disabled: isDisabled },
  },
  {
    model: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    props: { disabled: isDisabled },
  },
  {
    model: 'township_id',
    type: 'select',
    label: 'Township',
    placeholder: 'Select Township',
    options: townships,
    required: true,
    props: { disabled: isDisabled },
  },
  {
    model: 'ward_id',
    type: 'select',
    label: 'Ward',
    placeholder: 'Select Ward',
    options: wards,
    required: true,
    props: { disabled: isDisabled },
  },
]
