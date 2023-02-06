<template>
  <div class='home'>
    <h1 class="mb-5">Listagem de signos</h1>

    <pre>
      Current Page {{currentPage}}
      Total Pages {{pages}}
      Page {{ content }}
    </pre>

    <table-list :content="page.content" :current-page="currentPage" :total-pages="page.pages"
                @nextPage="nextPage"
                @previewsPage="previewsPage">
      <template v-slot:action="slotAction">
        <button>Editar {{ slotAction.id }}</button>
      </template>
    </table-list>
  </div>
</template>

<script>

import { ref, onMounted } from 'vue'
import TableList from '@/components/TableList/index.vue'
import service from '@/services'

export default {
  name: 'ConfigAstralSigns',
  components: {
    TableList
  },
  data () {
    const getPage = async () => {
      const { data, errors } = await service.crud.list({
        resource: 'planets',
        page
      })
      if (!errors) {
        page.value = data
      }
    }

    const currentPage = ref(0)
    const page = ref({
      content: [],
      pages: 2
    })

    const nextPage = async () => {
      currentPage.value = currentPage.value + 1
      await getPage()
    }

    const previewsPage = async () => {
      currentPage.value = currentPage.value - 1
      await getPage()
    }

    onMounted(() => {
      getPage()
    })

    return {
      page,
      currentPage,
      nextPage,
      previewsPage
    }
  }
}
</script>
