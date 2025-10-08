<template>
  <div class="relative border-b">
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="handleCurrentInput"
      @keyup="handleKeyUp"
      class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
    />
    <label
      :for="id"
      class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  },
  handleInput: {
    type: Function,
    default: () => {}
  },
  handleEnterKey: {
    type: Function,
    default: () => {}
  }
})

const emits = defineEmits(['update:modelValue'])

const handleCurrentInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  props.handleInput(target.value)
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    props.handleEnterKey()
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
