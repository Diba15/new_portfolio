<script setup>
import programming from '@/assets/img/programming.svg'
import mongodb from '@/assets/img/mongodb.png'
import vue from '@/assets/img/vue.png'
import tailwind from '@/assets/img/tailwind.svg'
import elysia from '@/assets/img/elysia.png'
</script>

<template>
  <div class="min-h-[calc(100vh-96px)] bg-gray-900 flex items-center relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

    <div
      class="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

      <!-- Text Content -->
      <div class="flex flex-col gap-6 animate-fade-up">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 w-fit backdrop-blur-sm">
          <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span class="text-sm font-medium text-gray-300">Frontend Web Developer</span>
        </div>

        <div class="space-y-2">
          <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight neue">
            Dimas Bagas <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Saputro</span>
          </h1>
          <p class="text-xl text-gray-400 max-w-lg leading-relaxed">
            Crafting exceptional digital experiences with a blend of creative design and robust engineering.
          </p>
        </div>

        <div class="flex flex-wrap gap-4 mt-4">
          <RouterLink to="/projects"
            class="px-8 py-4 bg-accent text-gray-900 rounded-xl font-bold text-lg hover:bg-accent/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-accent/20">
            View Projects
            <i class="pi pi-arrow-right"></i>
          </RouterLink>
          <RouterLink to="/about"
            class="px-8 py-4 bg-transparent text-white border border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-800 hover:border-gray-600 transition-all duration-300">
            About Me
          </RouterLink>
        </div>

        <!-- Tech Stack -->
        <div class="mt-12 pt-8 border-t border-gray-800">
          <p class="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">Tech Stack</p>
          <div class="flex gap-6 items-center grayscale hover:grayscale-0 transition-all duration-500">
            <img :src="vue" alt="Vue.js" class="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity" />
            <img :src="tailwind" alt="Tailwind" class="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity" />
            <img :src="elysia" alt="Elysia" class="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity" />
            <img :src="mongodb" alt="MongoDB" class="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      <!-- Visual Content -->
      <div class="hidden lg:flex justify-center relative animate-fade-in">
        <div class="relative w-full max-w-lg">
          <div class="absolute inset-0 bg-accent/20 blur-3xl rounded-full transform rotate-12"></div>
          <img :src="programming" alt="Coding Illustration"
            class="relative z-10 w-full drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out" />
        </div>
      </div>
    </div>

    <!-- Footer Note -->
    <div class="absolute bottom-8 left-0 right-0 text-center">
      <p class="text-gray-600 text-sm font-medium flex items-center justify-center gap-2">
        Built with <i class="pi pi-heart-fill text-red-500 animate-bounce"></i> using Vue & Tailwind
      </p>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-up {
  animation: fadeUp 1s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 1.2s ease-out forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
