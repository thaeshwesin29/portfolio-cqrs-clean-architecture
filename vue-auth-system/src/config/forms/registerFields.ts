// src/config/forms/registerFields.ts
export const registerFields = (townships: any[], wards: any[]) => [
  { model: 'name', type: 'text', label: 'Name', required: true },
  { model: 'email', type: 'email', label: 'Email', required: true },
  { model: 'password', type: 'password', label: 'Password', required: true },
  { model: 'password_confirmation', type: 'password', label: 'Confirm Password', required: true },
  {
    model: 'township_id',
    type: 'select',
    label: 'Township',
    placeholder: 'Select Township',
    options: townships.map(t => ({ label: t.name, value: t.id.toString() })),
    required: true
  },
  {
    model: 'ward_id',
    type: 'select',
    label: 'Ward',
    placeholder: 'Select Ward',
    options: wards.map(w => ({ label: w.name, value: w.id.toString() })),
    required: true
  }
]
