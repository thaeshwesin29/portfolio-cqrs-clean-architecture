<template>
  <section class="p-6">
    <SearchBar @search="performSearch" />

    <div v-if="loading" class="mt-4 text-gray-500">Loading...</div>

    <div v-else class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="item in results"
        :key="item.module + '-' + item.id"
        class="border p-4 rounded shadow hover:shadow-md transition"
      >
        <h3 class="font-bold text-lg">{{ item.title }}</h3>
        <p class="text-gray-600 mt-2">{{ item.description }}</p>
        <span class="text-sm text-gray-400 mt-1 block">{{ item.module }}</span>
      </div>
    </div>

    <div v-if="results.length === 0 && !loading" class="mt-4 text-gray-500">
      No results found.
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import SearchBar from "@/components/Dashboard/SearchBar.vue";

interface SearchItem {
  id: number | null;
  title: string;
  description: string;
  module: string;
}

const loading = ref(false);
const results = ref<SearchItem[]>([]);

// ✅ Set API base URL
const __API_BASE__ = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Make sure Axios sends credentials for Sanctum
axios.defaults.withCredentials = true;

// Fetch data for all modules
const fetchAllData = async (query: string) => {
  loading.value = true;

  const endpoints = [
    { url: "/projects", module: "Project", titleField: "name", descField: "description" },
    { url: "/educations", module: "Education", titleField: "degree", descField: "description" },
    { url: "/experiences", module: "Experience", titleField: "position", descField: "description" },
    { url: "/contact-messages", module: "Hire Me", titleField: "name", descField: "message", requiresAuth: true },
  ];

  const allItems: SearchItem[] = [];

  for (const ep of endpoints) {
    try {
      const res = await axios.get(`${__API_BASE__}/api/projects`, {
    params: query ? { q: query } : {},
      });

      const dataArray: any[] = Array.isArray(res.data) ? res.data : res.data?.data ?? [];

      dataArray.forEach(item => {
        allItems.push({
          id: item.id || null,
          title: item[ep.titleField] || "No title",
          description: item[ep.descField] || "",
          module: ep.module,
        });
      });
    } catch (err: any) {
      if (err.response?.status === 401) console.warn(`Unauthorized access to ${ep.module}.`);
      else console.error(`Error fetching ${ep.module} data:`, err);
    }
  }

  loading.value = false;
  results.value = allItems;
};

// Called when SearchBar emits a search
const performSearch = async (query: string) => {
  console.log('Searching for:', query); // Debug
  await fetchAllData(query);
};

// Initial load
fetchAllData("");
</script>
