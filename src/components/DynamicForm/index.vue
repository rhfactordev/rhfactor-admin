<template>
  <!-- v-slot="{ values }" -->
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
</template>

<script>
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
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
  data () {
    return {
      loading: false
    }
  },
  computed: {
    computedFields () {
      if (this.fieldData == null) {
        return this.schema.fields
      }
      return this.schema.fields.map(item => ({ ...item, value: this.fieldData[item.name] }))
    }
  }
}
</script>
