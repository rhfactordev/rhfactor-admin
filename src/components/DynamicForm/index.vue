<template>
   <VeeForm class="w-100">
      <div
          v-for="{ as, name, label, children, ...attrs } in computedFields"
          :key="name"
          class="mb-3"
      >
        <label :for="name" class="form-label">{{ label }} v: {{ value }}</label>
        <Field :as="as" class="form-control" :id="name" :name="name" v-bind="attrs">
          <template v-if="children && children.length">
            <component
                v-for="({ tag, text, ...childAttrs }, idx) in children"
                :key="idx"
                :is="tag?tag:'option'"
                v-bind="childAttrs"
            >
              {{ text }}
            </component>
          </template>
        </Field>
        <ErrorMessage :name="name" />
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="submit">{{ actionLabel }}</button>
      </div>
  </VeeForm>
</template>

<script setup>
import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate'
import { computed, defineProps } from 'vue'

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  fieldData: {
    type: Object,
    required: false
  },
  actionLabel: {
    type: String,
    required: false,
    default: 'Salvar'
  }
})

const computedFields = computed(
  () => {
    if (props.fieldData == null) {
      return props.schema.fields.map(item => {
        return { ...item, value: item.value == null ? '' : item.value, none: true }
      })
    }
    return props.schema.fields.map(item => ({ ...item, value: props.fieldData[item.name] }))
  }
)

</script>
