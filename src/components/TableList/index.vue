<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="(h,i) in computedHeaders" :key="i">
          {{ h }}
        </th>
        <th v-if="hasAction">Ações</th>
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
    <tfoot>
      <tr>
        <td colspan="100%">
          <p>Você está na págiana {{currentPage}} de {{totalPages}} </p>
          <nav v-if="hasPagination" aria-label="Page navigation example">
            <ul class="pagination">
              <li @click="previewsPage" class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li @click="nextPage" class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
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
    },
    currentPage: {
      type: Number,
      default: () => { return 1 }
    }
  },
  computed: {
    computedHeaders () {
      if (this.content.length === 0) {
        return ['Sem dados']
      }
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
