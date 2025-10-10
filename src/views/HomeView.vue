<template>
  <main class="py-4">
    <div
      v-if="authStore.isLoggedIn"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8"
    >
      <TodoInput />
      <TodoOutput />
    </div>
    <hr v-if="authStore.isLoggedIn" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      <Joke />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores'
import Joke from '@/widgets/joke/Joke.vue'
import TodoInput from '@/widgets/todo/input/TodoInput.vue'
import TodoOutput from '@/widgets/todo/output/TodoOutput.vue'

const authStore = useAuthStore()
</script>
