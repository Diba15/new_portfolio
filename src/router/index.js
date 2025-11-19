import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'
import ProjectView from '@/pages/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-accent font-bold',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About',
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectView,
      meta: {
        title: 'Project',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = "Portfolio - " + to.meta.title
  next()
})

export default router
