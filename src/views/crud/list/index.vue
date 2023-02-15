<template>
  <modal-factory @close="clear">
    <crud-form :resource="resource" :schema="schema" :values="editValue" @saved="reload" ></crud-form>
  </modal-factory>

  <div class="bg-light">
    <div class="container">
      <div class="card">
        <div class="card-body">

          <a @click="addNewItem" class="btn btn-lg btn-primary">Adicionar</a>

          <table-list :content="page.content" :current-page="currentPage" :total-pages="page.pages"
                      @nextPage="nextPage"
                      @previewsPage="previewsPage">
            <template v-slot:action="slotAction">
              <button @click="edit(slotAction.id)" >Editar {{ slotAction.id }}</button>
            </template>
          </table-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref, watch, defineProps } from 'vue'
import TableList from '@/components/TableList/index.vue'
import service from '@/services'
import useModal from '@/hooks/useModal'
import ModalFactory from '@/components/ModalFactory/index.vue'
import CrudForm from '@/views/crud/form/index.vue'

const modal = useModal()
const currentPage = ref(0)
const editValue = ref({})

const getPage = async () => {
  const { data, errors } = await service.crud.list({
    resource: props.resource,
    page: currentPage.value
  })
  if (!errors) {
    page.value = data
  }
}

const page = ref({
  content: [],
  pages: 1
})

const props = defineProps({
  resource: {
    type: String,
    required: true
  },
  schema: {
    type: Object,
    require: true
  }
})

const nextPage = async () => {
  currentPage.value = currentPage.value + 1
  await getPage()
}

const previewsPage = async () => {
  currentPage.value = currentPage.value - 1
  await getPage()
}

const addNewItem = () => {
  modal.open()
}

const closeModal = () => {
  modal.close()
}

const reload = () => {
  closeModal()
  getPage()
}

const edit = async (id) => {
  const { data, errors } = await service.crud.findOne({
    resource: props.resource,
    id
  })
  if (data) {
    editValue.value = data
    modal.open()
    return
  }
  alert(errors)
}

const clear = () => {
  console.log('clear')
  editValue.value = {}
}

watch(
  () => props.resource,
  async () => {
    page.value = {
      content: [],
      pages: 1
    }

    await getPage()
  }
)

onMounted(() => {
  getPage()
})

</script>
