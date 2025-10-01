<template>
  <section class="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 py-24 px-6">
    <div class="max-w-7xl mx-auto space-y-16">

      <!-- Header -->
      <div class="text-center space-y-4">
        <h2 class="text-xl md:text-3xl font-bold leading-tight">
          My <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Education & Career</span>
        </h2>
        <p class="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          The journey of growth, learning, and building elegant software solutions.
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid lg:grid-cols-3 gap-8">
        <div v-for="(edu, index) in educations" :key="index"
             class="glass-card p-6 rounded-3xl border border-gray-700/20 hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
          
          <!-- Gradient Accent -->
          <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-60 transition-opacity rounded-3xl blur-xl"></div>

          <!-- Content -->
          <div class="relative z-10 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">{{ edu.period }}</span>
              <span class="text-xs text-gray-500 uppercase">{{ edu.type }}</span>
            </div>
            <h3 class="text-xl font-semibold text-white">{{ edu.title }}</h3>
            <h4 class="text-gray-300 font-medium">{{ edu.institution }}</h4>
            <p class="text-gray-400 text-sm leading-relaxed">{{ edu.details }}</p>
          </div>

          <!-- Decorative Dots -->
          <div class="absolute top-4 right-4 flex space-x-1">
            <span class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            <span class="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></span>
            <span class="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-1000"></span>
          </div>
        </div>
      </div>

      <!-- Footer Quote -->
      <blockquote class="text-center text-lg italic font-medium text-gray-300 border-l-4 border-gray-600 pl-4 mt-12 max-w-3xl mx-auto">
        “Continuous learning is the secret to creating <span class="text-gray-100">impactful software</span>.”
      </blockquote>
    </div>
  </section>
</template>

<script setup lang="ts">
const educations = [
  {
    period: '2017 – 2024',
    type: 'Education',
    title: 'B.C.Sc in Computer Science',
    institution: 'University of Computer Studies, Myanmar',
    details: 'Studied full-stack development, algorithms, and software architecture.',
  },
  {
    period: '2018',
    type: 'Volunteer',
    title: 'Myanmar IT-Camp',
    institution: 'Myanmar Volunteer Program',
    details: 'Mentored junior developers and participated in coding workshops.',
  },
  {
    period: '2023 – Present',
    type: 'Work',
    title: 'Full-Stack Developer',
    institution: 'ITVisionHub',
    details: 'Building scalable systems using Laravel, Vue.js, and modern architectures.',
  },
];
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
}
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-1000 { animation-delay: 1s; }
</style>
