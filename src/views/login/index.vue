<template>
  <div class="login">
    <h1>Login</h1>
    <login-form @onLogin="handleLogin" ></login-form>
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
import { useRouter } from 'vue-router'
import LoginForm from '@/components/LoginForm'
import { onMounted } from 'vue'
import { tokenKey } from '@/config'

export default {
  name: 'LoginView',
  components: { LoginForm },
  setup () {
    const router = useRouter()

    onMounted(() => {
      const token = window.localStorage.getItem(tokenKey)
      if (token) {
        router.push({ name: 'dashboard' })
      }
    })

    function handleLogin () {
      console.log('handleLogin')
    }

    return {
      handleLogin
    }
  }
}
</script>
