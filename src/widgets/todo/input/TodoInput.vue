<template>
  <WidgetLayout>
    <template #title>Todo Input</template>
    <template #content>
      <Input
        :label="t('widgets.todo.placeholder')"
        id="todo-input"
        :handle-input="
          (value: string) => {
            refTodoInput = value
          }
        "
        :model-value="refTodoInput"
        :handle-enter-key="createTodo"
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
import WidgetLayout from '@/widgets/WidgetLayout.vue'
import { useTodoStore } from '@/widgets/todo/todo-store'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const locale = useI18n()

const refTodoInput = ref('')

const todoStore = useTodoStore()

const createTodo = () => {
  console.log('Creating todo:', refTodoInput.value)
  if (refTodoInput.value.trim() === '') {
    alert('Voer een geldige todo in.')
    return
  }
  todoStore.createTodo(refTodoInput.value)
  refTodoInput.value = ''
  console.log('Todo toegevoegd, input gereset.', refTodoInput.value)
}
</script>
