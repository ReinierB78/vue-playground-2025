import { defineStore } from 'pinia'
import { JokeApi } from '@/widgets/joke/joke-api'
import { ref } from 'vue'

const useJokeStore = defineStore('joke', () => {
  const jokeApi = new JokeApi()
  const joke = ref<any>()

  const getJoke = async (jokeType: string) => {
    try {
      const response = await jokeApi.api.get('', {
        params: {
          type: jokeType
        }
      })
      joke.value = response.data // Update foo with the actual joke data
    } catch (err) {
      console.log(err)
    }

    return joke.value // Return the joke object
  }

  return { getJoke }
})

export { useJokeStore }
