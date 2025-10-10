<template>
  <WidgetLayout>
    <template #title>Todo Output</template>
    <template #content>
      <OverlayModal :open="modal.show.value">
        <template #title>{{ t('widgets.todo.editTitle') }}</template>
        <template #content>
          <EditTodo :values="todoToEdit" :handle-save="value => updateTodo(value)" />
        </template>
        <template #footer>
          <button @click="modal.close" class="px-4 py-2 bg-blue-500 text-white rounded">
            {{ t('general.close') }}
          </button>
        </template>
      </OverlayModal>
      <p v-if="todoStore.items.length === 0">{{ t('widgets.todo.empty') }}</p>

      <ul v-else style="list-style: none; padding: 0">
        <li
          v-for="item in todoStore.items"
          :key="item.id"
          style="
            margin-bottom: 10px;
            padding: 10px;
            background: #f0f0f0;
            display: flex;
            justify-content: space-between;
          "
        >
          <InputCheckbox
            :id="item.id"
            :label="item.title"
            :modelValue="item.completed"
            :handleInput="
              (value: boolean) =>
                todoStore.updateTodo(item.id, { completed: value, title: item.title })
            "
          />
          <span class="relative">
            <button @click="() => (todoEditMenuId = todoEditMenuId === item.id ? null : item.id)">
              <s>
                <IconElipsisVertical class="h-4 hover-pointer" />
              </s>
            </button>
            <div
              v-if="todoEditMenuId === item.id"
              class="absolute rounded top-6 right-0 bg-white border border-gray-300 shadow-lg p-4 w-40 z-10 todo-edit-menu"
            >
              <ul>
                <li @click="handleRemove(item.id)">{{ t('general.remove') }}</li>
                <li @click="handleEdit(item.id)">{{ t('general.edit') }}</li>
              </ul>
            </div>
          </span>
        </li>
      </ul>
    </template>
    <template #footer>Todo Output footer</template>
  </WidgetLayout>
</template>

<script setup lang="ts">
import { IconElipsisVertical } from '@/components/icons'
import { InputCheckbox } from '@/components/molecules/inputs'
import { OverlayModal } from '@/components/organisms'
import { useModal } from '@/composables/useModal'
import { Todo } from '@/types'
import WidgetLayout from '@/widgets/WidgetLayout.vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditTodo from '../EditTodo.vue'
import { useTodoStore } from '../todo-store'

const { t } = useI18n()

const modal = useModal()
const todoStore = useTodoStore()

const todoEditMenuId = ref<string | null>(null)
const todoToEdit = ref<Todo>({} as Todo)

const handleRemove = (id: string) => {
  confirm('Weet je zeker dat je dit item wilt verwijderen?')
  todoStore.deleteTodo(id)
  // Hier kun je de logica toevoegen om het item te verwijderen
}

const updateTodo = (updatedValues: Todo) => {
  if (!todoToEdit.value?.id) return
  todoStore.updateTodo(todoToEdit.value.id, updatedValues)
  nextTick(() => {
    modal.close()
  })
}

const handleEdit = async (id: string) => {
  todoToEdit.value = await todoStore.getTodo(id)
  modal.open()
  // Hier kun je de logica toevoegen om het item te bewerken
}

const handleClickOutside = (event: MouseEvent) => {
  let el = event.target as HTMLElement | null
  while (el) {
    if (el.classList && el.classList.contains('todo-edit-menu')) {
      return
    }
    el = el.parentElement
  }
  todoEditMenuId.value = null
}

const handleAnyInteraction = () => {
  todoEditMenuId.value = null
}

onMounted(() => {
  todoStore.getTodoRealtime()
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('scroll', handleAnyInteraction, true)
  document.addEventListener('keydown', handleAnyInteraction)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('scroll', handleAnyInteraction, true)
  document.removeEventListener('keydown', handleAnyInteraction)
})
</script>
