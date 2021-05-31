import { createRouter, createWebHistory } from 'vue-router'

  const routes = [
    {
      name: 'Home',
      path: '/',
      component: () => import('./views/Home/index.vue')
    },
    {
      name: 'Listings',
      path: '/listings',
      component: () => import('./views/Listings/index.vue')
    },
  ]

export const router = createRouter({
  history: createWebHistory(),
  routes
})