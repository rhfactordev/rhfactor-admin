<template>

  <h1>Formulário s</h1>
  <dynamic-form @submit="submit" :schema="schema" :field-data="values"></dynamic-form>

</template>

<script>
import DynamicForm from '@/components/DynamicForm/index.vue'
import { computed } from 'vue'
import services from '@/services'

export default {
  name: 'CrudForm',
  components: { DynamicForm },
  props: {
    resource: {
      type: String,
      required: true
    },
    schema: {
      type: Object,
      require: true
    },
    values: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup (props, { emit }) {
    const isEdition = computed(() => props.values != null && props.values.id != null)

    const submit = async (value) => {
      console.log('submit', value)
      const { data, errors } = !isEdition.value
        ? await services.crud.create({ resource: props.resource, payload: value })
        : await services.crud.update({ resource: props.resource, id: props.values.id, payload: value })

      if (data) {
        emit('saved', data)
        return
      }

      alert(errors)
    }

    return {
      submit
    }
  }
}
</script>

<style scoped>

</style>
