<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card align-middle bg-light p-4">
        <div class="card-body">
          <div class="text-center">
            <router-link to="/">
              Logo
            </router-link>
            <h1 class="text-white h3 my-3">Login</h1>
          </div>
          <dynamic-form :schema="schema" action-label="Login" @submit="handleLogin"></dynamic-form>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
<style lang="postcss" scoped>
  .login{
    @apply flex my-10;
  }
</style>
-->

<script>
import DynamicForm from '@/components/DynamicForm/index.vue'
import * as Yup from 'yup'
import service from '@/services'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  components: { DynamicForm },
  setup () {
    const localStorage = useLocalStorage()
    const router = useRouter()

    const handleLogin = async (credentials) => {
      console.log('handleLogin', credentials)

      const { data, errors } = await service.auth.login({
        username: credentials.username,
        password: credentials.password
      })

      if (!errors) {
        localStorage.persist(data)
        router.push({ name: 'dashboard' })
        return
      }

      alert(errors)
    }

    const schema = {
      fields: [
        {
          label: 'E-mail',
          name: 'username',
          as: 'input',
          rules: Yup.string().required()
        },
        {
          label: 'Senha',
          name: 'password',
          as: 'input',
          type: 'password',
          rules: Yup.string().required()
        }
      ]
    }

    return {
      handleLogin, schema
    }
  }
}
</script>
