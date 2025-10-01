<template>
  <div class="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
    <h2 class="text-3xl font-bold text-indigo-600 mb-6">Change Password</h2>

    <!-- Error message -->
    <div v-if="error" class="p-3 mb-4 text-red-600 bg-red-100 rounded-xl">
      {{ error }}
    </div>

    <!-- Success message -->
    <div v-if="success" class="p-3 mb-4 text-green-600 bg-green-100 rounded-xl">
      {{ success }}
    </div>

    <form @submit.prevent="updatePassword" class="space-y-6">
      <!-- Current Password -->
      <div class="relative">
        <input
          v-model="current_password"
          :type="showCurrent ? 'text' : 'password'"
          placeholder="Current Password"
          class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition"
          @click="showCurrent = !showCurrent"
        >
          <component :is="showCurrent ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
        </button>
      </div>

      <!-- New Password -->
      <div class="relative">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="New Password"
          class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition"
          @click="showPassword = !showPassword"
        >
          <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
        </button>
      </div>

      <!-- Confirm Password -->
      <div class="relative">
        <input
          v-model="password_confirmation"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Confirm Password"
          class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <component :is="showConfirmPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
        </button>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
      >
        Update Password
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { updateUserPassword } from '@/api/commands/authCommand'

// State
const current_password = ref('')
const password = ref('')
const password_confirmation = ref('')
const error = ref<string | null>(null)
const success = ref<string | null>(null)

// Visibility toggles
const showCurrent = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Heroicons
const EyeIcon = defineAsyncComponent(() => import('@heroicons/vue/24/outline/EyeIcon.js'))
const EyeSlashIcon = defineAsyncComponent(() => import('@heroicons/vue/24/outline/EyeSlashIcon.js'))

// Update password
const updatePassword = async () => {
  error.value = null
  success.value = null

  if (!current_password.value || !password.value || !password_confirmation.value) {
    error.value = 'All fields are required.'
    return
  }

  if (password.value !== password_confirmation.value) {
    error.value = 'Passwords do not match.'
    return
  }

  try {
    await updateUserPassword({
      current_password: current_password.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })

    success.value = 'Password updated successfully!'
    current_password.value = ''
    password.value = ''
    password_confirmation.value = ''
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Failed to update password.'
  }
}
</script>
