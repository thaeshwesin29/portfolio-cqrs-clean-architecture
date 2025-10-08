<template>
  <footer class="relative text-gray-200 mt-12 w-full">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        class="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-900/20 to-purple-900/20 w-full h-full"
      ></div>
    </div>

    <!-- Matching nav container -->
    <div
      class="relative z-10 w-full max-w-7xl mx-auto border-t border-gray-700 py-12 px-6"
    >
      <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mb-10">
        <!-- Brand + About -->
        <div class="lg:col-span-2">
          <router-link
            to="/portfolio"
            class="flex items-center space-x-4 mb-6 group"
          >
            <div
              class="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-2 border-cyan-400/30"
            >
              <span class="text-white font-bold text-lg tracking-tight"
                >TS</span
              >
            </div>
            <div class="flex flex-col">
              <h1
                class="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors"
              >
                Thae Shwe Sin
              </h1>
              <p
                class="text-xs text-gray-400 group-hover:text-cyan-300 transition-colors"
              >
                Full-Stack Developer
              </p>
            </div>
          </router-link>

          <p class="text-gray-300 leading-relaxed mb-6 max-w-md">
            Passionate about building scalable, user-centric web applications
            with a focus on clean code and performance.
            <br />
            <span class="text-gray-400 italic text-xs mt-1 block">
              Currently at ITVisionHub in Dagon Seikkan.
            </span>
          </p>

          <div class="flex space-x-4 mt-6">
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
            <!-- Added -->
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4
            class="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider"
          >
            Quick Links
          </h4>
          <ul class="space-y-2 mt-3">
            <li
              v-for="link in quickLinks"
              :key="link.name"
              class="relative group"
            >
              <router-link
                :to="link.path"
                class="text-gray-300 text-sm transition-colors pl-4 hover:text-cyan-400"
              >
                {{ link.name }}
              </router-link>
              <span
                class="absolute left-0 top-0 h-full w-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity rounded"
              ></span>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-sm font-semibold text-gray-300 mb-4 uppercase">
            Contact
          </h4>
          <ul class="space-y-3 text-gray-400 text-sm mt-3">
            <li class="flex items-center">
              <svg
                class="w-4 h-4 mr-2 text-cyan-400"
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
                class="hover:text-white transition-colors"
                >+95 968 442 6329</a
              >
            </li>
            <li class="flex items-center">
              <svg
                class="w-4 h-4 mr-2 text-cyan-400"
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
                class="hover:text-white transition-colors"
                >thaeshwesin2000@gmail.com</a
              >
            </li>
            <li class="flex items-center">
              <svg
                class="w-4 h-4 mr-2 text-cyan-400"
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
              Dagon Seikkan, Yangon
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-700 pt-6 text-center">
        <p class="text-gray-400 text-sm">
          &copy; {{ currentYear }} Thae Shwe Sin. All rights reserved.
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
.footer-link-hover {
  transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;
}

.footer-link-hover:hover {
  transform: translateY(-2px);
  text-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
  color: #22d3ee;
}
</style>
