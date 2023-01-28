<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view/>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { watch } from 'vue'

export default {
  setup () {
    const router = useRouter()
    const route = useRoute()

    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')
        if (!token) {
          router.push({ name: 'Home' })
          // return
        }
        // const { data } = await services.users.getMe()
        // console.log(data)
        // setCurrentUser(data)
      }
    })
  }
}
</script>
