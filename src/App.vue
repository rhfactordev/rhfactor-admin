<template>
  <modal-factory />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |

    <!-- Adicionar a rotas de autenticação -->
    <router-link to="/config/astral/signs">Signos</router-link> |
    <router-link to="/config/astral/houses">Casas</router-link> |
    <router-link to="/config/astral/planets">Planetas</router-link> |
    <router-link to="/config/astral/aspects">Aspectos</router-link> |
  </nav>

  <hr class="mb-10"/>

  <router-view/>

</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { watch } from 'vue'
import { tokenKey } from '@/config'
import ModalFactory from '@/components/ModalFactory/index.vue'

export default {
  components: {
    ModalFactory
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem(tokenKey)
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
