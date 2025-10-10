import { db } from '@/firebase/config'
import { Todo } from '@/types'
import { create } from 'domain'
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useTodoStore = defineStore('todo', () => {
  const items = ref<DocumentData[]>([])
  const message = ref('')
  const status = ref('')

  const createTodo = async (todo: Todo) => {
    status.value = 'Bezig met toevoegen...'
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        title: todo.title,
        description: todo.description || null,
        category: todo.category || null,
        priority: todo.priority || null,
        dueDate: todo.dueDate || null,
        completed: false,
        createdAt: new Date()
      })

      status.value = 'Todo succesvol toegevoegd!'
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const getTodo = async (id: string): Promise<Todo> => {
    const docRef = doc(db, 'todos', id)
    const todo = await getDoc(docRef)

    return {
      id,
      ...todo.data()
    } as Todo
  }

  const getTodos = (callback: (todos: DocumentData[]) => void) => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), querySnapshot => {
      const todos: DocumentData[] = []
      querySnapshot.forEach(doc => {
        todos.push({ id: doc.id, ...doc.data() })
      })
      callback(todos)
    })

    return unsubscribe // Return the unsubscribe function to stop listening
  }

  const updateTodo = async (id: string, updatedData: Partial<DocumentData>) => {
    try {
      // 1. Maak een referentie naar het document
      const docRef = doc(db, 'todos', id)

      // 2. Roep de update functie aan met de te wijzigen velden
      await updateDoc(docRef, updatedData)
      if (import.meta.env.VITE_SHOW_CONSOLE_LOGS === 'true') {
        console.log(`Document met ID: ${id} is succesvol bijgewerkt met de data .`, updatedData)
      }
    } catch (e) {
      if (import.meta.env.VITE_SHOW_CONSOLE_LOGS === 'true') {
        console.error('Fout bij bijwerken document: ', e)
      }
    }
  }

  const deleteTodo = async (id: string) => {
    // Implement delete functionality here
    const docRef = doc(db, 'todos', id)
    await deleteDoc(docRef)
      .then(() => {
        console.log(`Document met ID: ${id} is succesvol verwijderd.`)
      })
      .catch(error => {
        console.error('Fout bij verwijderen document: ', error)
      })
  }

  const getTodoRealtime = () => {
    const itemsCollection = collection(db, 'todos')

    // onSnapshot luistert naar veranderingen in de collectie
    onSnapshot(
      itemsCollection,
      snapshot => {
        items.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        if (import.meta.env.VITE_SHOW_CONSOLE_LOGS === 'true') {
          console.log(`Realtime update ontvangen: ${items.value.length} documenten`)
        }
      },
      error => {
        if (import.meta.env.VITE_SHOW_CONSOLE_LOGS === 'true') {
          console.error('Fout bij realtime lezen:', error)
        }
        status.value = `Fout bij lezen: ${error.message}`
      }
    )

    status.value = 'Realtime luisteraar geactiveerd.'
  }

  return {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    getTodoRealtime,
    items
  }
})

export { useTodoStore }
