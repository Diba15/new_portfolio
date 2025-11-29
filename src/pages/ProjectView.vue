<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import { ref, onMounted } from 'vue'
import api from '@/http-service.js'
import Loading from '@/components/Loading.vue'

const projects = ref([])
const isLoading = ref(true)

onMounted(async () => {
  const projectData = await api.projects.get()
  projects.value = projectData.data.body

  isLoading.value = false
})
</script>

<template>
  <div class="min-h-[calc(100vh-96px)] bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-up">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 neue tracking-wide">
          Featured <span class="text-accent">Projects</span>
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          A collection of my recent work, showcasing my journey in web development and problem solving.
        </p>
        <div class="w-24 h-1 bg-accent mx-auto mt-8 rounded-full"></div>
      </div>

      <!-- Content -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
        <Loading />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
        <ProjectCard v-for="project in projects" :key="project.id" :title="project.title"
          :description="project.description" :image="project.image" :link="project.link"
          :githubLink="project.githubLink" :subjects="project.subjects" :under_dev="project.under_dev" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out 0.3s forwards;
  opacity: 0;
}

@keyframes fadeUp {
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
</style>
