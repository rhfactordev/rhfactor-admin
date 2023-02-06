<template>

  <h1>Formulário</h1>
  <dynamic-form @submit="submit" :schema="schema" :field-data="values"></dynamic-form>

</template>

<script>
import DynamicForm from '@/components/DynamicForm/index.vue'
import * as Yup from 'yup'
import { computed } from 'vue'
import services from '@/services'

export default {
  name: 'SignForm',
  components: { DynamicForm },
  props: {
    values: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup (props, { emit }) {
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

    const isEdition = computed(() => props.values != null && props.values.id != null)

    const submit = async (value) => {
      const { data, errors } = !isEdition.value
        ? await services.crud.create({ resource: 'signs', payload: value })
        : await services.crud.update({ resource: 'signs', id: props.values.id, payload: value })

      console.log('retornoSubmit', data, errors)

      if (data) {
        emit('saved', data)
        return
      }

      alert(errors)
    }

    return {
      schema, submit
    }
  }
}
</script>

<style scoped>

</style>
