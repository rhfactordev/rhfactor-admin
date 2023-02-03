<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="(h,i) in computedHeaders" :key="i">
          {{ h }}
        </th>
        <th v-if="hasAction">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(c,j) in content" :key="j" >
        <td v-for="(h,i) in computedHeaders" :key="i">{{c[h]}}</td>
        <slot v-if="hasAction" name="action" :id="c[keyField]" >
          <td>Action action 2</td>
        </slot>
      </tr>
    </tbody>
    <tfoot v-if="hasPagination">
      <tr>
        <td colspan="100%">
          <span @click="previewsPage">Anterior</span> | <span @click="nextPage">Próxima</span>
        </td>
      </tr>
    </tfoot>
  </table>

</template>

<script>
export default {
  name: 'TableList',
  props: {
    headers: {
      type: Array,
      default: () => { return [] }
    },
    content: {
      type: Array
    },
    totalPages: {
      type: Number,
      default: () => { return 1 }
    },
    keyField: {
      type: String,
      default: () => { return 'id' }
    }
  },
  computed: {
    computedHeaders () {
      if (this.headers && this.headers.length > 0) {
        return this.headers
      }
      return Object.keys(this.content[0])
    },
    hasPagination () {
      return this.totalPages > 1
    },
    hasAction () {
      return true
    }
  },
  setup (props, { emit }) {
    const nextPage = () => {
      emit('nextPage')
    }
    const previewsPage = () => {
      emit('previewsPage')
    }

    return {
      nextPage, previewsPage
    }
  }
}
</script>
