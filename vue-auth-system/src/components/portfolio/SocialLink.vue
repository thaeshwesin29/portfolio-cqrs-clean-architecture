<template>
  <a 
    :href="url" 
    target="_blank" 
    :title="title"
    class="w-9 h-9 bg-gray-800 flex items-center justify-center rounded-md hover:bg-indigo-700 transition-colors"
  >
    <!-- GitHub Icon -->
    <svg v-if="icon === 'github'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>

    <!-- LinkedIn Icon -->
    <svg v-else-if="icon === 'linkedin'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>

    <!-- Email Icon -->
    <svg v-else-if="icon === 'mail'" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>

    <!-- Telegram Icon -->
    <svg v-else-if="icon === 'telegram'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.049 15.944l-.395 3.354c.566 0 .812-.243 1.105-.536l2.655-2.526 5.506 4.02c1.01.556 1.738.266 2.006-.947l3.636-16.994c.339-1.574-.571-2.23-1.551-1.847L1.516 9.574c-1.545.611-1.525 1.485-.27 1.847l4.564 1.418L17.085 4.52c.826-.63 1.587-.284.969.347L9.049 15.944z"/>
    </svg>

    <!-- Twitter Icon -->
    <svg v-else-if="icon === 'twitter'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.95-2.45 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.72 4.13A12.8 12.8 0 013 4s-4 9 5 13a13 13 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>

        <!-- Facebook Icon -->
    <svg v-else-if="icon === 'facebook'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.412c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.765v2.314h3.587l-.467 3.696h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.324V1.325C24 .593 23.406 0 22.675 0z"/>
    </svg>


    <!-- Default/Portfolio Icon -->
    <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9V3"/>
    </svg>
  </a>
</template>

<script setup lang="ts">
interface Props {
  url: string
  icon: 'github' | 'linkedin' | 'mail' | 'telegram' | 'twitter' | 'portfolio' | string
  title?: string
}

defineProps<Props>()
</script>
