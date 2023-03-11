<template>
  <div class="q-pa-md">

    <q-btn @click="goForm" :label="isEdition ? 'Alterar Entrada' : 'Criar Entrada'" :disable="loading" color="primary"/>

    <q-table
      ref="tableRef"
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
      selection="single"
      v-model:selected="selected"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/services'

const resource = 'blog/1/entry'
const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  {
    name: 'categoryName',
    required: true,
    label: 'Categoria',
    align: 'left',
    field: row => row.category.name,
    sortable: true
  },
  {
    name: 'title',
    required: true,
    label: 'Título',
    align: 'left',
    field: row => row.title,
    sortable: true
  },
  {
    name: 'url',
    required: true,
    label: 'URL',
    align: 'left',
    field: row => row.slug,
    sortable: true
  }
]

const isEdition = computed(() => selected.value != null && selected.value.length)
const router = useRouter()

const tableRef = ref()
const selected = ref()
const rows = ref([])
const filter = ref('')
const loading = ref(false)
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

const onRequest = async (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  // const filter = props.filter

  loading.value = true

  const startRow = (page - 1)

  // fetch data from "server"
  const { data } = await service.crud.list({ resource, page: startRow, size: rowsPerPage, sort: pagination.value.sortBy })

  // clear out existing data and add new
  rows.value.splice(0, rows.value.length, ...data.content)

  // don't forget to update local pagination object
  pagination.value.page = page
  pagination.value.rowsNumber = data.pages * pagination.value.rowsPerPage
  pagination.value.rowsPerPage = rowsPerPage
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending

  loading.value = false
}

const goForm = () => {
  if (isEdition.value) {
    router.push(`/blog/post/${selected.value[0].id}/edit`)
  } else {
    router.push('/blog/post/add')
  }
}

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction()
})

</script>
