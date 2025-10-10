<template>
  <WidgetLayout>
    <template #title>Todo Input</template>
    <template #content>
      <EditTodo
        :handle-save="createTodo"
        :values="refTodoInput"
        :handle-input="value => (refTodoInput = value)"
      />
    </template>
    <template #footer>Footer</template>
  </WidgetLayout>
</template>

<script setup lang="ts">
import { Todo } from '@/types'
import WidgetLayout from '@/widgets/WidgetLayout.vue'
import { useTodoStore } from '@/widgets/todo/todo-store'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditTodo from '../EditTodo.vue'

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
    alert(t('widgets.todo.alertWrongFormat'))
    return
  }
  todoStore.createTodo(refTodoInput.value)
  refTodoInput.value = { title: '', completed: false, description: '' }
}
</script>
