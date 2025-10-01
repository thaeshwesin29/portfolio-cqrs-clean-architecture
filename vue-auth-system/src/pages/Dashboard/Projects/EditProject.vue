<template>
  <div class="max-w-2xl mx-auto py-4">
    <h1 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
      Edit Project
    </h1>

    <div v-if="loading" class="text-center py-4 text-gray-900 dark:text-gray-100">
      Loading...
    </div>
    <div v-else-if="error" class="text-red-500 py-2">{{ error }}</div>
    <div v-else>
      <form
        @submit.prevent="submitUpdate"
        class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 space-y-4"
      >
        <!-- Title -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="title"
            >Title *</label
          >
          <input
            v-model="form.title"
            id="title"
            type="text"
            placeholder="Project title"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="description"
            >Description</label
          >
          <textarea
            v-model="form.description"
            id="description"
            rows="3"
            placeholder="Project description"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <!-- Status -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            for="status"
            >Status *</label
          >
          <select
            v-model="form.status_id"
            id="status"
            class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select status</option>
            <option
              v-for="status in statuses"
              :key="status.id"
              :value="status.id"
            >
              {{ status.name }}
            </option>
          </select>
        </div>

        <!-- Technologies -->
        <div>
          <label
            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            >Technologies</label
          >
          <div class="flex flex-wrap gap-2">
            <label
              v-for="tech in allTechnologies"
              :key="tech.id"
              class="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-800 transition text-xs text-gray-900 dark:text-gray-100"
            >
              <input
                type="checkbox"
                class="mr-2"
                :value="tech.id"
                v-model="form.technology_ids"
              />
              {{ tech.name }}
            </label>
          </div>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
              for="start_date"
              >Start Date *</label
            >
            <input
              v-model="form.start_date"
              id="start_date"
              type="date"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
              for="end_date"
              >End Date</label
            >
            <input
              v-model="form.end_date"
              id="end_date"
              type="date"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <!-- Featured -->
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_featured"
            v-model="form.is_featured"
            class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label
            for="is_featured"
            class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >Featured Project</label
          >
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2">
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm disabled:opacity-50 transition"
          >
            {{ loading ? "Saving..." : "Save" }}
          </button>
          <RouterLink
            to="/dashboard/projects"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-lg text-sm transition text-gray-900 dark:text-gray-100"
          >
            Cancel
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { gqlClient } from "@/api/gql/client";
import { GET_PROJECT } from "@/api/queries/projectQuery";
import { GET_STATUSES } from "@/api/queries/statusQuery";
import { GET_TECHNOLOGIES } from "@/api/queries/technologyQuery";
import { updateProjectCommand } from "@/api/commands/projectCommand";
import { useProjectStore } from "@/stores/projectStore";
import type { Project, ProjectFormData } from "@/types/project";

const route = useRoute();
const router = useRouter();
const projectId = Number(route.params.id);

const form = ref<ProjectFormData>({
  title: "",
  description: "",
  status_id: "",
  technology_ids: [],
  start_date: "",
  end_date: "",
  is_featured: false,
});

const statuses = ref<{ id: number; name: string }[]>([]);
const allTechnologies = ref<{ id: number; name: string }[]>([]);
const loading = ref(false);
const error = ref("");

// Pinia store
const projectStore = useProjectStore();

onMounted(async () => {
  loading.value = true;
  try {
    // Load statuses
    const { data: statusData } = await gqlClient.query({
      query: GET_STATUSES,
      fetchPolicy: "no-cache",
    });
    statuses.value = statusData.statuses ?? [];

    // Load technologies
    const { data: techData } = await gqlClient.query({
      query: GET_TECHNOLOGIES,
      fetchPolicy: "no-cache",
    });
    allTechnologies.value = techData.technologies ?? [];

    // Load project
    const { data: projectData } = await gqlClient.query({
      query: GET_PROJECT,
      variables: { id: projectId },
      fetchPolicy: "no-cache",
    });
    const project: Project = projectData.project;

    form.value.title = project.title;
    form.value.description = project.description ?? "";
    form.value.status_id = project.status?.id ? String(project.status.id) : "";
    form.value.technology_ids = project.technologies?.map((t) => t.id) ?? [];
    form.value.start_date = project.start_date;
    form.value.end_date = project.end_date;
    form.value.is_featured = project.is_featured;
  } catch (err: any) {
    error.value = err.message || "Failed to load project data";
  } finally {
    loading.value = false;
  }
});

async function submitUpdate() {
  loading.value = true;
  error.value = "";
  try {
    const updatedProject = await updateProjectCommand(projectId, {
      ...form.value,
      status_id: Number(form.value.status_id),
    });

    // Update project in store
    projectStore.updateProjectInStore(updatedProject);

    router.push("/dashboard/projects");
  } catch (err: any) {
    error.value = err.message || "Failed to update project";
  } finally {
    loading.value = false;
  }
}
</script>
