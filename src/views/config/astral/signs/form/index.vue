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
  setup () {
    const values = {
      source: 'virgo',
      name: 'Virgem'
    }

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
      schema, values
    }
  }
}
</script>

<style scoped>

</style>
