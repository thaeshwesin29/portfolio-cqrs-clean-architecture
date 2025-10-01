<template>
  <section class="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 py-24 px-6">
    <div class="max-w-7xl mx-auto space-y-16">
      
      <!-- Section Header -->
      <div class="text-center space-y-4">
        <h2 class="text-xl md:text-3xl font-bold leading-tight">
          My Projects  
        </h2>
        <p class="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          A selection of my featured works, showcasing design, development, and creativity.
        </p>
      </div>

      <!-- Project Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="relative group rounded-3xl overflow-hidden border border-gray-700/20 bg-slate-900/60 backdrop-blur-md hover:scale-[1.02] transition-all duration-500 shadow-lg hover:shadow-amber-500/20"
        >
          <!-- Project Image -->
          <div class="relative w-full h-56">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>

            <!-- Title Overlay -->
            <h3 class="absolute bottom-4 left-5 text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
              {{ project.title }}
            </h3>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-4 relative z-10">
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex justify-between items-center pt-2">
              <span class="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-400/20">
                {{ project.category }}
              </span>
              <a
                :href="project.link"
                target="_blank"
                class="text-sm font-medium text-amber-400 hover:underline"
              >
                View →
              </a>
            </div>
          </div>

          <!-- Decorative Glow on Hover -->
          <div class="absolute -inset-1 bg-gradient-to-r from-amber-500/10 to-pink-500/10 opacity-0 group-hover:opacity-60 transition-opacity blur-xl rounded-3xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: "Portfolio Website",
    description: "A sleek and modern personal portfolio built with Vue.js and Tailwind.",
    image: "/images/portfolio.jpg",
    category: "Web Design",
    link: "#"
  },
  {
    title: "E-commerce Platform",
    description: "An end-to-end ecommerce solution with Laravel + Vue integration.",
    image: "/images/ecommerce.jpg",
    category: "Full Stack",
    link: "#"
  },
  {
    title: "Restaurant Invoice System",
    description: "Dynamic invoice management system tailored for restaurants.",
    image: "/images/invoice.jpg",
    category: "Business App",
    link: "#"
  }
]
</script>
