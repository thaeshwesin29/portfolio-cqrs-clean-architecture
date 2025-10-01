<template>
  <div class="max-w-2xl mx-auto py-4">
    <h1 class="text-lg font-semibold mb-3">Create Education</h1>

    <!-- Form -->
    <form
      @submit.prevent="submitForm"
      class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 space-y-3"
    >
      <!-- Institution -->
      <div>
        <label class="block text-sm font-medium mb-0.5" for="institution">Institution *</label>
        <input
          v-model="form.institution"
          id="institution"
          type="text"
          placeholder="Institution name"
          class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
        />
        <p v-if="errors.institution" class="text-red-500 text-xs mt-0.5">{{ errors.institution }}</p>
      </div>

      <!-- Degree -->
      <div>
        <label class="block text-sm font-medium mb-0.5" for="degree">Degree *</label>
        <input
          v-model="form.degree"
          id="degree"
          type="text"
          placeholder="Degree"
          class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
        />
        <p v-if="errors.degree" class="text-red-500 text-xs mt-0.5">{{ errors.degree }}</p>
      </div>

      <!-- Location -->
      <div>
        <label class="block text-sm font-medium mb-0.5" for="location">Location</label>
        <input
          v-model="form.location"
          id="location"
          type="text"
          placeholder="Location"
          class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
        />
        <p v-if="errors.location" class="text-red-500 text-xs mt-0.5">{{ errors.location }}</p>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label class="block text-sm font-medium mb-0.5" for="start_date">Start Date *</label>
          <input
            v-model="form.start_date"
            id="start_date"
            type="date"
            class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
          />
          <p v-if="errors.start_date" class="text-red-500 text-xs mt-0.5">{{ errors.start_date }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-0.5" for="end_date">End Date</label>
          <input
            v-model="form.end_date"
            id="end_date"
            type="date"
            class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
          />
          <p v-if="errors.end_date" class="text-red-500 text-xs mt-0.5">{{ errors.end_date }}</p>
        </div>
      </div>

      <!-- Details -->
      <div>
        <label class="block text-sm font-medium mb-0.5" for="details">Details</label>
        <textarea
          v-model="form.details"
          id="details"
          rows="3"
          placeholder="Details"
          class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
        ></textarea>
        <p v-if="errors.details" class="text-red-500 text-xs mt-0.5">{{ errors.details }}</p>
      </div>

      <!-- Current Checkbox -->
      <div class="flex items-center gap-2">
        <input type="checkbox" id="is_current" v-model="form.is_current" class="w-4 h-4"/>
        <label for="is_current" class="text-sm font-medium">Current</label>
      </div>

      <!-- Submit & Cancel -->
      <div class="pt-2 flex items-center gap-2">
        <button
          type="submit"
          :disabled="submitting"
          class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm disabled:opacity-50 transition"
        >
          {{ submitting ? "Creating..." : "Create" }}
        </button>
        <RouterLink
          to="/dashboard/education"
          class="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm transition"
        >
          Cancel
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { createEducation } from "@/api/commands/educationCommand";
import type { EducationFormData } from "@/types/education";

const router = useRouter();
const submitting = ref(false);

const form = ref<EducationFormData>({
  user_id: 6, // default user
  institution: "",
  degree: "",
  location: "",
  start_date: "",
  end_date: "",
  is_current: false,
  details: "",
});

const errors = ref<Record<string, string>>({});

async function submitForm() {
  errors.value = {};
  if (!form.value.institution || !form.value.degree || !form.value.start_date) {
    alert("Please fill required fields: Institution, Degree, Start Date.");
    return;
  }

  submitting.value = true;

  try {
    const created = await createEducation(form.value);
    if (created) router.push("/dashboard/education");
  } catch (err: any) {
    console.error("Error creating education:", err);
    alert(err.message || "Failed to create education");
  } finally {
    submitting.value = false;
  }
}
</script>
