<template>
  <footer class="relative text-gray-200 w-full bg-gradient-to-b from-[#0f1629] to-[#0a0f1e] overflow-hidden">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>
      <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Decorative top border with glow effect -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm"></div>

    <!-- Main footer content with better spacing -->
    <div class="relative z-10 w-full max-w-7xl mx-auto pt-16 pb-8 px-6">
      <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
        <!-- Brand + About -->
        <div class="lg:col-span-2">
          <router-link
            to="/portfolio"
            class="flex items-center space-x-4 mb-6 group"
          >
            <div
              class="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/50"
            >
              <span class="text-white font-bold text-xl tracking-tight">TS</span>
            </div>
            <div class="flex flex-col">
              <h1
                class="text-2xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-purple-400 transition-all"
              >
                Thae Shwe Sin
              </h1>
              <p class="text-sm text-gray-400 group-hover:text-cyan-300 transition-colors">
                Full-Stack Developer
              </p>
            </div>
          </router-link>

          <p class="text-gray-400 leading-relaxed mb-6 max-w-md text-[15px]">
            Passionate about building scalable, user-centric web applications
            with a focus on clean code and performance.
          </p>
          <p class="text-gray-500 italic text-sm mb-8">
            Currently at ITVisionHub in Kamaryut.
          </p>

          <div class="flex flex-wrap gap-3">
            <SocialLink
              url="https://github.com/thaeshwesin29"
              icon="github"
              title="GitHub"
            />
            <SocialLink
              url="https://www.linkedin.com/in/thae-shwe-sin-2a6a90368"
              icon="linkedin"
              title="LinkedIn"
            />
            <SocialLink
              url="mailto:thaeshwesin2000@gmail.com"
              icon="mail"
              title="Email"
            />
            <SocialLink
              url="https://t.me/YourTelegram"
              icon="telegram"
              title="Telegram"
            />
            <SocialLink
              url="https://twitter.com/YourTwitter"
              icon="twitter"
              title="Twitter"
            />
            <SocialLink
              url="https://www.facebook.com/YourFacebook"
              icon="facebook"
              title="Facebook"
            />
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4
            class="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6 uppercase tracking-wider"
          >
            Quick Links
          </h4>
          <ul class="space-y-3">
            <li
              v-for="link in quickLinks"
              :key="link.name"
              class="relative group"
            >
              <router-link
                :to="link.path"
                class="text-gray-400 text-[15px] transition-all duration-300 pl-4 hover:text-cyan-400 hover:pl-6 block"
              >
                {{ link.name }}
              </router-link>
              <span
                class="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 group-hover:h-full transition-all duration-300 rounded"
              ></span>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 
            class="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6 uppercase tracking-wider"
          >
            Contact
          </h4>
          <ul class="space-y-4 text-gray-400">
            <li class="flex items-start group">
              <svg
                class="w-5 h-5 mr-3 mt-0.5 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href="tel:+959684426329"
                class="hover:text-cyan-400 transition-colors text-[15px]"
                >+95 968 442 6329</a
              >
            </li>
            <li class="flex items-start group">
              <svg
                class="w-5 h-5 mr-3 mt-0.5 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:thaeshwesin2000@gmail.com"
                class="hover:text-cyan-400 transition-colors text-[15px] break-all"
                >thaeshwesin2000@gmail.com</a
              >
            </li>
            <li class="flex items-start group">
              <svg
                class="w-5 h-5 mr-3 mt-0.5 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="text-[15px]">Kamaryut, Yangon</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright with better separation -->
      <div class="relative mt-8 pt-8">
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        <p class="text-gray-500 text-sm text-center">
          &copy; {{ currentYear }} <span class="text-cyan-400 font-semibold">Thae Shwe Sin</span>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SocialLink from "./SocialLink.vue";

const currentYear = computed(() => new Date().getFullYear());

const quickLinks = [
  { name: "Home", path: "/portfolio" },
  { name: "About", path: "/portfolio/about" },
  { name: "Skills", path: "/portfolio/skills" },
  { name: "Education", path: "/portfolio/education" },
  { name: "Work Experience", path: "/portfolio/work" },
  { name: "Technologies", path: "/portfolio/site-technologies" },
  { name: "Hire Me", path: "/portfolio/hire-me" },
];
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
a, button {
  transition: all 0.3s ease;
}
</style>