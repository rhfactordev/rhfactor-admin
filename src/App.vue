<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Karana</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-nav">
      <div class="nav-item">
        <a class="nav-link px-3" @click="publish" >Publicar Site</a>
      </div>
    </div>
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3 sidebar-sticky">
          <ul class="nav flex-column">
            <li v-for="(menu,i) in menus" :key="i" class="nav-item">
              <router-link :to="menu.path" class="nav-link active" aria-current="page" href="#">
                <span data-feather="home" class="align-text-bottom"></span>
                {{ menu.name }}
              </router-link>
            </li>
            <li  class="nav-item">
              <router-link to="/blog/post" class="nav-link active" aria-current="page" href="#">
                <span data-feather="home" class="align-text-bottom"></span>
                Blog
              </router-link>
            </li>
          </ul>

        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup>
import { menuList } from '@/config'
import { ref } from 'vue'
import useLocalStorage from '@/hooks/useLocalStorage'
import services from '@/services'

const user = useLocalStorage()
const roles = user.getRoles()

const menus = ref(menuList.filter(it => (it.roles == null || it.roles.length === 0) || it.roles.some(v => roles.includes(v))))

const publish = async () => {
  const createdAt = user.getLastPublishDate()
  const now = Date.now()

  if (createdAt != null) {
    const oneDay = 10 * 60 * 1000
    const isMoreThanADay = (now - createdAt) > oneDay
    if (!isMoreThanADay) {
      alert('Aguarde a publicação')
      return
    }
  }

  // TODO: Fazer com que o site seja o do cliente
  const data = await services.site.publish({ site: 1 })
    .catch(e => {
      console.log(e)
      alert('Erro para publicar')
    })

  if (data) {
    user.setLastPublishDate(now)
    alert('Site em publicação')
  }
}

</script>
