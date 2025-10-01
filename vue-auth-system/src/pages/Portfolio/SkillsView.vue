<template>
  <section class="relative min-h-screen py-24 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-20">
            <h2 class="text-xl md:text-3xl font-bold leading-tight">
          My <span class="text-white">Skills</span>
        </h2>
        <p class="mt-4 text-gray-400 text-lg">
          Full-Stack Development Toolkit & Expertise
        </p>
      </div>

      <!-- Categories Tabs -->
      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <button
          v-for="cat in skillCategories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'px-6 py-3 rounded-full font-semibold transition-all duration-300',
            activeCategory === cat.id
              ? 'bg-gray-800 text-white shadow-lg'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800/70'
          ]"
        >
          {{ cat.title }}
        </button>
      </div>

      <!-- Skills Grid -->
      <transition name="fade-slide" mode="out-in">
        <div :key="currentCategory.id" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="skill in currentCategory.skills"
            :key="skill.name"
            class="glass-card p-6 shadow-lg hover:translate-y-1 hover:shadow-xl transition-all"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-white font-bold">{{ skill.name }}</h4>
              <span class="text-gray-400 font-semibold">{{ skill.level }}%</span>
            </div>
            <div class="w-full h-3 rounded-full bg-gray-800/40 overflow-hidden mb-2">
              <div
                class="h-3 rounded-full"
                :style="{ width: skill.level + '%', backgroundColor: 'rgba(255,255,255,0.2)' }"
              ></div>
            </div>
            <p class="text-gray-400 text-sm">{{ skill.experience }} experience</p>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Skill {
  name: string
  level: number
  experience: string
}

interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

const activeCategory = ref('frontend')

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95, experience: '3+ yrs' },
      { name: 'CSS3', level: 90, experience: '3+ yrs' },
      { name: 'Bootstrap', level: 85, experience: '2+ yrs' },
      { name: 'JavaScript', level: 90, experience: '3+ yrs' },
      { name: 'jQuery', level: 80, experience: '2+ yrs' },
      { name: 'Vue.js', level: 90, experience: '2+ yrs' },
      { name: 'Angular', level: 70, experience: '1+ yr' },
      { name: 'TailwindCSS', level: 90, experience: '1+ yr' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'PHP', level: 90, experience: '3+ yrs' },
      { name: 'Laravel', level: 95, experience: '2+ yrs' },
      { name: 'Node.js', level: 75, experience: '1+ yr' },
      { name: 'Express.js', level: 70, experience: '1+ yr' },
      { name: 'C#.NET', level: 80, experience: '1+ yr' }
    ]
  },
  {
    id: 'database',
    title: 'Databases',
    skills: [
      { name: 'MySQL', level: 90, experience: '3+ yrs' },
      { name: 'Firebase', level: 75, experience: '1+ yr' },
      { name: 'MongoDB', level: 80, experience: '2+ yrs' },
      { name: 'PostgreSQL', level: 80, experience: '2+ yrs' },
      { name: 'Redis', level: 70, experience: '1+ yr' },
      { name: 'Oracle', level: 70, experience: '1+ yr' },
      { name: 'MSSQL', level: 75, experience: '1+ yr' }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps/Deployment',
    skills: [
      { name: 'AWS', level: 70, experience: '1+ yr' },
      { name: 'DigitalOcean', level: 65, experience: '1+ yr' },
      { name: 'Vercel', level: 80, experience: '1+ yr' },
      { name: 'Netlify', level: 80, experience: '1+ yr' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Collaboration',
    skills: [
      { name: 'Git', level: 90, experience: '3+ yrs' },
      { name: 'GitHub', level: 90, experience: '3+ yrs' },
      { name: 'GitHub Actions', level: 75, experience: '1+ yr' },
      { name: 'Bitbucket', level: 70, experience: '1+ yr' },
      { name: 'Postman', level: 85, experience: '2+ yrs' },
      { name: 'Figma', level: 80, experience: '2+ yrs' },
      { name: 'Adobe Suite', level: 70, experience: '2+ yrs' },
      { name: 'Canva', level: 75, experience: '2+ yrs' },
      { name: 'MockFlow', level: 70, experience: '1+ yr' }
    ]
  },
  {
    id: 'dsalgo',
    title: 'DS & Algorithms',
    skills: [
      { name: 'Arrays & Strings', level: 90, experience: '3+ yrs' },
      { name: 'Linked Lists', level: 85, experience: '3+ yrs' },
      { name: 'Stacks & Queues', level: 85, experience: '3+ yrs' },
      { name: 'Trees & Graphs', level: 80, experience: '2+ yrs' },
      { name: 'Hash Tables', level: 85, experience: '2+ yrs' },
      { name: 'Sorting & Searching', level: 90, experience: '3+ yrs' },
      { name: 'Dynamic Programming', level: 75, experience: '2+ yrs' },
      { name: 'Recursion & Backtracking', level: 80, experience: '2+ yrs' }
    ]
  }
]

const currentCategory = computed(() =>
  skillCategories.find((c) => c.id === activeCategory.value)!
)
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  transition: all 0.3s ease;
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-3px);
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
