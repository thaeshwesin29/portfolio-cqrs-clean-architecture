<template>
  <div class="max-w-2xl mx-auto mt-12 p-8 bg-gray-50 rounded-2xl shadow-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-indigo-600">Edit Profile</h2>
      <router-link
        to="/dashboard/settings/information"
        class="text-sm text-gray-500 hover:text-indigo-600 transition"
      >
        ← Back
      </router-link>
    </div>

    <!-- Loading Spinner -->
    <LoadingSpinner v-if="pageLoading" class="mx-auto" />

    <!-- Form -->
    <form v-else @submit.prevent="update" class="space-y-6">
      <!-- Name & Email -->
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <label class="block text-gray-700 mb-2">Name</label>
          <input
            v-model="localUser.name"
            type="text"
            placeholder="Your name"
            class="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Email</label>
          <input
            v-model="localUser.email"
            type="email"
            placeholder="Your email"
            class="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            required
          />
        </div>
      </div>

      <!-- Township & Ward -->
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <label class="block text-gray-700 mb-2">Township</label>
          <select
            v-model="localUser.township_id"
            @change="onTownshipChange(localUser.township_id)"
            class="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            required
          >
            <option value="">Select Township</option>
            <option v-for="t in townships" :key="t.id" :value="t.id">
              {{ t.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Ward</label>
          <select
            v-model="localUser.ward_id"
            class="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            required
          >
            <option value="">Select Ward</option>
            <option v-for="w in wards" :key="w.id" :value="w.id">
              {{ w.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Optional Password Update -->
      <div class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-2">New Password</label>
          <div class="relative">
            <input
              v-model="localUser.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Leave blank to keep current password"
              class="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition"
              @click="showPassword = !showPassword"
            >
              <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Confirm New Password</label>
          <div class="relative">
            <input
              v-model="localUser.password_confirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm new password"
              class="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <component :is="showConfirmPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
      >
        Save Changes
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { useProfile } from "@/composables/useProfile"
import { ref, defineAsyncComponent } from "vue"

const {
  auth,
  localUser,
  update,
  pageLoading,
  townships,
  wards,
  getWards,
} = useProfile()

// Password toggle
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Heroicons
const EyeIcon = defineAsyncComponent(() => import("@heroicons/vue/24/outline/EyeIcon.js"))
const EyeSlashIcon = defineAsyncComponent(() => import("@heroicons/vue/24/outline/EyeSlashIcon.js"))

// Update wards when township changes
const onTownshipChange = async (townshipId: number | string) => {
  await getWards(townshipId)
  // Reset ward only if user changes township
  localUser.value.ward_id = ''
}
</script>

<style scoped>
input,
select {
  transition: all 0.2s ease;
}
</style>
