<template>
  <section
    class="relative min-h-screen flex flex-col justify-center px-6 py-20 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Floating Orbs -->
      <div
        class="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full opacity-20 animate-float-1"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-30 animate-float-2"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-float-3"
      ></div>

      <!-- Removed Grid Pattern -->

      <!-- Gradient Accents -->
      <div
        class="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"
      ></div>
    </div>

    <!-- Hero Container -->
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 z-10"
    >
      <!-- Left: Text Content + Social Links -->
      <div class="flex-1 text-center md:text-left space-y-8">
        <!-- Greeting + Name -->
        <div class="space-y-4">
          <div class="overflow-hidden">
            <h1
              class="text-2xl md:text-3xl font-light text-gray-400 tracking-wide animate-slide-up"
            >
              Hello, I'm
            </h1>
          </div>
          <div class="overflow-hidden">
            <div class="min-h-[4rem] flex items-center">
              <span
                v-if="userStore.loading"
                class="h-12 w-64 bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse rounded-lg"
              ></span>
              <span
                v-else
                class="text-5xl md:text-6xl lg:text-3xl font-black text-white animate-name-reveal"
              >
                {{ displayName }}
              </span>
            </div>
          </div>
        </div>

        <!-- Subtitle -->
        <div class="overflow-hidden">
          <h2
            class="text-xl md:text-2xl font-medium text-cyan-400 tracking-wider animate-slide-up animation-delay-300"
          >
            Full-Stack Web Developer
          </h2>
        </div>

        <!-- Description -->
        <div class="overflow-hidden">
          <p
            class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-slide-up animation-delay-500"
          >
            Crafting scalable, user-focused applications with clean architecture &
            modern technologies. Currently at ITVisionHub in
            <span
              v-if="userStore.loading"
              class="h-6 w-32 bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse inline-block rounded"
            ></span>
            <span v-else class="text-cyan-300 font-medium">{{
              displayTownship
            }}</span
            >.
          </p>
        </div>

        <!-- Social Links -->
        <div
          class="flex gap-4 mt-6 justify-center md:justify-start animate-fade-in animation-delay-700"
        >
          <SocialLink
            v-for="link in socialLinks"
            :key="link.title"
            :url="link.url"
            :icon="link.icon"
            :title="link.title"
            class="transform hover:scale-110 hover:-translate-y-1 transition-all duration-300"
          />
        </div>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6 animate-fade-in animation-delay-900"
        >
          <router-link
            to="/portfolio/work"
            class="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <span class="relative z-10 flex items-center gap-2">
              <i
                class="fas fa-briefcase group-hover:rotate-12 transition-transform duration-300"
              ></i>
              View My Work
            </span>
          </router-link>

          <router-link
            to="/portfolio/hire-me"
            class="group relative px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 font-semibold rounded-xl hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-white transform hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <span class="relative z-10 flex items-center gap-2">
              <i
                class="fas fa-paper-plane group-hover:translate-x-1 transition-transform duration-300"
              ></i>
              Get In Touch
            </span>
          </router-link>
        </div>
      </div>

      <!-- Right: Clean Profile Image -->
      <div class="flex-1 flex justify-center md:justify-end">
        <div class="relative group animate-float-profile">
          <!-- Main Image Container -->
          <div class="relative z-10">
            <img
              src="@/assets/images/profile5.JPG"
              alt="Profile"
              class="w-80 md:w-96 rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-700"
            />
          </div>

          <!-- Background Glow -->
          <div
            class="absolute -inset-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-2xl opacity-60 group-hover:opacity-80 transition duration-700"
          ></div>

          <!-- Floating Elements -->
          <div
            class="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce"
          ></div>
          <div
            class="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce animation-delay-1000"
          ></div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <div
        class="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center"
      >
        <div class="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import SocialLink from "@/components/portfolio/SocialLink.vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});

// Computed properties for safe display
const displayName = computed(() => userStore.user?.name || "Guest");
const displayTownship = computed(
  () => userStore.user?.township?.name || "Unknown"
);

// Social Links
const socialLinks = [
  { url: "https://github.com/thaeshwesin29", icon: "github", title: "GitHub" },
  {
    url: "https://www.linkedin.com/in/thae-shwe-sin-2a6a90368",
    icon: "linkedin",
    title: "LinkedIn",
  },
  { url: "mailto:thaeshwesin2000@gmail.com", icon: "mail", title: "Email" },
  { url: "https://t.me/YourTelegram", icon: "telegram", title: "Telegram" },
  { url: "https://twitter.com/YourTwitter", icon: "twitter", title: "Twitter" },
  { url: "https://www.facebook.com/YourFacebook", icon: "facebook", title: "Facebook" }, // <-- Added

];
</script>

<style scoped>
/* Animations same as before */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes nameReveal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes float1 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}
@keyframes float2 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(-15px); }
}
@keyframes float3 {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-25px) translateX(5px); }
}
@keyframes floatProfile {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes pulseSlow {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}
.animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
.animate-fade-in { animation: fadeIn 1s ease-out forwards; }
.animate-name-reveal { animation: nameReveal 1s ease-out forwards; }
.animate-float-1 { animation: float1 6s ease-in-out infinite; }
.animate-float-2 { animation: float2 8s ease-in-out infinite; }
.animate-float-3 { animation: float3 7s ease-in-out infinite; }
.animate-float-profile { animation: floatProfile 4s ease-in-out infinite; }
.animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-700 { animation-delay: 0.7s; }
.animation-delay-900 { animation-delay: 0.9s; }
.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-2000 { animation-delay: 2s; }
</style>
