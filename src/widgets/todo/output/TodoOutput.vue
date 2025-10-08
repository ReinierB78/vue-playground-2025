<template>
  <WidgetLayout>
    <template #title>Todo Output</template>
    <template #content>
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
              class="absolute rounded top-6 right-0 bg-white border border-gray-300 shadow-lg p-4 w-40 z-10"
            >
              <ul>
                <li @click="handleRemove(item.id)">Remove</li>
                <!-- <li>Edit</li> -->
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
import WidgetLayout from '@/widgets/WidgetLayout.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTodoStore } from '../todo-store'

const { t } = useI18n()
const locale = useI18n()

const todoStore = useTodoStore()

const todoEditMenuId = ref<string | null>(null)

const handleRemove = (id: string) => {
  confirm('Weet je zeker dat je dit item wilt verwijderen?')
  todoStore.deleteTodo(id)
  // Hier kun je de logica toevoegen om het item te verwijderen
}

onMounted(() => {
  todoStore.getTodoRealtime()
})
</script>
