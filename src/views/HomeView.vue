<template>
  <main class="py-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      <Joke />
      <div class=""></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Joke from '@/widgets/joke/Joke.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
