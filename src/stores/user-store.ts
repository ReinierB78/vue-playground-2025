import { db } from '@/firebase/config'
import type { User } from '@/types/user'
import { User as FirebaseUser } from 'firebase/auth'
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userProfile = ref<User | null>(null)

  const createUser = async (id: string, user: User) => {
    const docRef = await addDoc(collection(db, 'users'), {
      ...user,
      createdAt: new Date()
    })
  }
  const updateUser = async (user: User) => {
    const docRef = doc(db, 'users', user.uid)
    await updateDoc(docRef, {
      ...user
    })
  }
  const getUser = async (id: string): Promise<DocumentData | undefined> => {
    const docRef = doc(db, 'users', id)
    const user = await getDoc(docRef)
    if (user.exists()) {
      return user.data()
    } else {
      return undefined
    }
  }

  const fetchOrCreateProfile = async (auth_user: FirebaseUser): Promise<User> => {
    const profileRef = doc(db, 'users', auth_user.uid)
    const profileSnap = await getDoc(profileRef)
    if (profileSnap.exists()) {
      // Profiel BESTAAT (normale situatie)
      const profileData = profileSnap.data() as User
      console.log('Profiel gevonden voor UID:', auth_user.uid)
      userProfile.value = profileData
      return profileData
    } else {
      // Profiel BESTAAT NIET (gebeurt bij je bestaande Auth-gebruikers)
      console.warn('Profiel niet gevonden! Aanmaken...')

      // Creëer het basisprofiel met de Auth-data
      const newProfile: User = {
        uid: auth_user.uid,
        email: auth_user.email || '', // Gebruik de e-mail uit Auth
        displayName: auth_user.displayName || '',
        createdAt: new Date()
      }

      // Schrijf het nieuwe document naar Firestore, met de UID als ID
      await setDoc(profileRef, newProfile)

      console.log('Nieuw profiel aangemaakt voor UID:', auth_user.uid)
      userProfile.value = newProfile
      return newProfile
    }
  }

  return { createUser, updateUser, getUser, fetchOrCreateProfile, userProfile }
})
