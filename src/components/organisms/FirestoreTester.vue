<template>
  <div>
    <div style="border: 1px solid #ccc; padding: 20px; max-width: 400px; margin: 20px auto">
      <h2>1. Data Schrijven (CREATE)</h2>
      <input
        v-model="message"
        placeholder="Voer een bericht in"
        style="margin-bottom: 10px; padding: 8px"
      />
      <button
        @click="createTestData"
        style="padding: 10px; background-color: #42b883; color: white; border: none"
      >
        Voeg Test Document Toe
      </button>
      <p>
        <strong>Status:</strong>
        {{ status }}
      </p>
    </div>
    <div style="border: 1px solid #ccc; padding: 20px; max-width: 400px; margin: 20px auto">
      <h2>2. Data Lezen (READ)</h2>

      <p v-if="items.length === 0">Nog geen items gevonden. Voeg er een toe!</p>

      <ul style="list-style: none; padding: 0">
        <li
          v-for="item in items"
          :key="item.id"
          style="margin-bottom: 10px; padding: 10px; background: #f0f0f0"
        >
          <strong>ID:</strong>
          {{ item.id }}
          <br />
          <strong>Data:</strong>
          {{ item.data }}
          <br />
          <small>({{ item.timestamp?.toDate().toLocaleTimeString() }})</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Importeer de Firestore database instantie uit je configuratiebestand
import { db } from '@/firebase/config'
import { DocumentData, addDoc, collection, onSnapshot } from 'firebase/firestore'
import { ref } from 'vue'

const message = ref('')
const status = ref('')

const items = ref<DocumentData[]>([])

/**
 * Functie om data in realtime op te halen (READ)
 * onSnapshot zorgt ervoor dat de data automatisch update bij wijzigingen in Firestore.
 */
function readTestDataRealtime() {
  const itemsCollection = collection(db, 'test_items')

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

// Roep de leesfunctie aan bij het laden van de component
readTestDataRealtime()

/**
 * Functie om een nieuw testdocument toe te voegen aan de 'test_items' collectie.
 */
async function createTestData() {
  status.value = 'Bezig met toevoegen...'
  try {
    const docRef = await addDoc(collection(db, 'test_items'), {
      timestamp: new Date(),
      data: message.value || 'Standaard testbericht',
      source: 'Vue3 CRU Tester'
    })

    status.value = `Succes! Document ID: ${docRef.id}`
    message.value = '' // Input leegmaken
  } catch (e) {
    console.error('Fout bij toevoegen document: ', e)
    status.value = `Fout: ${(e as any).message}`
  }
}
</script>
