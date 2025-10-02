<template>
  <div class="flex items-center space-x-2">
    <input
      v-model="searchQuery"
      @keyup.enter="handleSearch"
      type="text"
      placeholder="Search..."
      class="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring focus:border-indigo-500"
    />
    <button
      @click="handleSearch"
      class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const searchQuery = ref("");
const emit = defineEmits<{
  (e: "search", query: string): void;
}>();

const handleSearch = () => {
  emit("search", searchQuery.value.trim());
};
</script>

<style scoped>
/* Optional custom styling */
</style>
