import axios from 'axios'

class MusicApi {
  api = axios.create({
    baseURL: 'https://spotify-api-wrapper.appspot.com'
  })
}

export { MusicApi }
