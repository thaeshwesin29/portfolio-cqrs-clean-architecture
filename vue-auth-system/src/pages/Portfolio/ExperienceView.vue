<template>
  <section class="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 py-24 px-6 overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center space-y-4 mb-20">
        <h2 class="text-lg md:text-3xl font-bold leading-tight">
          Professional <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Experience</span>
        </h2>
        <p class="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          My journey in crafting innovative solutions and building impactful software
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-8">
        <ExperienceSkeleton v-for="n in 3" :key="n" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-20">
        <div class="glass-card p-12 rounded-3xl text-center max-w-md relative overflow-hidden group">
          <div class="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-60 rounded-3xl blur-xl"></div>
          <div class="relative z-10 space-y-6">
            <div class="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <span class="text-3xl">⚠️</span>
            </div>
            <p class="text-gray-300 text-lg">{{ error }}</p>
            <button
              @click="fetchExperiences"
              class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-indigo-500/50"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>

      <!-- Timeline Content -->
      <div v-else class="relative">
        <!-- Center Timeline Line -->
        <div class="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-pink-500/50"></div>

        <!-- Experience Cards -->
        <div class="space-y-16 lg:space-y-24">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.id"
            class="relative"
          >
            <!-- Timeline Dot (Desktop) -->
            <div class="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 z-20">
              <div class="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse shadow-lg shadow-indigo-500/50">
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-ping opacity-75"></div>
              </div>
            </div>

            <!-- Card Container -->
            <div 
              class="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
              :class="index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'"
            >
              <!-- Card Content -->
              <div 
                class="glass-card p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group"
                :class="index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'"
              >
                <!-- Gradient Accent -->
                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-60 transition-opacity rounded-3xl blur-xl"></div>

                <!-- Content -->
                <div class="relative z-10 space-y-5">
                  <!-- Header -->
                  <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-gray-700/50">
                    <div class="space-y-2">
                      <h3 class="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {{ exp.position }}
                      </h3>
                      <div class="flex items-center gap-2 text-gray-400">
                        <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <p class="font-medium">{{ exp.company }}</p>
                        <span v-if="exp.location" class="text-gray-500">• {{ exp.location }}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50 whitespace-nowrap">
                      <span>📅</span>
                      <span>{{ exp.start_date || 'Unknown' }} - {{ exp.end_date || 'Present' }}</span>
                    </div>
                  </div>

                  <!-- Responsibilities -->
                  <div v-if="exp.responsibilities && exp.responsibilities.length > 0" class="space-y-3">
                    <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <span class="w-6 h-0.5 bg-indigo-500"></span>
                      Key Achievements
                    </h4>
                    <ul class="space-y-3">
                      <li 
                        v-for="(duty, idx) in exp.responsibilities" 
                        :key="idx"
                        class="flex items-start gap-3 text-gray-300 group-hover:text-gray-200 transition-colors"
                      >
                        <span class="flex-shrink-0 w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2"></span>
                        <span class="leading-relaxed">{{ duty }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Decorative Elements -->
                <div class="absolute top-4 right-4 flex space-x-1 opacity-60">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                  <span class="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></span>
                  <span class="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-1000"></span>
                </div>
              </div>

              <!-- Year Badge (Desktop) -->
              <div 
                class="hidden lg:flex items-center justify-center"
                :class="index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-2'"
              >
                <div class="glass-card px-8 py-4 rounded-2xl border border-gray-700/30 hover:scale-110 transition-transform duration-300">
                  <p class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    {{ extractYear(exp.start_date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Quote -->
      <blockquote v-if="!loading && !error && experiences.length > 0" class="text-center text-lg italic font-medium text-gray-300 border-l-4 border-indigo-600 pl-4 mt-20 max-w-3xl mx-auto">
        "Every challenge is an opportunity to <span class="text-gray-100">grow and innovate</span>."
      </blockquote>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { experienceStore } from '@/stores/experienceStore'
import ExperienceSkeleton from '@/components/experience/ExperienceSkeleton.vue'

const store = experienceStore()

const experiences = computed(() => store.experiences)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

onMounted(() => store.fetchExperiencesOnce())
const fetchExperiences = () => store.fetchExperiencesOnce()

const extractYear = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A'
  const year = dateString.match(/\d{4}/)
  return year ? year[0] : dateString
}
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
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
  border-color: rgba(99, 102, 241, 0.3);
}

.animation-delay-500 { 
  animation-delay: 0.5s; 
}

.animation-delay-1000 { 
  animation-delay: 1s; 
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>