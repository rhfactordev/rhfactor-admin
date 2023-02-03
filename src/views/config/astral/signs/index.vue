<template>
  <div class='home'>
    <h1 class="mb-5">Listagem de signos</h1>
    <table-list :content="content" :total-pages="pages" ></table-list>
  </div>
</template>

<script>

import TableList from '@/components/TableList'
// import service from '@/services'
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

    return {
      content: page.content,
      pages: page.pages
    }
  }
}
</script>
