<template>
  <main class="py-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h1 class="text-2xl font-bold mb-4">Contact</h1>
        <p class="leading-8 font-light">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit voluptate voluptatibus rem
          similique labore dolorum voluptatem natus ipsam odit nihil illum molestias eum, non quos
          ullam velit sint, perferendis voluptas numquam, facilis dignissimos nobis? Rerum
          distinctio, quis maxime eveniet voluptas ipsum! Veritatis quidem molestias voluptate harum
          consectetur delectus itaque labore? Repudiandae ducimus eum explicabo, iste numquam ipsum
          modi! Neque, asperiores, nostrum mollitia quisquam tempore ipsa deserunt natus harum aut
        </p>
      </div>

      <div class="">
        <div class="max-w-md mx-auto">
          <form @submit.prevent="handleSubmit" class="space-y-6 bg-white rounded-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-8">{{ t('contactForm.title') }}</h2>

            <!-- Name Field -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('contactForm.name.label') }}
              </label>
              <input
                :placeholder="t('contactForm.name.placeholder')"
                v-model="formData.name"
                type="text"
                id="name"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                :class="{ 'border-gray-300': !errors.name, 'border-red-500': errors.name }"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('contactForm.email.label') }}
                <span class="text-red-500">*</span>
              </label>
              <input
                :placeholder="t('contactForm.email.placeholder')"
                v-model="formData.email"
                type="email"
                id="email"
                required
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                :class="{ 'border-gray-300': !errors.email, 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
            </div>
            <!-- Reason Selection -->
            <div>
              <label for="reason" class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('contactForm.reason.label') }}
              </label>
              <select
                v-model="formData.reason"
                id="reason"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Please select a reason</option>
                <option v-for="option in getOptions" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <!-- Message Field -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('contactForm.message.label') }}
              </label>
              <textarea
                v-model="formData.message"
                id="message"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                :placeholder="t('contactForm.message.placeholder')"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-end space-x-4">
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 transition duration-200"
              >
                Reset
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Message</span>
              </button>
            </div>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
              Your message has been sent successfully!
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const locale = useI18n()

const getOptions = computed<string[]>(() => {
  const messages = locale.messages.value[locale.locale.value] as {
    contactForm: { reason: { options: string[] } }
  }
  return messages?.contactForm?.reason?.options || []
})

interface FormData {
  name: string
  email: string
  reason: string[]
  message: string
}

interface FormErrors {
  name?: string
  email?: string
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  reason: [],
  message: ''
})

const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = (): boolean => {
  errors.name = ''
  errors.email = ''
  let isValid = true

  if (formData.email.trim() === '') {
    errors.email = 'Email is required'
    isValid = false
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  showSuccess.value = false

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Form submitted:', formData)
    showSuccess.value = true
    resetForm()
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(formData, {
    name: '',
    email: '',
    reason: '',
    message: ''
  })
  errors.name = ''
  errors.email = ''
  showSuccess.value = false
}
</script>
