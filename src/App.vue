<script setup>
import { RouterView, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { computed } from 'vue'

const route = useRouter()
const currentRoute = computed(() => route.currentRoute.value.path)

console.log(currentRoute.value)
</script>

<template>
  <Navbar />

  <div class="min-h-[calc(100vh-96px)] rounded-t-3xl">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
