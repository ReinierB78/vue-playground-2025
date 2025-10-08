<template>
  <main class="py-4">
    <div v-for="{ data, step } in formData" :key="step">
      <div v-for="(field, x) in data" :key="x">
        <component
          :is="field.inputType"
          :id="field.name"
          :name="field.name"
          :label="field.label"
          v-bind="field.options ? { options: field.options } : {}"
          :modelValue="field.value"
          @update:modelValue="val => (field.value = val)"
          v-if="currentStep === step"
        />
      </div>
    </div>
    <button @click="prevStep" v-if="currentStep > 1">Previous</button>
    <button @click="nextStep">Next</button>
    <button @click="submitForm" v-if="currentStep === formData.length">Submit</button>
  </main>
</template>

<script setup lang="ts">
import {
  Input,
  InputCheckbox,
  InputCheckboxGroup,
  InputRadio,
  InputRadioGroup
} from '@/components/molecules/inputs'
import { ref } from 'vue'

const inputValue = ref('')

type LocalStepDataProps = {
  name: string
  label: string
  inputType:
    | typeof Input
    | typeof InputCheckbox
    | typeof InputRadio
    | typeof InputRadioGroup
    | typeof InputCheckboxGroup
  value: string | string[] | boolean
  options?: { label: string; value: string }[]
}

type LocalStepProps = {
  step: number
  data: LocalStepDataProps[]
}

const currentStep = ref(1)
const formData = ref<LocalStepProps[]>([
  {
    step: 1,
    data: [
      {
        name: 'input',
        label: 'Input',
        inputType: Input,
        value: ''
      },
      {
        name: 'checkboxGroup',
        label: 'Checkbox Group',
        inputType: InputCheckboxGroup,
        value: [],
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' }
        ]
      },
      {
        name: 'radio',
        label: 'Radio',
        inputType: InputRadioGroup,
        value: ''
      }
    ]
  },
  {
    step: 2,
    data: [
      {
        name: 'input',
        label: 'Input step 2',
        inputType: Input,
        value: ''
      }
    ]
  },
  {
    step: 3,
    data: [
      {
        name: 'input',
        label: 'Input',
        inputType: Input,
        value: ''
      }
    ]
  }
])

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitForm = async () => {
  try {
    const response = await fetch('https://api.example.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    })
    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
