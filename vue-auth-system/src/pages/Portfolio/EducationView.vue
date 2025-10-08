<template>
  <section
    class="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 py-24 px-6"
  >
    <div class="max-w-7xl mx-auto space-y-16">
      <!-- Header -->
      <div class="text-center space-y-4">
        <h2 class="text-xl md:text-3xl font-bold leading-tight">
          My
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400"
            >Education & Career</span
          >
        </h2>
        <p class="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          The journey of growth, learning, and building elegant software
          solutions.
        </p>
      </div>

      <!-- Full-page Loading -->
      <div v-if="loading" class="text-center py-20">
        <p class="text-gray-400 text-lg">Loading education records...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-400 text-lg">{{ error }}</p>
        <button
          @click="fetchEducations"
          class="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Empty -->
      <div v-else-if="educations.length === 0" class="text-center py-20">
        <p class="text-slate-400 text-lg">No education records available yet</p>
      </div>

      <!-- Cards Grid -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <div
          v-for="edu in educations"
          :key="edu.id"
          class="glass-card p-6 rounded-3xl border border-gray-700/20 hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
        >
          <!-- Gradient Accent -->
          <div
            class="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-60 transition-opacity rounded-3xl blur-xl"
          ></div>

          <!-- Content -->
          <div class="relative z-10 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">{{
                formatPeriod(edu.start_date, edu.end_date)
              }}</span>
              <span class="text-xs text-gray-500 uppercase">{{
                edu.type || "Education"
              }}</span>
            </div>
            <h3 class="text-xl font-semibold text-white">{{ edu.degree }}</h3>
            <h4 class="text-gray-300 font-medium">{{ edu.institution }}</h4>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ edu.details }}
            </p>
            <div v-if="edu.location" class="text-indigo-400 text-sm">
              📍 {{ edu.location }}
            </div>
          </div>

          <!-- Decorative Dots -->
          <div class="absolute top-4 right-4 flex space-x-1">
            <span
              class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
            ></span>
            <span
              class="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"
            ></span>
            <span
              class="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-1000"
            ></span>
          </div>
        </div>
      </div>

      <!-- Debug (optional) -->
      <!-- <pre class="text-xs text-gray-500 mt-6">{{ educations }}</pre> -->

      <!-- Footer Quote -->
      <blockquote
        class="text-center text-lg italic font-medium text-gray-300 border-l-4 border-gray-600 pl-4 mt-12 max-w-3xl mx-auto"
      >
        “Continuous learning is the secret to creating
        <span class="text-gray-100">impactful software</span>.”
      </blockquote>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  fetchEducationsOnce,
  educationStore,
  Education,
} from "@/stores/educationStore";

const educations = ref<Education[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

// Fetch data function
const fetchEducations = async () => {
  loading.value = true;
  error.value = null;

  try {
    await fetchEducationsOnce(); // fetch store
    educations.value = [...educationStore.educations]; // sync local ref
  } catch (err: any) {
    error.value = err?.message || "Failed to load education records";
  } finally {
    loading.value = false;
  }
};

// Format start/end date
const formatPeriod = (start?: string, end?: string) => {
  const startYear = start ? new Date(start).getFullYear() : "";
  const endYear = end ? new Date(end).getFullYear() : "";
  return startYear && endYear
    ? `${startYear} – ${endYear}`
    : startYear || endYear || "";
};

// Initial fetch
onMounted(fetchEducations);
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}
.animation-delay-500 {
  animation-delay: 0.5s;
}
.animation-delay-1000 {
  animation-delay: 1s;
}
</style>
