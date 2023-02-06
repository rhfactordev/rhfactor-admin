<template>
    <div v-if="state.isActive" class="modal fade show" id="exampleModalLive" tabindex="-1" aria-labelledby="exampleModalLiveLabel" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">{{ state.title }}</h5>
            <button @click="handleModalToogle({ status: false })" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" >
            <slot>
              Aqui vem o valor
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
<!--              <button @click="handleModalToogle({ status: false })" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>-->
<!--              <button type="button" class="btn btn-primary">Save changes</button>-->
            </slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import useModal from '../../hooks/useModal'

export default {
  name: 'ModalFactory',
  components: {
  },
  setup (props, { emit }) {
    const modal = useModal()
    const state = reactive({
      isActive: false,
      component: {},
      props: {}
    })

    onMounted(() => {
      // console.log('onMounted', 'handleModalToogle')
      modal.listen(handleModalToogle)
    })

    onBeforeUnmount(() => {
      // console.log('onBeforeUnmount', 'handleModalToogle')
      modal.off(handleModalToogle)
    })

    function handleModalToogle (payload) {
      // console.log('handleModalToogle', payload)
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.title = payload.title
      } else {
        emit('close')
        state.component = {}
        state.props = {}
      }

      state.isActive = payload.status
    }

    return {
      state,
      handleModalToogle
    }
  }
}
</script>
