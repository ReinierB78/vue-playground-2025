<template>
  <WidgetLayout>
    <template #title>Todo Input</template>
    <template #content>
      <Input
        :label="t('widgets.todo.placeholder')"
        id="todo-input-title"
        :handle-input="
          (value: string) => {
            refTodoInput.title = value
          }
        "
        :model-value="refTodoInput?.title"
        :handle-enter-key="createTodo"
      />
      <InputTextarea
        :label="t('widgets.todo.descriptionPlaceholder')"
        id="todo-input-description"
        :handle-input="
          (value: string) => {
            refTodoInput.description = value
          }
        "
        :placeholder="t('widgets.todo.descriptionPlaceholder')"
        :model-value="refTodoInput?.description"
        class="mt-4"
      />
      <Button :handleClick="createTodo">
        {{ t('widgets.todo.addTask') }}
      </Button>
    </template>
    <template #footer>Todo Input footer</template>
  </WidgetLayout>
</template>

<script setup lang="ts">
import { Button } from '@/components/molecules'
import { Input } from '@/components/molecules/inputs'
import InputTextarea from '@/components/molecules/inputs/InputTextarea.vue'
import { Todo } from '@/types'
import WidgetLayout from '@/widgets/WidgetLayout.vue'
import { useTodoStore } from '@/widgets/todo/todo-store'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const locale = useI18n()

const refTodoInput = ref<Todo>({
  title: '',
  completed: false,
  description: ''
})

const todoStore = useTodoStore()

const createTodo = () => {
  console.log('Creating todo:', refTodoInput.value.title)
  if (refTodoInput.value?.title?.trim() === '') {
    alert('Voer een geldige todo in.')
    return
  }
  todoStore.createTodo(refTodoInput.value)
  refTodoInput.value = { title: '', completed: false, description: '' }
  console.log('Todo toegevoegd, input gereset.', refTodoInput.value)
}
</script>
