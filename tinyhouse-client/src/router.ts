import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('./views/Home/index.vue')
  },
  {
    name: 'Listing',
    path: '/listing/:id',
    component: () => import('./views/Listing/index.vue')
  },
  {
    name: 'Listings',
    path: '/listings/:location?',
    component: () => import('./views/Listings/index.vue')
  },
  {
    name: 'User',
    path: '/user/:id',
    component: () => import('./views/User/index.vue')
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('./views/Login.vue')
  },
  {
    name: 'Stripe',
    path: '/stripe',
    component: () => import('./views/Stripe.vue')
  },
  {
    name: 'Host',
    path: '/host',
    component: () => import('./views/Host.vue')
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./views/NotFound.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
