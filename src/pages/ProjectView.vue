<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import { ref, onMounted } from 'vue'
import ProjectService from '@/service/model/Project.js'
import Loading from '@/components/Loading.vue'

const projects = ref([])
const isLoading = ref(true)

onMounted(async () => {
  const projectData = await ProjectService.getAll()

  projects.value = projectData.data.flat()
  isLoading.value = false
})
</script>

<template>
  <div class="p-2 md:p-4 w-full min-h-[calc(90vh-96px)] bg-accent/95 flex gap-4 clip-animate">
    <div v-if="isLoading" class="flex justify-center mx-auto">
      <Loading />
    </div>
    <div v-else class="flex flex-wrap gap-3 justify-around">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :title="project.title"
        :description="project.description"
        :image="project.image"
        :link="project.link"
        :githubLink="project.githubLink"
        :subjects="project.subjects"
        :under_dev="project.under_dev"
      />
    </div>
  </div>
</template>

<style scoped>
.clip-animate {
  animation: clip-anim 600ms ease-in-out forwards;
}

@keyframes clip-anim {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
</style>
