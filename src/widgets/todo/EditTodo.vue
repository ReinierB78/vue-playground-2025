<template>
  <Input
    :label="t('widgets.todo.placeholder')"
    id="todo-input-title"
    :handle-input="
      (value: string) => {
        onTitleInput(value)
      }
    "
    :model-value="values?.title"
    :handle-enter-key="updateTodo"
  />
  <InputTextarea
    :label="t('widgets.todo.descriptionPlaceholder')"
    id="todo-input-description"
    :handle-input="
      (value: string) => {
        onDescriptionInput(value)
      }
    "
    :placeholder="t('widgets.todo.descriptionPlaceholder')"
    :model-value="values?.description"
    class="mt-4"
    :handle-enter-key="updateTodo"
  />
  <Button :handle-click="saveTodo" class="mt-4">
    {{ t('general.save') }}
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/molecules'
import { Input, InputTextarea } from '@/components/molecules/inputs'
import { Todo } from '@/types'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  handleInput?: (value: Todo) => void
  handleSave?: (value: Todo) => void
  values: Todo
}>()

const refTodoInput = ref<Todo>({
  title: '',
  completed: false,
  description: ''
})

const onTitleInput = (value: string) => {
  refTodoInput.value.title = value
}

const onDescriptionInput = (value: string) => {
  refTodoInput.value.description = value
}

const updateTodo = () => {
  if (props.handleInput && refTodoInput?.value) {
    props.handleInput(refTodoInput.value)
  }
}

const saveTodo = () => {
  if (props.handleSave && refTodoInput?.value) {
    props.handleSave(refTodoInput.value)
  }
}

watch(
  () => refTodoInput?.value,
  newVal => {
    if (props.handleInput) {
      props.handleInput(newVal)
    }
  },
  { deep: true }
)
</script>
