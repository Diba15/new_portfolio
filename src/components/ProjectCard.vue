<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  description: String,
  image: String,
  link: String,
  githubLink: String,
  subjects: Array,
  under_dev: Boolean,
})

const isHover = ref(false)
</script>

<template>
  <div
    class="group flex flex-col h-full bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
    <!-- Image Section -->
    <div class="relative overflow-hidden h-48 shrink-0">
      <div class="absolute inset-0 bg-gray-900 animate-pulse" v-if="!image"></div>
      <img :src="image" :alt="title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60"></div>

      <!-- Under Dev Badge -->
      <div v-if="under_dev"
        class="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
        </span>
        <span class="text-[10px] font-bold uppercase tracking-wider text-yellow-500">In Progress</span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex flex-col flex-grow p-6">
      <div class="mb-4">
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">{{ title }}
        </h3>
        <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">{{ description }}</p>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-6 mt-auto">
        <span v-for="subject in subjects" :key="subject"
          class="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-400 bg-gray-900/50 rounded-md border border-gray-700/50 group-hover:border-gray-600 transition-colors">
          {{ subject }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-4 border-t border-gray-700/50">
        <a :href="link" target="_blank"
          class="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gray-900 bg-accent rounded-lg hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/10 hover:shadow-accent/20">
          <i class="pi pi-external-link text-xs"></i>
          Visit
        </a>
        <a :href="githubLink" target="_blank"
          class="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gray-300 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all duration-300">
          <i class="pi pi-github text-xs"></i>
          Code
        </a>
      </div>
    </div>
  </div>
</template>
