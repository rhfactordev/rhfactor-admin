<template>
  <div class='home'>
    <h1 class="mb-5">Listagem de signos</h1>
    <table-list :content="content" :total-pages="pages">
      <template v-slot:action="slotAction">
        <button @click="edit({id:slotAction.id})" >Editar {{ slotAction.id }}</button>
      </template>
    </table-list>
  </div>
</template>

<script>

import TableList from '@/components/TableList/index.vue'
import useModal from '@/hooks/useModal'

export default {
  name: 'ConfigAstralSigns',
  components: {
    TableList
  },
  data () {
    const page = {
      content: [
        {
          id: 1,
          source: 'quadratura',
          name: 'Quadratura'
        },
        {
          id: 4,
          source: 'quadratura1',
          name: 'Quadratura1'
        },
        {
          id: 5,
          source: 'quadratura11',
          name: 'Quadratura11'
        },
        {
          id: 6,
          source: 'quadratura111',
          name: 'Quadratura111'
        }
      ],
      pages: 1
    }
    const modal = useModal()

    function edit (prop) {
      console.log('Editar', prop)
      modal.open({ component: 'Login', title: 'Editar Signo', ...prop })
    }

    return {
      content: page.content,
      pages: page.pages,
      edit
    }
  }
}
</script>
