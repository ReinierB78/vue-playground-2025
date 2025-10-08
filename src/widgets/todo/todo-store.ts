import { db } from '@/firebase/config'
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useTodoStore = defineStore('todo', () => {
  const items = ref<DocumentData[]>([])
  const message = ref('')
  const status = ref('')

  const createTodo = async (todoText: string) => {
    status.value = 'Bezig met toevoegen...'
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        text: todoText,
        completed: false
      })

      status.value = 'Todo succesvol toegevoegd!'
    } catch (e) {
      console.error('Error adding document: ', e)
    }
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
      await updateDoc(docRef, {
        completed: updatedData.completed,
        text: updatedData.text
      })

      console.log(`Document met ID: ${id} is succesvol bijgewerkt met de data .`, updatedData)
    } catch (e) {
      console.error('Fout bij bijwerken document: ', e)
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
        console.log(`Realtime update ontvangen: ${items.value.length} documenten`)
      },
      error => {
        console.error('Fout bij realtime lezen:', error)
        status.value = `Fout bij lezen: ${error.message}`
      }
    )

    status.value = 'Realtime luisteraar geactiveerd.'
  }

  return {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodoRealtime,
    items
  }
})

export { useTodoStore }
