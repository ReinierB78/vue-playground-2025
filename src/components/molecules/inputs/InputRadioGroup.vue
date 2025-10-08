<template>
  <div>
    <InputRadio
      v-for="option in options"
      :key="option.value"
      :id="option.value"
      :name="name"
      :label="option.label"
      :value="option.value"
      :modelValue="modelValue"
      :handleInput="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
import { InputRadio } from '@/components/molecules/inputs'
import { defineProps, toRefs } from 'vue'

type LocalInputRadioGroupProps = {
  options: { label: string; value: string }[]
  modelValue: string
  name: string
  handleSelection: (value: string) => void
}

const props = defineProps<LocalInputRadioGroupProps>()
const { options, name, modelValue, handleSelection } = toRefs(props)

const updateValue = (value: string) => {
  props.handleSelection(value)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
