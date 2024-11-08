<template>
  <WidgetLayout>
    <template #title>
      <div class="flex justify-between items-center w-[100%]">
        <h2>{{ t('widgets.joke.title') }}</h2>
        <select
          name=""
          id=""
          class="border px-2 py-1 rounded"
          v-model="jokeType"
          @change="refreshJoke"
        >
          <option value="single">{{ t('widgets.joke.jokeTypes.single') }}</option>
          <option value="twopart">{{ t('widgets.joke.jokeTypes.twopart') }}</option>
        </select>
      </div>
    </template>
    <template #content>
      <div v-if="!updating">
        <div class="block" v-if="theJoke?.setup">
          <p class="font-bold">{{ theJoke?.setup }}</p>
          <p>{{ theJoke?.delivery }}</p>
        </div>
        <div v-else>
          {{ theJoke?.joke }}
        </div>
      </div>
      <div v-else><Loading /></div>
    </template>
    <template #footer>
      <button
        :disabled="updating"
        @click="refreshJoke"
        class="text-white rounded px-2 py-1 w-[100%]"
        :class="[updating ? 'bg-blue-200' : 'bg-blue-500']"
      >
        <span v-if="!updating">{{ t('widgets.joke.refresh') }}</span>
        <span v-else>...</span>
      </button>
    </template>
  </WidgetLayout>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import WidgetLayout from '@/widgets/WidgetLayout.vue'

import { useJokeStore } from '@/widgets/joke/joke-store'
import { onMounted, computed, ref } from 'vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const locale = useI18n()

const { getJoke } = useJokeStore()

interface TheJokeProps {
  type: string
  joke?: string
  setup?: string
  delivery?: string
  error: boolean
}

const theJoke = ref<TheJokeProps>()
let updating = ref(false)

const refreshJoke = async () => {
  updating.value = true
  theJoke.value = await getJoke(jokeType.value)
  setTimeout(() => {
    updating.value = false
  }, 300)
}

onMounted(async () => {
  theJoke.value = await getJoke(jokeType.value)
})

let jokeType = ref<'twopart' | 'single'>('single')
</script>
