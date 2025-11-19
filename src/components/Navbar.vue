<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
defineOptions({ name: 'NavbarCustom' })

const mobileOpen = ref(false)
const scrolled = ref(false)
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

const socials = ref(
  {
    icon: 'instagram',
    url: 'https://www.instagram.com/dimazzbagazz/'
  },
  {
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/dimasbagassaputro/'
  },
  {
    icon: 'github',
    url: 'https://github.com/Diba15'
  }
)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const onClickSocial = (url) => {
  window.open(url, '_blank')
}
</script>

<template>
  <nav :class="[
    'sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
    scrolled ? 'bg-gray-900/80 backdrop-blur-md border-gray-800 py-3' : 'bg-gray-900 border-gray-800 py-5'
  ]">
    <div class="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">

      <!-- Logo / Brand -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <div
          class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-gray-900 font-bold text-xl neue group-hover:scale-110 transition-transform">
          D
        </div>
        <span class="text-xl font-bold text-white tracking-wide neue group-hover:text-accent transition-colors">
          DIMAS<span class="text-accent">.</span>
        </span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink v-for="route in ['/', '/about', '/projects']" :key="route" :to="route"
          class="text-sm font-medium text-gray-400 hover:text-white transition-colors relative py-1 group"
          active-class="!text-accent">
          {{ route === '/' ? 'Home' : route.slice(1).charAt(0).toUpperCase() + route.slice(2) }}
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-[.router-link-active]:w-full"></span>
        </RouterLink>
      </div>

      <!-- Socials & Mobile Toggle -->
      <div class="flex items-center gap-4">
        <!-- Social Icons (Desktop) -->
        <div class="hidden md:flex items-center gap-3 border-l border-gray-700 pl-4">
          <button @click="onClickSocial('https://www.instagram.com/dimazzbagazz/')"
            class="text-gray-400 hover:text-accent transition-colors hover:scale-110 transform duration-200">
            <i :class="`pi pi-instagram text-lg`"></i>
          </button>
          <button @click="onClickSocial('https://github.com/Diba15')"
            class="text-gray-400 hover:text-accent transition-colors hover:scale-110 transform duration-200">
            <i :class="`pi pi-github text-lg`"></i>
          </button>
          <button @click="onClickSocial('https://www.linkedin.com/in/dimasbagassaputro/')"
            class="text-gray-400 hover:text-accent transition-colors hover:scale-110 transform duration-200">
            <i :class="`pi pi-linkedin text-lg`"></i>
          </button>
        </div>

        <!-- Mobile Toggle -->
        <button
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          @click="toggleMobile" aria-label="Open menu">
          <i class="pi pi-bars"></i>
        </button>
      </div>
    </div>
  </nav>

  <!-- Fullscreen mobile menu overlay -->
  <div v-show="mobileOpen" class="fixed inset-0 z-[60] bg-gray-900/95 backdrop-blur-xl transition-all duration-300">
    <div class="flex flex-col h-full p-6">
      <div class="flex justify-end">
        <button
          class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          @click="closeMobile" aria-label="Close menu">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center gap-8">
        <RouterLink v-for="route in ['/', '/about', '/projects']" :key="route" :to="route" @click="closeMobile"
          class="text-3xl font-bold text-gray-400 hover:text-white transition-colors neue tracking-wider"
          active-class="!text-accent">
          {{ route === '/' ? 'Home' : route.slice(1).charAt(0).toUpperCase() + route.slice(2) }}
        </RouterLink>
      </div>

      <div class="flex justify-center gap-6 pb-8">
        <button @click="onClickSocial('https://www.instagram.com/dimazzbagazz/')"
          class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent transition-all duration-300">
          <i :class="`pi pi-instagram text-xl`"></i>
        </button>
        <button @click="onClickSocial('https://github.com/Diba15')"
          class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent transition-all duration-300">
          <i :class="`pi pi-github text-xl`"></i>
        </button>
        <button @click="onClickSocial('https://www.linkedin.com/in/dimasbagassaputro/')"
          class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent transition-all duration-300">
          <i :class="`pi pi-linkedin text-xl`"></i>
        </button>
      </div>
    </div>
  </div>
</template>
