import { createRouter, createWebHistory } from 'vue-router'
import { menuLis } from '@/config'

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
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      hasAuth: true
    }
  },
  ...menuLis.filter(it => it.route != null && it.route === true)
    .map(it => ({
      name: it.name,
      path: it.path,
      component: () => import('@/views/crud/list/index.vue'),
      props: route => {
        return { resource: it.resource, schema: it.schema }
      }
    }))

  // {
  //   path: '/config/:resource',
  //   name: 'crudResource',
  //   component: () => import('@/views/crud/list/index.vue'),
  //   props: route => {
  //     console.log('Crud route', route.params.resource)
  //     return { resource: route.params.resource }
  //   },
  //   meta: {
  //     hasAuth: true
  //   }
  // }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
