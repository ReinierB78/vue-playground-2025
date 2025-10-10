import { ref } from 'vue'

const show = ref(false)
const content = ref<null | (() => any)>(null)

export function useModal() {
  function open(modalContent?: () => any) {
    show.value = true
    content.value = modalContent || null
  }
  function close() {
    show.value = false
    content.value = null
  }
  return { show, content, open, close }
}
