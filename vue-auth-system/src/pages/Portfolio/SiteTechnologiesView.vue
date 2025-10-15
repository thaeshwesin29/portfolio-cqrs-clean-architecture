<!-- src/pages/Portfolio/SiteTechnologiesView.vue -->
<template>
  <section
    class="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 py-24 px-6 overflow-hidden"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-40 -left-20 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 -right-40 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse animation-delay-500"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header Section -->
      <div class="text-center space-y-6 mb-24">
        <h2 class="text-xl md:text-3xl font-bold leading-tight">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
          >
            Powered by Modern Technologies
          </span>
          <br />
        </h2>
        <p class="mt-4 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Built with cutting-edge tools, frameworks, and architectural patterns to deliver exceptional
          performance, scalability, and maintainability
        </p>
      </div>

      <!-- Architecture Showcase -->
      <div class="mb-20">
        <div class="grid lg:grid-cols-3 gap-6">
          <div
            v-for="(pillar, index) in architecturePillars"
            :key="index"
            class="glass-card-premium p-8 rounded-3xl hover:scale-[1.03] transition-all duration-500 relative overflow-hidden group"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div class="relative z-10 space-y-4">
              <div
                class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform"
              >
                {{ pillar.icon }}
              </div>
              <h3 class="text-xl font-bold text-white">{{ pillar.title }}</h3>
              <p class="text-gray-400 leading-relaxed">
                {{ pillar.description }}
              </p>
            </div>
            <div
              class="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700"
            ></div>
          </div>
        </div>
      </div>

      <!-- Tech Stack Grid -->
      <div class="space-y-16">
        <div v-for="category in techStack" :key="category.title">
          <!-- Category Header -->
          <div class="flex items-center gap-4 mb-8">
            <div class="flex items-center gap-3">
              <div
                :class="category.iconClass"
                class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
              >
                {{ category.icon }}
              </div>
              <div>
                <h2 class="text-3xl font-bold text-white">
                  {{ category.title }}
                </h2>
                <p class="text-gray-500 text-sm">{{ category.subtitle }}</p>
              </div>
            </div>
            <div
              class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"
            ></div>
          </div>

          <!-- Technology Cards -->
          <div class="grid lg:grid-cols-2 gap-6">
            <TechnologyCard
              v-for="tech in category.technologies"
              :key="tech.name"
              :name="tech.name"
              :version="tech.version"
              :purpose="tech.purpose"
              :features="tech.features"
              :color="tech.color"
              :icon="tech.icon"
            />
          </div>
        </div>
      </div>

      <!-- Performance Dashboard -->
      <div
        class="mt-24 glass-card-premium p-10 rounded-3xl relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"
        ></div>

        <div class="relative z-10">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-3">
              Performance Metrics
            </h2>
            <p class="text-gray-400">Lighthouse scores and web vitals</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="metric in performanceMetrics"
              :key="metric.label"
              class="glass-card-premium p-6 rounded-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity"
                :class="metric.gradientClass"
              ></div>

              <div class="relative z-10 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-4xl">{{ metric.icon }}</span>
                  <div
                    :class="metric.badgeClass"
                    class="px-3 py-1 rounded-full text-xs font-bold"
                  >
                    {{ metric.status }}
                  </div>
                </div>
                <div>
                  <div class="text-4xl font-black text-white mb-1">
                    {{ metric.value }}
                  </div>
                  <div class="text-sm font-semibold text-gray-300">
                    {{ metric.label }}
                  </div>
                </div>
                <p class="text-xs text-gray-500">{{ metric.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Implementation Features Grid -->
      <div class="mt-24">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-3">
            Implementation Excellence
          </h2>
          <p class="text-gray-400">Modern practices and architectural patterns</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in implementationFeatures"
            :key="feature.title"
            class="glass-card-premium p-6 rounded-3xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            ></div>

            <div class="relative z-10 space-y-4">
              <div class="flex items-start justify-between">
                <div
                  class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-lg"
                >
                  {{ feature.icon }}
                </div>
                <div class="flex gap-1">
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"
                  ></span>
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse animation-delay-300"
                  ></span>
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse animation-delay-600"
                  ></span>
                </div>
              </div>

              <h3
                class="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors"
              >
                {{ feature.title }}
              </h3>

              <p class="text-sm text-gray-400 leading-relaxed">
                {{ feature.description }}
              </p>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in feature.techUsed"
                  :key="tech"
                  class="px-3 py-1 bg-gray-800/40 text-gray-400 text-xs rounded-lg border border-gray-700/30 hover:border-indigo-500/40 hover:text-indigo-400 transition-all"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Banner -->
      <div
        class="mt-24 glass-card-premium p-8 rounded-3xl relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"
        ></div>

        <div class="relative z-10 grid md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2">
            <div
              class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
            >
              12+
            </div>
            <div class="text-sm text-gray-400 uppercase tracking-wider">
              Technologies
            </div>
          </div>
          <div class="space-y-2">
            <div
              class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            >
              100%
            </div>
            <div class="text-sm text-gray-400 uppercase tracking-wider">
              Type Safe
            </div>
          </div>
          <div class="space-y-2">
            <div
              class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400"
            >
              95+
            </div>
            <div class="text-sm text-gray-400 uppercase tracking-wider">
              Performance
            </div>
          </div>
          <div class="space-y-2">
            <div
              class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"
            >
              Modern
            </div>
            <div class="text-sm text-gray-400 uppercase tracking-wider">
              Architecture
            </div>
          </div>
        </div>
      </div>

      <!-- Closing Statement -->
      <div class="mt-24 text-center">
        <div class="inline-block glass-card-premium px-8 py-6 rounded-2xl">
          <p class="text-lg text-gray-300 italic">
            "Building tomorrow's web with
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold"
              >today's best technologies and architectural patterns</span
            >"
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TechnologyCard from "@/components/portfolio/TechnologyCard.vue";

interface Technology {
  name: string;
  version: string;
  purpose: string;
  features: string[];
  color: string;
  icon: string;
}

interface TechCategory {
  title: string;
  subtitle: string;
  icon: string;
  iconClass: string;
  technologies: Technology[];
}

interface PerformanceMetric {
  label: string;
  value: string;
  description: string;
  icon: string;
  status: string;
  badgeClass: string;
  gradientClass: string;
}

interface ImplementationFeature {
  title: string;
  description: string;
  techUsed: string[];
  icon: string;
}

interface ArchitecturePillar {
  title: string;
  description: string;
  icon: string;
}

const architecturePillars: ArchitecturePillar[] = [
  {
    title: "Clean Architecture",
    description:
      "CQRS pattern with clear separation of concerns, ensuring scalable and maintainable codebase",
    icon: "🏗️",
  },
  {
    title: "Modern Tooling",
    description:
      "Vite for lightning-fast builds, TypeScript for type safety, and Vue 3 Composition API",
    icon: "🛠️",
  },
  {
    title: "Design Excellence",
    description:
      "TailwindCSS with custom design system for consistent, responsive, and beautiful UI",
    icon: "🎨",
  },
];

const techStack: TechCategory[] = [
  {
    title: "Core Framework",
    subtitle: "Building blocks of the application",
    icon: "⚡",
    iconClass:
      "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30",
    technologies: [
      {
        name: "Vue.js",
        version: "3.4.x",
        purpose:
          "Progressive JavaScript framework for building user interfaces",
        features: [
          "Composition API",
          "TypeScript Support",
          "Reactive Data",
          "Component Architecture",
        ],
        color: "green",
        icon: "🎯",
      },
      {
        name: "TypeScript",
        version: "5.x",
        purpose: "Type-safe JavaScript development",
        features: [
          "Static Typing",
          "IntelliSense",
          "Better Refactoring",
          "Enhanced DX",
        ],
        color: "blue",
        icon: "📘",
      },
    ],
  },
  {
    title: "Architectural Patterns",
    subtitle: "Enterprise-grade architecture",
    icon: "🏛️",
    iconClass: "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/30",
    technologies: [
      {
        name: "CQRS Pattern",
        version: "Custom",
        purpose: "Command Query Responsibility Segregation for clean separation",
        features: [
          "Command Handlers",
          "Query Handlers",
          "Event Bus",
          "Clear Boundaries",
        ],
        color: "cyan",
        icon: "🔀",
      },
      {
        name: "Clean Architecture",
        version: "Domain-Driven",
        purpose: "Layered architecture with clear dependency rules",
        features: [
          "Domain Layer",
          "Application Layer",
          "Infrastructure Layer",
          "Presentation Layer",
        ],
        color: "indigo",
        icon: "🏗️",
      },
    ],
  },
  {
    title: "Styling & Design",
    subtitle: "Creating beautiful interfaces",
    icon: "🎨",
    iconClass: "bg-gradient-to-br from-pink-500 to-rose-600 shadow-pink-500/30",
    technologies: [
      {
        name: "TailwindCSS",
        version: "3.x",
        purpose: "Utility-first CSS framework for rapid UI development",
        features: [
          "Custom Design System",
          "Responsive Design",
          "Dark Mode Support",
          "JIT Compilation",
        ],
        color: "cyan",
        icon: "💨",
      },
      {
        name: "CSS3 Animations",
        version: "Latest",
        purpose: "Modern styling with smooth animations and transitions",
        features: ["CSS Grid", "Flexbox", "Keyframe Animations", "Transforms"],
        color: "blue",
        icon: "🎭",
      },
    ],
  },
  {
    title: "Development Tools",
    subtitle: "Optimized workflow",
    icon: "🚀",
    iconClass:
      "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30",
    technologies: [
      {
        name: "Vite",
        version: "5.x",
        purpose: "Fast build tool and development server",
        features: ["HMR", "Fast Builds", "ES Modules", "Plugin Ecosystem"],
        color: "purple",
        icon: "⚡",
      },
      {
        name: "Vue Router",
        version: "4.x",
        purpose: "Official router for Vue.js applications",
        features: [
          "SPA Navigation",
          "Route Guards",
          "Dynamic Routes",
          "Lazy Loading",
        ],
        color: "green",
        icon: "🧭",
      },
    ],
  },
  {
    title: "State & Data Management",
    subtitle: "Managing application state",
    icon: "📊",
    iconClass:
      "bg-gradient-to-br from-yellow-500 to-orange-600 shadow-yellow-500/30",
    technologies: [
      {
        name: "Pinia",
        version: "2.x",
        purpose: "Official state management for Vue.js",
        features: ["Type Safety", "DevTools", "HMR Support", "Modular Stores"],
        color: "yellow",
        icon: "🍍",
      },
      {
        name: "Composables",
        version: "Vue 3",
        purpose: "Reusable stateful logic with Composition API",
        features: [
          "Code Reusability",
          "Logic Separation",
          "Reactive State",
          "Lifecycle Hooks",
        ],
        color: "green",
        icon: "🔄",
      },
    ],
  },
  {
    title: "Quality & Testing",
    subtitle: "Ensuring code quality",
    icon: "✅",
    iconClass:
      "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/30",
    technologies: [
      {
        name: "ESLint",
        version: "9.x",
        purpose: "Linting and code quality enforcement",
        features: [
          "Vue Rules",
          "TypeScript Rules",
          "Auto-fix",
          "Custom Rules",
        ],
        color: "purple",
        icon: "🔍",
      },
      {
        name: "Prettier",
        version: "3.x",
        purpose: "Code formatting for consistent style",
        features: [
          "Auto-formatting",
          "EditorConfig",
          "Git Hooks",
          "Team Standards",
        ],
        color: "pink",
        icon: "✨",
      },
    ],
  },
];

const performanceMetrics: PerformanceMetric[] = [
  {
    label: "Performance",
    value: "95+",
    description: "Lighthouse Performance Score",
    icon: "🚀",
    status: "Excellent",
    badgeClass: "bg-green-500/20 text-green-400 border border-green-500/30",
    gradientClass: "from-green-500 to-emerald-600",
  },
  {
    label: "Accessibility",
    value: "100",
    description: "WCAG 2.1 AA Compliance",
    icon: "♿",
    status: "Perfect",
    badgeClass: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    gradientClass: "from-blue-500 to-indigo-600",
  },
  {
    label: "SEO",
    value: "98+",
    description: "Search Engine Optimization",
    icon: "🔍",
    status: "Optimized",
    badgeClass: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    gradientClass: "from-purple-500 to-violet-600",
  },
  {
    label: "Best Practices",
    value: "100",
    description: "Modern Web Standards",
    icon: "✨",
    status: "Exemplary",
    badgeClass: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
    gradientClass: "from-pink-500 to-rose-600",
  },
];

const implementationFeatures: ImplementationFeature[] = [
  {
    title: "CQRS Implementation",
    description:
      "Complete CQRS pattern with command/query handlers, event bus, and clear separation of read/write operations.",
    techUsed: ["TypeScript", "Vue 3", "Custom Handlers"],
    icon: "🔀",
  },
  {
    title: "Clean Architecture Layers",
    description:
      "Domain, Application, Infrastructure, and Presentation layers with proper dependency inversion.",
    techUsed: ["Domain Layer", "Use Cases", "Repositories"],
    icon: "🏗️",
  },
  {
    title: "Component Architecture",
    description:
      "Modular, reusable components following SOLID principles with proper prop typing and emit events.",
    techUsed: ["Vue 3", "TypeScript", "Composition API"],
    icon: "🧩",
  },
  {
    title: "Responsive Design",
    description:
      "Mobile-first approach ensuring optimal experience across all devices and screen sizes.",
    techUsed: ["TailwindCSS", "CSS Grid", "Flexbox"],
    icon: "📱",
  },
  {
    title: "Type Safety",
    description:
      "Full TypeScript integration providing compile-time error checking and enhanced developer experience.",
    techUsed: ["TypeScript", "Vue 3", "Strict Mode"],
    icon: "🛡️",
  },
  {
    title: "Performance Optimization",
    description:
      "Lazy loading, code splitting, tree shaking, and optimized assets for fast loading times.",
    techUsed: ["Vite", "Vue Router", "Dynamic Imports"],
    icon: "⚡",
  },
  {
    title: "State Management",
    description:
      "Centralized state with Pinia stores following domain boundaries and using TypeScript interfaces.",
    techUsed: ["Pinia", "Composables", "TypeScript"],
    icon: "🗄️",
  },
  {
    title: "Code Quality",
    description:
      "ESLint, Prettier, and pre-commit hooks ensuring consistent code style and quality standards.",
    techUsed: ["ESLint", "Prettier", "Husky"],
    icon: "✅",
  },
  {
    title: "Modern Deployment",
    description:
      "Automated build process with environment-specific configurations and CDN optimization.",
    techUsed: ["Vite", "GitHub Actions", "Vercel"],
    icon: "🚀",
  },
];
</script>

<style scoped>
.glass-card-premium {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card-premium:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.animation-delay-300 {
  animation-delay: 0.3s;
}
.animation-delay-500 {
  animation-delay: 0.5s;
}
.animation-delay-600 {
  animation-delay: 0.6s;
}
.animation-delay-1000 {
  animation-delay: 1s;
}
</style>