<template>
  <section
    class="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 text-gray-100 py-24 px-6 overflow-hidden"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto space-y-16">
      <!-- Section Header -->
      <div class="text-center space-y-6 relative z-10">
        <h2 class="text-xl md:text-3xl font-bold leading-tight text-gray-100">
          My <span class="text-white">Projects</span>
        </h2>
        <p class="mt-6 text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          A selection of my featured works, showcasing design, development, and creativity.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCardSkeleton v-for="n in 6" :key="n" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-400">{{ error.message }}</p>
        <button
          @click="refetch()"
          class="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Empty -->
      <div v-else-if="projectsWithImages.length === 0" class="text-center py-20">
        <p class="text-slate-400">No projects to showcase yet</p>
      </div>

      <!-- Project Cards -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <div
          v-for="(project, index) in visibleProjects"
          :key="project.id"
          class="relative group rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-500 shadow-xl hover:shadow-blue-500/10"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Project Image -->
          <div class="relative w-full h-40 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"
            ></div>

            <!-- Floating Badge -->
            <div class="absolute top-3 right-3">
              <span
                class="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg"
              >
                Featured
              </span>
            </div>

            <!-- Title Overlay -->
            <h3 class="absolute bottom-3 left-3 text-base font-bold text-white">
              {{ project.title }}
            </h3>
          </div>

          <!-- Content -->
          <div class="p-4 space-y-3 relative z-10">
            <!-- Description with Hover Expand -->
            <div class="space-y-2">
              <p
                class="description text-gray-300 text-sm leading-relaxed transition-all duration-300"
              >
                {{ project.description }}
              </p>
            </div>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mt-3">
              <div
                v-for="tech in project.technologies || []"
                :key="tech.id"
                class="px-2 py-1 bg-slate-800/50 border border-slate-600/40 rounded-md text-xs text-blue-300 font-medium"
              >
                {{ tech.name }}
              </div>
            </div>

            <!-- Project Meta -->
            <div class="flex justify-between items-center pt-2 border-t border-slate-700/30">
              <span
                class="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-400/20 font-medium"
              >
                {{ project.category }}
              </span>
              <a
                :href="project.link"
                target="_blank"
                class="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-all"
              >
                View Project
              </a>
            </div>
          </div>

          <!-- Glow Effect -->
          <div
            class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-lg rounded-xl"
          ></div>
        </div>
      </div>

      <!-- Load More Projects Button -->
      <div v-if="projectsWithImages.length > 6" class="text-center mt-12 relative z-10">
        <button
          @click="toggleSeeMore"
          class="group px-6 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-blue-500/30 text-gray-200 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm"
        >
          {{ showAll ? "Show Less" : "Load More Projects" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProjects } from "@/composables/useProjects";
import ProjectCardSkeleton from "@/components/portfolio/ProjectCardSkeleton.vue";

// Manual project images
import project1Img from "@/assets/images/image.png";
import project2Img from "@/assets/images/mm_give.png";
import project3Img from "@/assets/images/rideandsavor.png";

// Local technology icons
const techIcons: Record<string, string> = {
  Laravel: new URL("@/assets/icons/laravel.svg", import.meta.url).href,
  Vue: new URL("@/assets/icons/vue.svg", import.meta.url).href,
  JavaScript: new URL("@/assets/icons/javascript.svg", import.meta.url).href,
};

// Fetch projects dynamically
const { projects, loading, error, refetch } = useProjects(1, 20);

const showAll = ref(false);

// Sorted projects
const sortedProjects = computed(() =>
  [...projects.value].sort((a, b) => Number(b.id) - Number(a.id))
);

// Assign manual images
const projectsWithImages = computed(() =>
  sortedProjects.value.map((project, index) => {
    let image;
    if (index % 3 === 0) image = project1Img;
    else if (index % 3 === 1) image = project2Img;
    else image = project3Img;
    return { ...project, image };
  })
);

// Visible projects
const visibleProjects = computed(() =>
  showAll.value ? projectsWithImages.value : projectsWithImages.value.slice(0, 6)
);

// Load more toggle
function toggleSeeMore() {
  showAll.value = !showAll.value;
}

// Optional: get tech icon helper
function getTechIcon(tech: any) {
  if (tech.icon) return tech.icon;
  return techIcons[tech.name] || techIcons[tech] || null;
}

onMounted(() => {
  refetch();
});
</script>

<style scoped>
/* Hover-expand description */
.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s;
}

.group:hover .description {
  -webkit-line-clamp: unset;
}
</style>
