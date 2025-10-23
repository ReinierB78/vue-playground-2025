import { auth } from '@/firebase/config'
import { useUserStore } from '@/stores'
import { User } from '@/types/user'
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('login', () => {
  const user = ref<FirebaseUser | null>(null)
  const authIsReady = ref(false)

  const userProfile = ref<User | null>(null)
  const userStore = useUserStore()

  const isLoggedIn = computed(() => !!user.value)
  const userId = computed(() => user.value?.uid || null)

  const initAuth = async () => {
    onAuthStateChanged(auth, async firebaseUser => {
      // Make the callback ASYNC
      if (firebaseUser) {
        // 1. Auth user is logged in
        user.value = firebaseUser

        try {
          // 2. FETCH OR CREATE THE PROFILE
          const profileData = await userStore.fetchOrCreateProfile(firebaseUser)
          userProfile.value = profileData // Store the profile in the store
        } catch (error) {
          console.error('Error fetching/creating profile:', error)
          // Optionally log out the user if there's a fatal error
        }
      } else {
        // User is logged out
        user.value = null
        userProfile.value = null // Ensure the profile is also cleared
      }

      if (!authIsReady.value) {
        authIsReady.value = true
      }
    })
  }
  const registerUser = async (email: string, password: string): Promise<unknown> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      console.error('Error registering user:', error)
      throw error
    }
  }

  const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      console.error('Error logging in user:', error)
      throw error
    }
  }

  const logoutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error logging out user:', error)
      throw error
    }
  }

  return {
    registerUser,
    loginUser,
    logoutUser,
    user,
    isLoggedIn,
    userId,
    authIsReady,
    initAuth,
    userProfile
  }
})
