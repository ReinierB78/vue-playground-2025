import axios from 'axios'

class JokeApi {
  api = axios.create({
    baseURL: 'https://v2.jokeapi.dev/joke/Any'
  })
}

export { JokeApi }
