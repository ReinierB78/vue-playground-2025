<template>
  <div>
    <InputCheckbox
      v-for="option in options"
      :key="option.value"
      :id="option.value"
      :label="option.label"
      :modelValue="modelValue.includes(option.value)"
      :handleInput="updateValue(option.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { InputCheckbox } from '@/components/molecules/inputs'
import { defineProps, ref, watch } from 'vue'

type LocalCheckboxGroupProps = {
  options: { label: string; value: string }[]
  modelValue: string[]
  handleSelection: (value: string[]) => void
}

const props = defineProps<LocalCheckboxGroupProps>()

const localValue = ref([...props.modelValue])

const updateValue = (value: string) => (checked: boolean) => {
  if (checked) {
    localValue.value.push(value)
  } else {
    localValue.value = localValue.value.filter(v => v !== value)
  }
  props.handleSelection(localValue.value)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
