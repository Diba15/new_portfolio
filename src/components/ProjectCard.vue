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
    class="w-xl p-4 relative overflow-hidden"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <img :src="image" :alt="title" class="w-full h-auto block transition-transform duration-300" />
    <div
      :class="[
        'absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300',
        isHover ? 'opacity-100 bg-black/60' : 'opacity-0 bg-black/0',
      ]"
    >
      <div class="p-4 text-center max-w-[90%]">
        <h1 class="text-xl font-bold mb-2">{{ title }}</h1>
        <p class="text-sm mb-4">{{ description }}</p>
        <div class="flex flex-wrap gap-2 my-2 justify-center">
          <div
            v-for="subject in subjects"
            v-bind:key="subject"
            class="bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-white"
          >
            {{ subject }}
          </div>
        </div>
        <div class="flex gap-3 justify-center">
          <a
            :href="link"
            target="_blank"
            class="px-4 py-2 bg-green-600 rounded text-sm flex items-center gap-2"
          >
            <i class="pi pi-globe"></i> Website</a
          >
          <a
            :href="githubLink"
            target="_blank"
            class="px-4 py-2 bg-gray-800 rounded text-sm flex items-center gap-2"
          >
            <i class="pi pi-github"></i> Github</a
          >
        </div>
      </div>
    </div>
  </div>

  <!--  <div class="flex justify-between items-center p-4 bg-accent/90 w-full rounded-xl">-->
  <!--    <div class="flex flex-col justify-between gap-5 w-full">-->
  <!--      <div>-->
  <!--        <div class="flex flex-col-reverse md:flex-row items-center gap-2 ">-->
  <!--          <a v-bind:href="`${link}`" target="_blank" class="font-bold text-3xl text-white">{{-->
  <!--            title-->
  <!--          }}</a>-->
  <!--          <div-->
  <!--            v-if="under_dev"-->
  <!--            class="flex gap-1 items-center bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full ml-2"-->
  <!--          >-->
  <!--            <span class="relative flex size-3">-->
  <!--              <span-->
  <!--                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"-->
  <!--              ></span>-->
  <!--              <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>-->
  <!--            </span>-->
  <!--            <p>Under Development</p>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <h1 class="font-semibold text-md text-gray-300 max-w-lg">{{ description }}</h1>-->
  <!--        <div class="flex flex-wrap gap-2 my-2 justify-center md:justify-start">-->
  <!--          <div-->
  <!--            v-for="subject in subjects"-->
  <!--            v-bind:key="subject"-->
  <!--            class="bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-white"-->
  <!--          >-->
  <!--            {{ subject }}-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div>-->
  <!--        <div class="flex justify-center md:justify-start gap-2">-->
  <!--          <a-->
  <!--            :href="link"-->
  <!--            target="_blank"-->
  <!--            class="px-5 py-2 bg-green-600 rounded-lg text-md text-white font-semibold hover:bg-green-700 transition-all duration-300 ease-in-out"-->
  <!--          >-->
  <!--            <i class="pi pi-globe"></i> Website-->
  <!--          </a>-->
  <!--          <a-->
  <!--            :href="githubLink"-->
  <!--            target="_blank"-->
  <!--            class="px-5 py-2 bg-gray-800 rounded-lg text-md text-white font-semibold hover:bg-gray-900 transition-all duration-300 ease-in-out"-->
  <!--          >-->
  <!--            <i class="pi pi-github"></i> Github-->
  <!--          </a>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <img-->
  <!--      :src="image"-->
  <!--      :alt="title"-->
  <!--      class="min-w-[50%] md:w-1/2 hover:scale-110 transition-all duration-300 ease-in-out"-->
  <!--    />-->
  <!--  </div>-->
</template>

<style scoped></style>
