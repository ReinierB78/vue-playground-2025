import { MusicApi } from '@/widgets/music/music-api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface SpotifyArtistSearchResponse {
  href: string // URL to the next page of results (may be null)
  items: SpotifyArtist[] // Array of artist objects
  limit: number // Maximum number of items in the current page
  next: string | null // URL to the next page of results (may be null)
  offset: number // The starting position of the current page
  total: number // The total number of artists available
}

interface SpotifyArtist {
  external_urls: { spotify: string } // An object containing a Spotify URL for the artist
  followers: { href: string | null; total: number } // Information about the artist's followers
  genres: string[] // Array of genres the artist belongs to
  href: string // URL to the artist's Spotify page
  id: string // Spotify ID of the artist
  images: SpotifyArtistImage[] // Array of image objects for the artist
  name: string // Name of the artist
  popularity: number // The artist's popularity score (0-100)
  type: string // Should always be "artist" in this context
  uri: string // Spotify URI for the artist
}

interface SpotifyArtistImage {
  height: number // Height of the image in pixels
  url: string // URL of the image
  width: number // Width of the image in pixels
}

interface SpotifyArtistSearchResponse {
  href: string // URL to the next page of results (may be null)
  items: SpotifyArtist[] // Array of artist objects
  limit: number // Maximum number of items in the current page
  next: string | null // URL to the next page of results (may be null)
  offset: number // The starting position of the current page
  total: number // The total number of artists available
}

interface SpotifyArtist {
  artists: {
    external_urls: { spotify: string } // An object containing a Spotify URL for the artist
    followers: { href: string | null; total: number } // Information about the artist's followers
    genres: string[] // Array of genres the artist belongs to
    href: string // URL to the artist's Spotify page
    id: string // Spotify ID of the artist
    images: SpotifyArtistImage[] // Array of image objects for the artist
    name: string // Name of the artist
    popularity: number // The artist's popularity score (0-100)
    type: string // Should always be "artist" in this context
    uri: string // Spotify URI for the artist
  }
}

interface SpotifyArtistImage {
  height: number // Height of the image in pixels
  url: string // URL of the image
  width: number // Width of the image in pixels
}

interface SpotifyTrack {
  album: {} // Empty object representing the album information (may be populated in a different response)
  artists: SpotifyArtist[] // Array of artist objects
  available_markets: string[] // Array of country codes where the track is available
  disc_number: number // Disc number on which the track appears (if applicable)
  duration_ms: number // Duration of the track in milliseconds
  explicit: boolean // Whether the track contains explicit lyrics
  external_ids: {} // Empty object representing external IDs (may be populated in a different response)
  external_urls: { spotify: string } // An object containing a Spotify URL for the track
  href: string // URL to the track on Spotify
  id: string // Spotify ID of the track
  is_local: boolean // Whether the track is stored locally on the user's device
  is_playable: boolean // Whether the track is playable for the current user
  name: string // Name of the track
  popularity: number // The track's popularity score (0-100)
  preview_url: string | null // URL to a 30-second preview of the track (may be null)
  track_number: number // Track number within the album (or disc)
  type: string // Should always be "track" in this context
  uri: string // Spotify URI for the track
}

const useMusicStore = defineStore('music', () => {
  const musicApi = new MusicApi()
  const music = ref<any>()
  const artist = ref<SpotifyArtist>()

  const getArtist = async (artistInput: string): Promise<SpotifyArtist | undefined> => {
    try {
      const response = await musicApi.api.get(`/artist/${artistInput}`)
      artist.value = response.data
    } catch (err) {
      console.log(err)
    }

    return artist.value
  }

  const getMusic = async (theArtist: string | null): Promise<SpotifyTrack | undefined> => {
    try {
      const response = await musicApi.api.get('artist/' + theArtist + '/top-tracks')
      music.value = response.data // Update foo with the actual music data
    } catch (err) {
      console.log(err)
    }

    return music.value // Return the music object
  }

  return { getMusic, getArtist }
})

export { useMusicStore }
export type { SpotifyArtist, SpotifyTrack }
