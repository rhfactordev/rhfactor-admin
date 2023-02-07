<template>

  Formulário vem aqui
  <pre>{{ computedFields }}</pre>

   <VeeForm class="w-100">
      <div
          v-for="{ as, name, label, children, ...attrs } in computedFields"
          :key="name"
          class="mb-3"
      >
        <label :for="name" class="form-label">{{ label }}</label>
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
  Final
</template>

<script>
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
import { computed } from 'vue'

export default {
  name: 'DynamicForm',
  components: {
    VeeForm,
    Field,
    ErrorMessage
  },
  props: {
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
  },
  setup (props) {
    const computedFields = computed(
      () => {
        return props.schema.fields

        // if (props.fieldData == null) {
        //   return props.schema.fields
        // }
        // return props.schema.fields
        // return props.schema.fields.map(item => ({ ...item, value: props.fieldData[item.name] }))
      }
    )

    return {
      loading: false,
      computedFields
    }
  }

}
</script>
