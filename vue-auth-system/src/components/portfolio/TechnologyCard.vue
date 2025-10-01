<!-- src/components/portfolio/TechnologyCard.vue -->
<template>
  <div class="glass-card p-6 rounded-2xl border border-gray-700/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
    <!-- Gradient Accent -->
    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-60 transition-opacity rounded-2xl blur-xl"></div>
    
    <!-- Content -->
    <div class="relative z-10 space-y-4">
      <div class="flex items-start justify-between">
        <div class="space-y-1">
          <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
            {{ name }}
          </h4>
          <span class="text-sm text-gray-400">{{ version }}</span>
        </div>
        <div :class="colorClasses[color]" class="w-3 h-3 rounded-full flex-shrink-0 animate-pulse"></div>
      </div>
      
      <p class="text-gray-300 text-sm leading-relaxed">
        {{ purpose }}
      </p>
      
      <div class="space-y-3">
        <h5 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Key Features</h5>
        <ul class="space-y-2">
          <li 
            v-for="feature in features" 
            :key="feature"
            class="text-gray-300 text-sm flex items-start gap-2 group-hover:text-gray-200 transition-colors"
          >
            <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Decorative Corner -->
    <div class="absolute top-3 right-3 w-2 h-2 rounded-full opacity-60" :class="colorClasses[color]"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  version: string
  purpose: string
  features: string[]
  color: string
}

defineProps<Props>()

const colorClasses: Record<string, string> = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  yellow: 'bg-yellow-500',
  cyan: 'bg-cyan-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  indigo: 'bg-indigo-500',
  gray: 'bg-gray-500'
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
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
</style>