<template>
  <section class="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 py-20 px-6">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
      
      <!-- Left Side: Developer Illustration + Personal Details -->
      <div class="space-y-6">
        <!-- Profile Image -->
        <div class="relative">
          <div
            class="absolute -inset-2 bg-gradient-to-tr from-gray-700/30 to-gray-500/10 rounded-3xl blur-xl opacity-40"
          ></div>
          <div
            class="relative rounded-3xl overflow-hidden border border-white/10 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&q=80"
              alt="Developer Illustration"
              class="object-cover w-full h-full grayscale hover:grayscale-0 transition duration-700"
            />
          </div>
        </div>

        <!-- Personal Details Card -->
        <div class="glass-card p-6">
          <h3 class="text-2xl font-semibold text-white mb-4">Personal Details</h3>
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="w-28 text-gray-400 font-medium">Location:</span>
              <span class="text-gray-200">Yangon, Myanmar</span>
            </div>
            <div class="flex items-center">
              <span class="w-28 text-gray-400 font-medium">Languages:</span>
              <span class="text-gray-200">English, Burmese, Japanese</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Content -->
      <div class="space-y-10">
        <!-- Header -->
        <div>
          <h2 class="text-xl md:text-3xl font-bold leading-tight">
            About <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Me</span>
          </h2>
          <p class="mt-4 text-lg text-gray-400 leading-relaxed">
            I’m <span class="font-semibold text-white">Thae Shwe Sin</span>, a
            <span class="text-gray-200">Full-Stack Developer</span> specializing in
            <span class="text-gray-200">Laravel</span>, <span class="text-gray-200">Vue.js</span>, and
            <span class="text-gray-200">modern architectures</span>.  
            I build scalable systems with performance, security, and elegance at the core.
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-6">
          <div class="glass-card text-center">
            <div class="text-4xl font-bold text-gray-100">2+</div>
            <p class="text-sm text-gray-400">Years Experience</p>
          </div>
          <div class="glass-card text-center">
            <div class="text-4xl font-bold text-gray-100">8+</div>
            <p class="text-sm text-gray-400">Projects Completed</p>
          </div>
          <div class="glass-card text-center">
            <div class="text-4xl font-bold text-gray-100">15+</div>
            <p class="text-sm text-gray-400">Technologies</p>
          </div>
          <div class="glass-card text-center">
            <div class="text-4xl font-bold text-gray-100">100%</div>
            <p class="text-sm text-gray-400">Client Satisfaction</p>
          </div>
        </div>

        <!-- Timeline -->
        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-white">Career Journey</h3>
          <ul class="space-y-4 border-l border-gray-700 pl-6">
            <li>
              <p class="text-sm text-gray-400">2017–2024</p>
              <p class="text-gray-200 font-medium">B.C.Sc in Computer Science</p>
            </li>
            <li>
              <p class="text-sm text-gray-400">2018</p>
              <p class="text-gray-200 font-medium">Volunteer at Myanmar IT-Camp</p>
            </li>
            <li>
              <p class="text-sm text-gray-400">2023–Now</p>
              <p class="text-gray-200 font-medium">Full-Stack Developer @ ITVisionHub</p>
            </li>
          </ul>
        </div>

        <!-- Quote -->
        <blockquote class="text-lg italic font-medium text-gray-300 border-l-4 border-gray-600 pl-4">
          “Great software balances <span class="text-gray-100">clarity</span>, 
          <span class="text-gray-100">performance</span>, and 
          <span class="text-gray-100">human impact</span>.”
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup>
// Minimal, clean – no extra libs needed
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-3px);
}
</style>
