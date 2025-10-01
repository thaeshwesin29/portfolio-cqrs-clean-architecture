<template>
  <div class="max-w-2xl mx-auto py-4">
    <h1 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
      Edit Experience
    </h1>

    <div v-if="loading" class="text-center py-4 text-gray-900 dark:text-gray-100">
      Loading...
    </div>

    <div v-else>
      <form
        @submit.prevent="updateExperience"
        class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 space-y-4"
      >
        <!-- Position -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="position"
          >
            Position *
          </label>
          <input
            v-model="form.position"
            id="position"
            type="text"
            placeholder="Position"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-300"
          />
        </div>

        <!-- Company -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="company"
          >
            Company *
          </label>
          <input
            v-model="form.company"
            id="company"
            type="text"
            placeholder="Company"
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

        <!-- Responsibilities -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Responsibilities
          </label>
          <div
            v-for="(item, index) in form.responsibilities"
            :key="index"
            class="flex items-center gap-2 mb-2"
          >
            <input
              v-model="form.responsibilities[index]"
              type="text"
              placeholder="Responsibility"
              class="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 dark:placeholder-gray-300"
            />
            <button type="button" @click="removeResponsibility(index)" class="text-red-500 text-sm">
              Remove
            </button>
          </div>
          <button type="button" @click="addResponsibility" class="text-blue-500 text-sm">
            Add Responsibility
          </button>
        </div>

        <!-- Submit -->
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm disabled:opacity-50 transition"
          >
            {{ loading ? "Saving..." : "Update Experience" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getExperienceById } from "@/api/queries/experienceQuery";
import { updateExperienceCommand } from "@/api/commands/experienceCommand";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter(); // ✅ router is now defined
    const experienceId = route.params.id as string;

    const form = ref({
      position: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      responsibilities: [] as string[],
    });

    const loading = ref(false);
    const error = ref(""); // ✅ error is now defined

    onMounted(async () => {
      loading.value = true;
      try {
        const exp = await getExperienceById(experienceId);
        if (exp) {
          form.value = {
            position: exp.position,
            company: exp.company,
            location: exp.location,
            start_date: exp.start_date.split("T")[0],
            end_date: exp.end_date ? exp.end_date.split("T")[0] : "",
            responsibilities: exp.responsibilities || [],
          };
        }
      } catch (err: any) {
        error.value = err.message || "Failed to load experience data";
      } finally {
        loading.value = false;
      }
    });

    const addResponsibility = () => form.value.responsibilities.push("");
    const removeResponsibility = (index: number) =>
      form.value.responsibilities.splice(index, 1);

    const updateExperience = async () => {
      loading.value = true;
      error.value = "";
      try {
        await updateExperienceCommand(experienceId, form.value);
        router.push('/dashboard/experience');
      } catch (err: any) {
        error.value = err.message || "Failed to update experience";
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      error,
      addResponsibility,
      removeResponsibility,
      updateExperience, // ✅ must return to use in template
    };
  },
};
</script>
