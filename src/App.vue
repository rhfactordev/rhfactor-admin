<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |

      <!-- Adicionar a rotas de autenticação -->
      <router-link to="/config/signs">Signos</router-link> |
      <router-link to="/config/planets">Planetas</router-link> |
      <router-link to="/config/aspects">Aspectos</router-link> |
      <router-link to="/config/houses">Casas</router-link>

    </nav>
  </header>

  <router-view/>

</template>

<script>

export default {
  components: {
  },
  setup () {
  }
}
</script>
