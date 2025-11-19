<script setup>
import programming from '@/assets/img/programming.svg'
import express from '@/assets/img/express-js.png'
import mongodb from '@/assets/img/mongodb.png'
import vue from '@/assets/img/vue.png'
import tailwind from '@/assets/img/tailwind.svg'
</script>

<template>
  <div
    class="p-2 md:p-4 w-full min-h-[calc(90vh-96px)] bg-accent/95 flex gap-4 justify-around items-center-safe md:items-center shadow-lg from-accent to-orange-600 clip-animate"
  >
    <div class="w-full md:w-1/2 flex flex-col gap-2">
      <div
        class="rounded-full bg-linear-to-r from-gray-100 to-blue-50 w-fit h-10 px-4 flex justify-center items-center text-accent text-center m-auto text-sm font-semibold"
      >
        Frontend Web Developer
      </div>
      <h1 class="text-4xl font-bold text-gray-100 text-center">Dimas Bagas Saputro</h1>
      <p class="mt-4 text-lg text-gray-200 text-center">
        Hi! I'm Dimas, a passionate front-end and back-end developer with a knack for creating
        dynamic and responsive web applications. Let's build something amazing together!
      </p>
      <div class="flex gap-1 justify-center mt-6 *:cursor-pointer">
        <RouterLink to="about"
          class="text-white border-2 border-gray-200 font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-accent transition"
        >
          About Me
        </RouterLink>
        <RouterLink to="projects"
          class="text-white border-2 border-gray-200 font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-accent transition flex items-center gap-2 ml-4"
        >
          Projects <i class="pi pi-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
    <div>
      <img :src="programming" alt="" class="hidden md:inline-flex w-xl" />
    </div>
  </div>

  <div
    class="absolute bottom-0 left-0 rounded-tl-xl flex flex-col md:flex-row justify-between w-full items-center px-10 py-4"
  >
    <div>
      <div
        class="flex gap-4 *:grayscale *:hover:grayscale-0 *:hover:w-14 *:hover:h-14 *:transition-all *:duration-300 *:ease-in-out"
      >
        <img :src="vue" alt="Vue.js Logo" class="w-12 h-12 mb-2" />
        <img :src="tailwind" alt="Tailwind CSS Logo" class="w-12 h-12 mb-2" />
        <img :src="express" alt="Express.js Logo" class="w-12 h-12 mb-2" />
        <img :src="mongodb" alt="MongoDB Logo" class="w-12 h-12 mb-2" />
      </div>
    </div>
    <div class="font-semibold flex items-end">
      <h1>Build with love <i class="text-red-500">❤</i></h1>
    </div>
  </div>
</template>

<style scoped>
.clip-animate {
  animation: clip-anim 2s ease-in-out forwards;
}

@keyframes clip-anim {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  }
}
</style>
