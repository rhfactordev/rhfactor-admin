<template>

  <h1>Formulários</h1>
  <dynamic-form @submit="submit" :schema="schema" :field-data="values"></dynamic-form>

</template>

<script setup>
import DynamicForm from '@/components/DynamicForm/index.vue'
import { computed, defineEmits, defineProps } from 'vue'
import services from '@/services'

const emit = defineEmits(['saved'])
const props = defineProps({
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
})
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

</script>
