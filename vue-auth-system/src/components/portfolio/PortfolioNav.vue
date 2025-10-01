<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50"
    role="navigation"
    aria-label="Primary Navigation"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo Section -->
        <router-link
          to="/portfolio"
          class="flex items-center space-x-4 group"
          aria-current="page"
        >
          <div class="relative w-12 h-12 flex-shrink-0">
            <img
              src="@/assets/images/profile5.JPG"
              alt="Thee Shwe Sin"
              class="w-full h-full rounded-full object-cover border-2 border-gray-600 shadow-lg"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
            />
            <div
              class="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-700 shadow-lg"
              style="display: none"
            >
              TS
            </div>
          </div>

          <div class="flex flex-col justify-center">
            <h1 class="text-xl font-bold text-white">
              Thee Shwe Sin
            </h1>
            <p class="text-sm text-gray-300">
              Full-Stack Developer
            </p>
          </div>
        </router-link>

        <!-- Desktop Navigation - Clean & Simple -->
        <div class="hidden lg:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            class="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative py-2"
            :class="{ 'text-white font-semibold': isActive(item.path) }"
          >
            <span class="relative">
              {{ item.name }}
              <!-- Active indicator -->
              <span
                v-if="isActive(item.path)"
                class="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-500 rounded-full"
              ></span>
            </span>
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            :aria-expanded="isMobileMenuOpen"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-gray-800 border-t border-gray-700 shadow-2xl"
      >
        <div class="px-6 py-4 space-y-3">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            class="block px-4 py-3 rounded-lg text-gray-300 hover:text-white font-medium transition-colors duration-200 border-l-4"
            :class="{
              'text-white bg-gray-700 border-blue-500': isActive(item.path),
              'border-transparent hover:bg-gray-700/50': !isActive(item.path)
            }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isMobileMenuOpen = ref(false);

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/portfolio" },
  { name: "About", path: "/portfolio/about" },
  { name: "Skills", path: "/portfolio/skills" },
  { name: "Education", path: "/portfolio/education" },
  { name: "Experience", path: "/portfolio/work" },
  { name: "Technologies", path: "/portfolio/site-technologies" },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

router.afterEach(() => {
  closeMobileMenu();
});

const isActive = (path: string) => {
  const current = route.path.replace(/\/$/, "");
  const target = path.replace(/\/$/, "");
  return current === target || current.startsWith(target + "/");
};

const handleClickOutside = (e: Event) => {
  const t = e.target as HTMLElement;
  if (!t.closest("nav") && isMobileMenuOpen.value) closeMobileMenu();
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isMobileMenuOpen.value) closeMobileMenu();
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
button:focus,
a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>