<template>
  <VeeForm v-slot="{ handleSubmit }" >
    <form @submit="handleSubmit($event, onSubmitMethod)" :method="schema.action.method" >
      <div
          v-for="{ as, name, label, children, ...attrs } in schema.fields"
          :key="name"
          class="mb-3"
      >
        <label :for="name" class="form-label">{{ label }}</label>
        <Field :as="as" :id="name" :name="name" v-bind="attrs">
          <template v-if="children && children.length">
            <component
                v-for="({ tag, text, ...childAttrs }, idx) in children"
                :key="idx"
                :is="tag"
                v-bind="childAttrs"
            >
              {{ text }}
            </component>
          </template>
        </Field>
        <ErrorMessage :name="name" />
      </div>

      <div class="d-grid gap-2">
        <button :key="label" v-for="{ type, label } in schema.actions"  class="btn btn-primary" :type="type">{{ label }}</button>
      </div>
    </form>
  </VeeForm>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'

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
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onSubmitMethod (values) {
      if (this.loading) {
        return
      }

      this.loading = true
      this.schema.action.path(values).then(res => {
        console.log('onSuccess', values)
      }).catch(err => {
        console.log('onError', err)
      }).finally(() => {
        // console.log('finally')
        this.loading = false
      })
    }
  }
}
</script>
