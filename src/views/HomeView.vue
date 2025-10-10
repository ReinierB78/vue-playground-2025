<template>
  <main class="py-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      <Joke />
      <TodoInput />
      <TodoOutput />
    </div>
  </main>
</template>

<script setup lang="ts">
import { OverlayModal } from '@/components/organisms'
import { useModal } from '@/composables/useModal'
import Joke from '@/widgets/joke/Joke.vue'
import TodoInput from '@/widgets/todo/input/TodoInput.vue'
import TodoOutput from '@/widgets/todo/output/TodoOutput.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const modal = useModal()
</script>
