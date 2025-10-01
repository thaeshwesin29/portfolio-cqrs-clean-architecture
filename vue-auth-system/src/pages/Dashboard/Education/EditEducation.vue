<template>
  <div class="max-w-2xl mx-auto py-4">
    <h1 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
      Edit Education
    </h1>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-4 text-gray-900 dark:text-gray-100">
      Loading...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500 py-2">{{ error }}</div>

    <!-- Form -->
    <div v-else>
      <form
        @submit.prevent="updateEducation"
        class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 space-y-4"
      >
        <!-- Institution -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="institution"
          >
            Institution *
          </label>
          <input
            v-model="form.institution"
            id="institution"
            type="text"
            placeholder="Institution"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-300"
          />
        </div>

        <!-- Degree -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="degree"
          >
            Degree *
          </label>
          <input
            v-model="form.degree"
            id="degree"
            type="text"
            placeholder="Degree"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-300"
          />
        </div>

        <!-- Location -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="location"
          >
            Location
          </label>
          <input
            v-model="form.location"
            id="location"
            type="text"
            placeholder="Location"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-300"
          />
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
              for="start_date"
            >
              Start Date *
            </label>
            <input
              v-model="form.start_date"
              id="start_date"
              type="date"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>
          <div>
            <label
              class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
              for="end_date"
            >
              End Date
            </label>
            <input
              v-model="form.end_date"
              id="end_date"
              type="date"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-300"
            />
          </div>
        </div>

        <!-- Details -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="details"
          >
            Details
          </label>
          <textarea
            v-model="form.details"
            id="details"
            rows="3"
            placeholder="Details about your education"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-300"
          ></textarea>
        </div>

        <!-- Current Checkbox -->
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_current"
            v-model="form.is_current"
            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label for="is_current" class="text-sm text-gray-700 dark:text-gray-200">
            Currently studying here
          </label>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm disabled:opacity-50 transition"
          >
            {{ loading ? "Saving..." : "Update Education" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getEducation } from "@/api/queries/educationQuery";
import { updateEducation } from "@/api/commands/educationCommand";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const educationId = route.params.id as string;

    const form = ref({
      institution: "",
      degree: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false,
      details: "",
    });

    const loading = ref(false);
    const error = ref("");

    // Load education
    onMounted(async () => {
      loading.value = true;
      try {
        const edu = await getEducation(educationId);
        if (edu) {
          form.value = {
            institution: edu.institution,
            degree: edu.degree,
            location: edu.location,
            start_date: edu.start_date?.split("T")[0] || "",
            end_date: edu.end_date ? edu.end_date.split("T")[0] : "",
            is_current: edu.is_current || false,
            details: edu.details || "",
          };
        }
      } catch (err: any) {
        error.value = err.message || "Failed to load education";
      } finally {
        loading.value = false;
      }
    });

    // Update education
    const updateEducationHandler = async () => {
      loading.value = true;
      error.value = "";
      try {
        await updateEducation(educationId, form.value);
        router.push({ name: "DashboardEducation" }); // redirect to list page
      } catch (err: any) {
        error.value = err.message || "Failed to update education";
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      error,
      updateEducation: updateEducationHandler,
    };
  },
};
</script>
