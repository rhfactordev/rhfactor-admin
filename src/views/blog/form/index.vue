<template>
  <h1>{{ isEdition ? 'Editar post' : 'Adicionar Post' }}</h1>

  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >

    <q-select filled
              v-model="post.category"
              :options="options"
              label="Categoria"
              emit-value
              map-options
    />

    <q-input
      filled
      v-model="post.title"
      label="Título *"
      hint="Título da postagem"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />

    <q-input
      filled
      type="text"
      v-model="post.slug"
      label="Slug *"
      hint="URL com boas praticas SEO"
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />

    <q-input
      filled
      type="text"
      v-model="post.thumb"
      label="Thumb *"
      hint="URL com boas praticas SEO"
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />

    <div class="q-pa-md q-gutter-sm">
      <q-editor
        v-model="post.content"
        :dense="$q.screen.lt.md"
        :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
        :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
      />
    </div>

    <div>
      <q-btn :label="isEdition ? 'Alterar Entrada' : 'Criar Entrada'" :disable="loading" type="submit" color="primary"/>
    </div>

  </q-form>

</template>

<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import service from '@/services'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number
})

const router = useRouter()
const resource = 'blog/1/entry'
const loadingCategories = ref(false)
const loadingSubmit = ref(false)

const loading = computed(() => {
  return loadingCategories.value || loadingSubmit.value
})

const post = ref({
  category: null,
  blog: 1,
  title: '',
  slug: '',
  content: '',
  thumb: ''
})

const loadCategroies = async () => {
  options.value = [
    { value: 1, label: 'Mídia / Notícia' }
  ]
}

const options = ref([])

const isEdition = computed(() => props.id != null && props.id != null)

onMounted(async () => {
  loadCategroies()

  if (props.id != null && props.id > 0) {
    console.log('Carregar post')
    if (loading.value) {
      return
    }

    loading.value = true

    const { data, errors } = await service.crud.findOne({
      resource,
      id: props.id
    })
    if (data) {
      post.value = data
      return
    }
    alert(errors)
    loading.value = false
  }
})

const onSubmit = async (e) => {
  const { data, errors } = !isEdition.value
    ? await service.crud.create({ resource, payload: post.value })
    : await service.crud.update({ resource, id: props.id, payload: post.value })

  if (data) {
    router.push('/blog/post')
  }

  alert(errors)
}

</script>
