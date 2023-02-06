<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |

      <!-- Adicionar a rotas de autenticação -->
      <router-link to="/config/astral/signs">Signos</router-link> |
      <router-link to="/config/astral/signs/add">Signos - Adicionar</router-link> |
      <router-link to="/config/astral/houses">Casas</router-link> |
      <router-link to="/config/astral/planets">Planetas</router-link> |
      <router-link to="/config/astral/aspects">Aspectos</router-link> |
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
