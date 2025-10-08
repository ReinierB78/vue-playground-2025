<template>
  <div class="relative flex items-center">
    <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="handleCurrentInput"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
    />
    <label :for="id" class="ml-2 text-sm font-medium text-gray-900">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

type LocalRadioProps = {
  id: string
  name: string
  label: string
  value: string
  modelValue: string
  handleInput: (value: string) => void
}

const props = defineProps<LocalRadioProps>()
const { id, name, label, value, modelValue, handleInput } = toRefs(props)

const handleCurrentInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  props.handleInput(target.value)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
