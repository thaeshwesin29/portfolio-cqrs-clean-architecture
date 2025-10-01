<template>
  <section
    class="relative min-h-screen py-20 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
  >
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
      />
    </div>

    <div class="relative max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <!-- <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6"
        >
          <svg
            class="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            />
          </svg>
          <span class="text-sm text-gray-300">Professional Expertise</span>
        </div> -->
        <h2 class="text-lg md:text-3xl font-bold leading-tight mb-4">
          Technical
          <span class="text-white bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Skills
          </span>
        </h2>
        <p class="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Full-Stack Development Arsenal with Modern Technologies
        </p>
      </div>

      <!-- Categories Navigation -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="cat in skillCategories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2',
            activeCategory === cat.id
              ? 'bg-white/10 text-white shadow-lg shadow-white/20 scale-105'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white',
          ]"
        >
          <span
            v-html="cat.icon"
            :class="[
              'transition-transform duration-300',
              activeCategory === cat.id ? 'scale-110' : 'group-hover:scale-110',
            ]"
          />
          <span>{{ cat.title }}</span>
          <div
            v-if="activeCategory === cat.id"
            :class="[
              'absolute inset-0 rounded-xl bg-gradient-to-r opacity-20 blur-xl',
              cat.color,
            ]"
          />
          <div
            v-if="activeCategory === cat.id"
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </button>
      </div>

      <!-- Skills Grid -->
      <transition name="fade-slide" mode="out-in">
        <div
          :key="currentCategory.id"
          class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
        >
          <div
            v-for="(skill, idx) in currentCategory.skills"
            :key="skill.name"
            class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl skill-card"
            :style="{ animationDelay: `${idx * 50}ms` }"
          >
            <!-- Skill Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h4 class="text-xl font-bold text-white mb-1">
                  {{ skill.name }}
                </h4>
                <p class="text-sm text-gray-400">
                  {{ skill.experience }} experience
                </p>
              </div>
              <div class="text-right">
                <span
                  class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                >
                  {{ skill.level }}%
                </span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div
              class="relative h-2 bg-white/5 rounded-full overflow-hidden mb-3"
            >
              <div
                :class="[
                  'absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r',
                  currentCategory.color,
                ]"
                :style="{ width: skill.level + '%' }"
              />
              <div
                :class="[
                  'absolute inset-y-0 left-0 rounded-full opacity-50 blur-sm transition-all duration-1000 ease-out bg-gradient-to-r',
                  currentCategory.color,
                ]"
                :style="{ width: skill.level + '%' }"
              />
            </div>

            <!-- Proficiency Badge -->
            <div class="flex items-center justify-end gap-1">
              <div
                v-if="skill.level >= 90"
                class="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full"
              >
                <svg
                  class="w-3 h-3 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-xs text-green-400 font-medium">Expert</span>
              </div>
              <div
                v-else-if="skill.level >= 80"
                class="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full"
              >
                <svg
                  class="w-3 h-3 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span class="text-xs text-blue-400 font-medium">Advanced</span>
              </div>
              <div
                v-else-if="skill.level >= 70"
                class="flex items-center gap-1 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full"
              >
                <svg
                  class="w-3 h-3 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span class="text-xs text-purple-400 font-medium"
                  >Proficient</span
                >
              </div>
            </div>

            <!-- Hover Glow Effect -->
            <div
              :class="[
                'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl bg-gradient-to-r',
                currentCategory.color,
              ]"
            />
          </div>
        </div>
      </transition>

      <!-- Stats Summary -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="relative group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
        >
          <div
            :class="[
              'absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300 bg-gradient-to-r',
              stat.color,
            ]"
          />
          <div class="relative">
            <div
              :class="[
                'text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent',
                stat.color,
              ]"
            >
              {{ stat.value }}
            </div>
            <div class="text-gray-400 text-sm font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <!-- <div class="mt-16 text-center">
        <button
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
        >
          <span>View All Projects</span>
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Skill {
  name: string;
  level: number;
  experience: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

const activeCategory = ref("frontend");

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "HTML5", level: 95, experience: "3+ yrs" },
      { name: "CSS3", level: 90, experience: "3+ yrs" },
      { name: "JavaScript", level: 90, experience: "3+ yrs" },
      { name: "Vue.js", level: 90, experience: "2+ yrs" },
      { name: "TailwindCSS", level: 90, experience: "1+ yr" },
      { name: "Bootstrap", level: 85, experience: "2+ yrs" },
      { name: "jQuery", level: 80, experience: "2+ yrs" },
      { name: "TypeScript", level: 80, experience: "1+ yr" },
      { name: "SASS/SCSS", level: 85, experience: "2+ yrs" },
      { name: "Webpack", level: 75, experience: "1+ yr" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>',
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Laravel", level: 95, experience: "2+ yrs" },
      { name: "PHP", level: 90, experience: "3+ yrs" },
      { name: "REST API", level: 90, experience: "3+ yrs" },
      { name: "GraphQL", level: 70, experience: "1+ yr" },
    ],
  },
  {
    id: "database",
    title: "Databases",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>',
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "MySQL", level: 90, experience: "3+ yrs" },
      { name: "MongoDB", level: 80, experience: "2+ yrs" },
      { name: "PostgreSQL", level: 80, experience: "2+ yrs" },
      { name: "Firebase", level: 75, experience: "1+ yr" },
      { name: "MSSQL", level: 75, experience: "1+ yr" },
      { name: "Redis", level: 70, experience: "1+ yr" },
      { name: "Oracle", level: 70, experience: "1+ yr" },
      { name: "SQLite", level: 85, experience: "2+ yrs" },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>',
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Vercel", level: 80, experience: "1+ yr" },
      { name: "Netlify", level: 80, experience: "1+ yr" },
      { name: "DigitalOcean", level: 65, experience: "1+ yr" },
      { name: "Docker", level: 75, experience: "1+ yr" },
      { name: "CI/CD", level: 70, experience: "1+ yr" },
      { name: "Linux", level: 80, experience: "2+ yrs" },
      { name: "Nginx", level: 75, experience: "1+ yr" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
    color: "from-yellow-500 to-amber-500",
    skills: [
      { name: "Git", level: 90, experience: "3+ yrs" },
      { name: "GitHub", level: 90, experience: "3+ yrs" },
      { name: "Postman", level: 85, experience: "2+ yrs" },
      { name: "Figma", level: 80, experience: "2+ yrs" },
      { name: "GitHub Actions", level: 75, experience: "1+ yr" },
      { name: "Canva", level: 75, experience: "2+ yrs" },
      { name: "Bitbucket", level: 70, experience: "1+ yr" },
      { name: "MockFlow", level: 70, experience: "1+ yr" },
      { name: "VS Code", level: 95, experience: "3+ yrs" },
    ],
  },
  {
    id: "dsalgo",
    title: "DS & Algorithms",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>',
    color: "from-indigo-500 to-violet-500",
    skills: [
      { name: "Sorting & Searching", level: 90, experience: "3+ yrs" },
      { name: "Arrays & Strings", level: 90, experience: "3+ yrs" },
      { name: "Hash Tables", level: 85, experience: "2+ yrs" },
      { name: "Linked Lists", level: 85, experience: "3+ yrs" },
      { name: "Stacks & Queues", level: 85, experience: "3+ yrs" },
      { name: "Trees & Graphs", level: 80, experience: "2+ yrs" },
      { name: "Recursion", level: 80, experience: "2+ yrs" },
      { name: "Dynamic Programming", level: 75, experience: "2+ yrs" },
      { name: "Binary Search", level: 85, experience: "3+ yrs" },
    ],
  },
];

const currentCategory = computed(
  () => skillCategories.find((c) => c.id === activeCategory.value)!
);

// const stats = computed(() => [
//   {
//     value: `${skillCategories.reduce(
//       (acc, cat) => acc + cat.skills.length,
//       0
//     )}+`,
//     label: "Technologies",
//     color: "from-blue-400 to-cyan-500",
//   },
//   {
//     value: skillCategories.length,
//     label: "Skill Categories",
//     color: "from-purple-400 to-pink-500",
//   },
//   {
//     value: "3+",
//     label: "Years Experience",
//     color: "from-green-400 to-emerald-500",
//   },
//   {
//     value: "100%",
//     label: "Full-Stack Ready",
//     color: "from-orange-400 to-red-500",
//   },
// ]);
</script>

<style scoped>
.skill-card {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
