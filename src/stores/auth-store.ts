import { auth } from '@/firebase/config'
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface AuthState {
  user: FirebaseUser | null
  authIsReady: boolean
}

export const useAuthStore = defineStore('login', () => {
  const user = ref<FirebaseUser | null>(null)
  const authIsReady = ref(false)

  const isLoggedIn = computed(() => !!user.value)
  const userId = computed(() => user.value?.uid || null)

  const initAuth = () => {
    // onAuthStateChanged is een Firebase functie die een "unsubscribe" functie teruggeeft.
    // Je roept deze functie maar één keer op in de app lifecycle.

    onAuthStateChanged(auth, firebaseUser => {
      // De 'firebaseUser' is van het type 'FirebaseUser' of 'null'

      // Update de state
      user.value = firebaseUser

      // Zodra we de status weten, zetten we 'authIsReady' op true.
      // Dit mag maar één keer gebeuren.
      if (!authIsReady.value) {
        authIsReady.value = true
      }

      console.log('Auth State Changed. User:', firebaseUser ? firebaseUser.uid : 'None')
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

  return { registerUser, loginUser, logoutUser, user, isLoggedIn, userId, authIsReady, initAuth }
})
