<template>

  <h1>Posts</h1>

  <q-table
    title="Entradas do blog"
    :rows="page.content"
    :pagination="initialPagination"
    :hide-pagination="true"
    selection="single"
    v-model:selected="selected"
    row-key="id"
  />

  <div>
    <q-btn @click="goForm" :label="isEdition ? 'Alterar Entrada' : 'Criar Entrada'" :disable="loading" color="primary"/>
  </div>

  <a @click="previewsPage">Anterior</a> - <a @click="nextPage">Próxima</a>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import service from '@/services'
import { useRouter } from 'vue-router'

const resource = 'blog/1/entry'
const router = useRouter()

const page = ref({
  content: [],
  pages: 1
})

const loading = computed(() => {
  return false
})

const selected = ref()

const currentPage = ref(0)

const initialPagination = {
  sortBy: 'id',
  descending: false,
  page: 0,
  rowsPerPage: 10
}

const isEdition = computed(() => selected.value != null && selected.value.length)

const nextPage = async () => {
  currentPage.value = currentPage.value + 1
  await getPage()
}

const previewsPage = async () => {
  currentPage.value = currentPage.value - 1
  await getPage()
}

const getPage = async () => {
  console.log('Carregar página', page.value)
  const { data, errors } = await service.crud.list({
    resource,
    page: currentPage.value
  })
  if (!errors) {
    page.value = data
  }
}

const goForm = () => {
  if (isEdition.value) {
    router.push(`/blog/post/${selected.value[0].id}/edit`)
  } else {
    router.push('/blog/post/add')
  }
}

onMounted(async () => {
  getPage()
})

</script>
