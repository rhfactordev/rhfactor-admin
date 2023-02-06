<template>

  <h1>Formulário</h1>

  <dynamic-form :schema="schema" :field-data="values"></dynamic-form>

</template>

<script>
import DynamicForm from '@/components/DynamicForm/index.vue'
import * as Yup from 'yup'

export default {
  name: 'SignForm',
  components: { DynamicForm },
  props: {
    values: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup (props) {
    const schema = {
      fields: [
        {
          label: 'Nome',
          name: 'name',
          as: 'input',
          rules: Yup.string().required()
        },
        {
          label: 'Slug',
          name: 'source',
          as: 'input',
          rules: Yup.string().required()
        }
      ]
    }

    return {
      schema
    }
  }
}
</script>

<style scoped>

</style>
