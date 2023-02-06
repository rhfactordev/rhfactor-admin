<template>
  <modal-factory @close="clear">
    <sign-form :values="editValue" @saved="closeModal" ></sign-form>
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

<script>

import { onMounted, ref } from 'vue'
import TableList from '@/components/TableList/index.vue'
import service from '@/services'
import useModal from '@/hooks/useModal'
import ModalFactory from '@/components/ModalFactory/index.vue'
import SignForm from '@/views/config/astral/signs/form/index.vue'

export default {
  name: 'ConfigAstralSigns',
  components: {
    SignForm,
    ModalFactory,
    TableList
  },
  data () {
    const getPage = async () => {
      const { data, errors } = await service.crud.list({
        resource: 'signs',
        page
      })
      if (!errors) {
        page.value = data
      }
    }

    const modal = useModal()
    const currentPage = ref(0)
    const editValue = ref({})

    const page = ref({
      content: [],
      pages: 1
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

    const edit = async (id) => {
      const { data, errors } = await service.crud.findOne({
        resource: 'planets',
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

    onMounted(() => {
      getPage()
    })

    return {
      page,
      currentPage,
      nextPage,
      previewsPage,
      addNewItem,
      edit,
      editValue,
      clear,
      closeModal
    }
  }
}
</script>
