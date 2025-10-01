<template>
  <div class="max-w-2xl mx-auto py-4">
    <h1 class="text-lg font-semibold mb-3">Add New Experience</h1>

    <form
      @submit.prevent="submitForm"
      class="bg-white dark:bg-gray-800 shadow rounded-lg p-3 space-y-2"
    >
      <!-- Position -->
      <div>
        <label class="block text-sm font-medium mb-0.5">Position *</label>
        <input
          v-model="form.position"
          type="text"
          class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
        />
        <p v-if="errors.position" class="text-red-500 text-xs mt-0.5">
          {{ errors.position }}
        </p>
      </div>

      <!-- Company -->
      <div>
        <label class="block text-sm font-medium mb-0.5">Company *</label>
        <input
          v-model="form.company"
          type="text"
          class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
        />
        <p v-if="errors.company" class="text-red-500 text-xs mt-0.5">
          {{ errors.company }}
        </p>
      </div>

      <!-- Location -->
      <div>
        <label class="block text-sm font-medium mb-0.5">Location</label>
        <input
          v-model="form.location"
          type="text"
          class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
        />
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <label class="block text-sm font-medium mb-0.5">Start Date *</label>
          <input
            v-model="form.start_date"
            type="date"
            class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
          />
          <p v-if="errors.start_date" class="text-red-500 text-xs mt-0.5">
            {{ errors.start_date }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-0.5">End Date</label>
          <input
            v-model="form.end_date"
            type="date"
            class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
          />
        </div>
      </div>

      <!-- Responsibilities -->
      <div>
        <label class="block text-sm font-medium mb-0.5"
          >Responsibilities *</label
        >
        <textarea
          v-model="responsibilitiesText"
          rows="4"
          class="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm"
          placeholder="One responsibility per line"
        ></textarea>
        <p v-if="errors.responsibilities" class="text-red-500 text-xs mt-0.5">
          {{ errors.responsibilities }}
        </p>
      </div>

      <!-- Submit -->
      <div class="pt-2 flex items-center gap-1">
        <button
          type="submit"
          :disabled="submitting"
          class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm disabled:opacity-50 transition"
        >
          {{ submitting ? "Creating..." : "Create" }}
        </button>
        <RouterLink
          to="/dashboard/experience"
          class="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm transition"
          >Cancel</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { createExperience } from "@/api/commands/experienceCommand";
import type { ExperienceFormData } from "@/types/experience";

const router = useRouter();
const submitting = ref(false);
const errors = ref<Record<string, string>>({});

const form = ref<ExperienceFormData>({
  user_id: 1, // set dynamically if needed
  position: "",
  company: "",
  location: "",
  start_date: "",
  end_date: "",
  responsibilities: [],
});

const responsibilitiesText = ref("");

async function submitForm() {
  // Reset errors
  errors.value = {};

  // Required fields validation
  if (
    !form.value.position ||
    !form.value.company ||
    !form.value.start_date ||
    !responsibilitiesText.value.trim()
  ) {
    alert(
      "Please fill in required fields: Position, Company, Start Date, Responsibilities."
    );
    return;
  }

  // Convert responsibilities textarea to array
  form.value.responsibilities = responsibilitiesText.value
    .split("\n")
    .map((r) => r.trim())
    .filter((r) => r);

  submitting.value = true;

  try {
    const created = await createExperience(form.value);
    if (created) router.push("/dashboard/experience");
  } catch (err: any) {
    if (err.response?.status === 422 && err.response.data?.errors) {
      errors.value = err.response.data.errors;
    } else {
      alert(err.message || "Failed to create experience");
    }
  } finally {
    submitting.value = false;
  }
}
</script>
