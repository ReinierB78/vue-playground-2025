<template>
  <WidgetLayout>
    <template #title>
      <div class="flex justify-between items-center w-[100%]">
        <h2 class="px-2 py-1">{{ t('widgets.music.title') }}</h2>
      </div>
    </template>
    <template #content>
      <div v-if="!updating">
        <div v-if="theMusic">
          <div class="flex gap-2 w-full justify-between">
            <button
              @click="checkChoosenOption(option)"
              class="border p-1 rounded"
              v-for="(option, i) in answerOptions"
              :key="i"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div v-else>Hit the button to test your skills</div>
      </div>
      <div v-else><Loading /></div>
    </template>
    <template #footer>
      <button
        :disabled="updating"
        @click="refreshMusic"
        class="text-white rounded px-2 py-1 w-[100%]"
        :class="[updating ? 'bg-blue-200' : 'bg-blue-500']"
      >
        <span v-if="!updating">{{ t('widgets.music.refresh') }}</span>
        <span v-else>...</span>
      </button>
    </template>
  </WidgetLayout>
</template>

<script setup lang="ts">
import WidgetLayout from '@/widgets/WidgetLayout.vue'
import { useMusicStore } from '@/widgets/music/music-store'
import type { SpotifyArtist, SpotifyTrack } from '@/widgets/music/music-store'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Loading from '../../components/organismns/Loading.vue'
import artists from './artists'

const { t } = useI18n()
const locale = useI18n()

const { getArtist, getMusic } = useMusicStore()

let updating = ref(false)
let theArtist = ref<SpotifyArtist>()
let theMusic = ref<any>(undefined)
let answerOptions = ref<string[]>()
let audio = new Audio()

const refreshMusic = async () => {
  audio.pause()

  updating.value = true

  theArtist.value = await getArtist(getRandomSearch())
  await getMusicData()
  await playMusic()
  getAnswerOptions()
  updating.value = false
}
const playMusic = () => {
  console.log('wut?', theMusic.value.tracks[0].preview_url)
  audio.src = theMusic.value.tracks[0].preview_url
  setTimeout(() => {}, 1000)
  audio.play()
}
const theArtistData = computed(() => {
  return theArtist.value
})

const theMusicData = computed(() => {
  return theMusic.value
})

const getMusicData = async () => {
  let id = extractSpotifyId(theArtist.value?.artists.items[0].uri)
  theMusic.value = await getMusic(id)
}

const getAnswerOptions = () => {
  const localAnswerOptions = [
    getRandomSearch(),
    getRandomSearch(),
    theArtist?.value?.artists?.items[0].name
  ]

  // Randomize the array using a Fisher-Yates shuffle
  for (let i = localAnswerOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[localAnswerOptions[i], localAnswerOptions[j]] = [localAnswerOptions[j], localAnswerOptions[i]]
  }

  answerOptions.value = localAnswerOptions
}

function getRandomSearch(): string {
  let result = ''

  const randomIndex = Math.floor(Math.random() * artists.length)
  result += artists[randomIndex]

  return result
}

function extractSpotifyId(spotifyUri: string | undefined): string | null {
  const parts = spotifyUri?.split(':')

  if (parts === undefined) {
    return null
  }
  if (parts.length >= 3) {
    return parts[2]
  }
  return null
}
const checkChoosenOption = (option: string) => {
  if (theArtist?.value?.artists?.items[0].name === option) {
    alert('true')
  } else {
    alert('false')
  }
}
onMounted(async () => {
  console.log(getRandomSearch())
})
</script>
