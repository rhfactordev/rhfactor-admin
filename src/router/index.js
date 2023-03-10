import { createRouter, createWebHistory } from 'vue-router'
import { menuList } from '@/config'

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
  {
    path: '/blog/post',
    name: 'addPost',
    component: () => import('@/views/blog/list/index.vue'),
    meta: {
      hasAuth: true
    },
    props: route => {
      return { id: null }
    }
  },
  {
    path: '/blog/post/add',
    name: 'listPost',
    component: () => import('@/views/blog/form/index.vue'),
    meta: {
      hasAuth: true
    },
    props: route => {
      return { id: null }
    }
  },
  {
    path: '/blog/post/:id/edit',
    name: 'editPost',
    component: () => import('@/views/blog/form/index.vue'),
    meta: {
      hasAuth: true
    },
    props: route => {
      return { id: route.params.id }
    }
  },
  ...menuList.filter(it => it.route != null && it.route === true)
    .map(it => ({
      name: it.name,
      path: it.path,
      component: () => import('@/views/crud/list/index.vue'),
      props: route => {
        if (it.props != null) {
          return it.props(route)
        }
        return { resource: it.resource, schema: it.schema }
      }
    }))

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
