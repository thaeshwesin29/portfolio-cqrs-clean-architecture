<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <component
      v-for="field in fields"
      :key="field.model"
      :is="getComponent(field.type)"
      v-model="form[field.model]"
      v-bind="field.props"
      :label="field.label"
      :placeholder="field.placeholder"
      :type="field.type"
      :options="field.options"
      :error="errors[field.model]"
    />

    <SubmitButton :loading="loading" class="w-full">
      {{ submitLabel }}
    </SubmitButton>
  </form>
</template>

<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import BaseTextarea from './BaseTextarea.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const props = defineProps({
  fields: { type: Array, required: true },
  form: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  submitLabel: { type: String, default: 'Submit' }
})

const emit = defineEmits(['submit'])

function getComponent(type: string) {
  const components: Record<string, any> = {
    select: BaseSelect,
    textarea: BaseTextarea
  }
  return components[type] || BaseInput
}

function handleSubmit() {
  emit('submit')
}
</script>
