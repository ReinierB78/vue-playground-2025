<template>
  <div class="relative flex items-center">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="handleCurrentInput"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 border"
    />
    <label :for="id" class="ml-2 text-sm font-medium text-gray-900">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

type LocalCheckboxProps = {
  id: string
  label: string
  modelValue: boolean
  handleInput: (value: boolean) => void
}

const props = defineProps<LocalCheckboxProps>()

const { id, label, modelValue } = toRefs(props)

const handleCurrentInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  // modelValue.value = target.checked
  props.handleInput(target.checked)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
