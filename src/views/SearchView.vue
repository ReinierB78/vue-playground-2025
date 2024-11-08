<template>
  <main class="py-4">
    <div class="py-4 px-6 bg-gray-100 rounded-lg flex gap-2 mb-4">
      <input type="text" v-model="searchQuery" class="w-full border p-2 rounded rounded-xl" />
      <input type="submit" value="Zoeken" class="bg-blue-500 text-white rounded-xl px-4" />
    </div>
    <hr class="mb-4" />
    <div class="flex items-center justify-between">
      <button @click="sort('name')" :class="{ 'text-blue-500': sortOrder === 'asc' }">
        Name (A-Z)
      </button>
      <button @click="sort('dob')" :class="{ 'text-blue-500': sortOrder === 'desc' }">
        DOB (Newest)
      </button>
    </div>
    <div
      class="border rounded-md px-4 py-2 mb-2 grid grid-cols-10"
      v-for="(item, index) in filteredPersons"
      :key="index"
    >
      <p>{{ item.id }}</p>
      <div class="col-span-3">
        <p>{{ item.name }}</p>
      </div>
      <div class="col-span-6 text-right flex justify-end gap-4">
        <p>{{ item.credits }}/100</p>
        <p>{{ item.dob }}</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { persons } from '../assets/data/persons'
import type { Person } from '../assets/data/persons'

type SortOption = 'name' | 'dob'

const searchQuery = ref('')
let sortOrder = ref<'asc' | 'desc'>('asc')

const filteredPersons = computed(() => {
  return filterPersons(searchQuery.value, sortOrder.value)
})

const filterPersons = (query: string, sortBy: SortOption) => {
  let filtered = persons

  // Filter by name (case-insensitive)
  if (query) {
    filtered = filtered.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
  }

  // Sort based on sortBy and sortOrder
  filtered.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.toLowerCase() < b.name.toLowerCase()
        ? sortOrder.value === 'asc'
          ? -1
          : 1
        : sortOrder.value === 'asc'
          ? 1
          : -1
    } else if (sortBy === 'dob') {
      // Handle date sorting (ascending by default)
      return new Date(a.dob) - new Date(b.dob)
    }
    return 0 // No change if not sorted by name or dob
  })

  return filtered
}

const sort = (sortBy: SortOption) => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  filterPersons(searchQuery.value, sortBy)
}
</script>
