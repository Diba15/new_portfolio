<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
defineOptions({ name: 'NavbarCustom' })

const mobileOpen = ref(false)
const toggleMobile = () => (mobileOpen.value = !mobileOpen.value)
const closeMobile = () => (mobileOpen.value = false)

const currentRoute = useRouter()
const routeName = computed(() => {
  switch (currentRoute.currentRoute.value.path) {
    case '/':
      return 'Home'
    case '/about':
      return 'About'
    case '/projects':
      return 'Projects'
    default:
      return ''
  }
})

const onClickSocial = (url) => {
  window.open(url, '_blank')
  console.log('Clicked social')
}
</script>

<template>
  <div
    class="flex gap-4 justify-center items-center md:pt-4 md:px-4 z-30 relative"
  >
    <!-- Left routes - hidden on small screens -->
    <div class="hidden md:flex flex-gap-4 grow justify-around">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
    </div>

    <!-- Center title + mobile bars -->
    <div
      class="flex-grow bg-accent/95 md:rounded-t-xl p-4 md:p-2 justify-between md:justify-center flex md:min-w-2xl items-center"
    >
      <button class="hidden md:inline-flex"></button>

      <h1 class="text-2xl text-center font-bold text-gray-100">
        Portfolio <span class="hidden md:inline-flex"> - {{ routeName }}</span>
      </h1>

      <!-- Bars button: visible only on mobile -->
      <button
        class="md:hidden p-2 rounded-full flex items-center"
        @click="toggleMobile"
        aria-label="Open menu"
      >
        <i class="pi pi-bars text-white"></i>
      </button>
    </div>

    <!-- Right social - hidden on small screens -->
    <div class="hidden md:flex grow justify-around">
      <button v-on:click="onClickSocial('https://www.instagram.com/dimazzbagazz/')"
        class="flex items-center overflow-hidden bg-gray-200 hover:bg-accent p-2 rounded-full"
      >
        <i class="pi pi-instagram text-lg"></i>
      </button>
      <button v-on:click="onClickSocial('https://www.linkedin.com/in/dimasbagassaputro/')"
        class="flex items-center overflow-hidden bg-gray-200 hover:bg-accent p-2 rounded-full"
      >
        <i class="pi pi-linkedin text-lg"></i>
      </button>
      <button v-on:click="onClickSocial('https://github.com/Diba15')"
        class="flex items-center overflow-hidden bg-gray-200 hover:bg-accent p-2 rounded-full"
      >
        <i class="pi pi-github text-lg"></i>
      </button>
    </div>
  </div>

  <!-- Fullscreen mobile menu overlay -->
  <div
    v-show="mobileOpen"
    @click.self="closeMobile"
    :class="[
      'fixed inset-0 z-50 bg-gray-900/95 flex flex-col items-center pt-16 transition-transform duration-450 ease-out',
      mobileOpen ? 'translate-y-0' : '-translate-y-full',
    ]"
    style="backdrop-filter: blur(4px)"
  >
    <!-- Close button -->
    <div class="w-full flex justify-end px-6 pb-4">
      <button
        class="p-3 rounded-full bg-gray-200 hover:bg-accent"
        @click="closeMobile"
        aria-label="Close menu"
      >
        <i class="pi pi-times"></i>
      </button>
    </div>

    <!-- Routes -->
    <nav class="flex flex-col gap-6 items-center mt-6">
      <RouterLink to="/" class="text-2xl text-gray-100" @click="closeMobile">Home</RouterLink>
      <RouterLink to="/about" class="text-2xl text-gray-100" @click="closeMobile">About</RouterLink>
      <RouterLink to="/projects" class="text-2xl text-gray-100" @click="closeMobile"
        >Projects</RouterLink
      >
    </nav>

    <!-- Socials -->
    <div class="flex gap-4 mt-12">
      <a class="p-3 rounded-full bg-gray-200 hover:bg-accent" href="#" @click="closeMobile">
        <i class="pi pi-instagram text-lg"></i>
      </a>
      <a class="p-3 rounded-full bg-gray-200 hover:bg-accent" href="#" @click="closeMobile">
        <i class="pi pi-linkedin text-lg"></i>
      </a>
      <a class="p-3 rounded-full bg-gray-200 hover:bg-accent" href="#" @click="closeMobile">
        <i class="pi pi-github text-lg"></i>
      </a>
    </div>
  </div>
</template>
