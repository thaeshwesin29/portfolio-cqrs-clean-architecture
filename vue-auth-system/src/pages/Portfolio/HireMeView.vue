<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-4">
    <div class="max-w-2xl mx-auto">
      
      <!-- Section Header -->
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-3xl md:text-4xl font-bold leading-tight text-white">
          Ready to <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Collaborate?</span>
        </h2>
        <p class="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
          I'm currently available for freelance projects and full-time opportunities. 
          Let's discuss how we can bring your ideas to life.
        </p>
      </div>

      <!-- Contact Form -->
 <form
  @submit.prevent="submitMessage"
  class="glass-card p-6 md:p-8 rounded-2xl border border-slate-700/20 relative overflow-hidden max-w-xl mx-auto"
>
  <!-- Background Pattern -->
  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-30"></div>
  <div class="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full -translate-y-12 translate-x-12"></div>
  <div class="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500/10 rounded-full translate-y-10 -translate-x-10"></div>
  
  <div class="relative z-10 space-y-5">
    <!-- Name & Email Row -->
    <div class="grid md:grid-cols-2 gap-4 md:gap-6">
      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-300">Your Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Enter your name"
          class="form-input w-full px-3 py-2.5 rounded-xl bg-slate-800/30 border border-slate-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
          required
        />
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-300">Email Address</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          class="form-input w-full px-3 py-2.5 rounded-xl bg-slate-800/30 border border-slate-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
          required
        />
      </div>
    </div>

    <!-- Subject -->
    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-300">Subject</label>
      <input
        v-model="form.subject"
        type="text"
        placeholder="What's this about?"
        class="form-input w-full px-3 py-2.5 rounded-xl bg-slate-800/30 border border-slate-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
      />
    </div>

    <!-- Message -->
    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-300">Message</label>
      <textarea
        v-model="form.message"
        rows="5"
        placeholder="Tell me about your project..."
        class="form-input w-full px-3 py-2.5 rounded-xl bg-slate-800/30 border border-slate-600/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
        required
      ></textarea>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="loading"
      class="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      <span v-if="loading" class="flex items-center justify-center gap-2">
        Sending Message...
      </span>
      <span v-else class="flex items-center justify-center gap-2">
        Send Message
      </span>
    </button>
  </div>
</form>


      <!-- Quick Contact Info -->
      <!-- <div class="mt-12 text-center">
        <p class="text-gray-400 text-base">
          Or reach out directly: 
          <a href="mailto:hello@example.com" class="text-blue-400 hover:text-cyan-400 transition-colors duration-300 ml-2 font-medium">
            hello@example.com
          </a>
        </p>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createContactMessage } from "@/api/commands/contactMessageCommand";
import { useToast } from "vue-toastification";

const toast = useToast();

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const loading = ref(false);

const submitMessage = async () => {
  loading.value = true;
  try {
    const result = await createContactMessage(form.value);

    if (result) {
      toast.success("Your message has been sent! 🎉");
      form.value = { name: "", email: "", subject: "", message: "" };
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  } catch (err) {
    toast.error("Unexpected error occurred.");
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

/* Force text visibility in form inputs */
.form-input {
  color: rgb(255, 255, 255) !important;
  background: rgba(30, 41, 59, 0.4) !important;
}

.form-input::placeholder {
  color: rgb(156, 163, 175) !important; /* gray-400 */
}

.form-input:focus {
  color: rgb(255, 255, 255) !important;
  background: rgba(30, 41, 59, 0.6) !important;
  border-color: rgba(59, 130, 246, 0.5) !important; /* blue-500 */
}

/* Ensure textarea text is visible */
textarea.form-input {
  color: rgb(255, 255, 255) !important;
}
</style>