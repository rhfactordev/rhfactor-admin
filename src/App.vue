<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |

      <!-- Adicionar a rotas de autenticação -->
      <router-link to="/config/sign">Signos</router-link> |
      <router-link to="/config/planet">Planetas</router-link> |
      <router-link to="/config/aspect">Aspectos</router-link> |
      <router-link to="/config/house">Casas</router-link>

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
