import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
  // , {
  //   path: '/dashboard',
  //   name: 'about',
  //   component: () => import('@/views/AboutView.vue'),
  //   meta: {
  //     hasAuth: true
  //   }
  // }
  // , {
  //   path: '/:pathMatch(.*)',
  //   redirect: { name: 'home' }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
