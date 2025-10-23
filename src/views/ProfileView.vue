<template>
  <main class="py-4">
    <h1 class="text-2xl font-bold mb-4">Profile View</h1>
    <p>This is the profile view. User-specific information will be displayed here.</p>
    <div class="mt-4 md:max-w-md">
      <!-- <pre>
        {{ userProfileInput }}
        {{ userStore.userProfile }}
      </pre> -->
      <pre>
        {{ authStore.isLoggedIn }}
      </pre>
      <div class="mb-2">
        <Input
          id="username"
          label="Username"
          :modelValue="userProfileInput.displayName"
          :handleInput="(value: string) => (userProfileInput.displayName = value as string)"
        />
      </div>
      <div class="mb-2">
        <Input
          id="email"
          label="Email"
          :modelValue="userProfileInput.email"
          type="email"
          :handleInput="(value: string) => (userProfileInput.email = value as string)"
        />
      </div>
      <!-- <div class="mb-2">
        <Input
          id="password"
          label="Password"
          modelValue=""
          type="password"
          :handleInput="value => console.log('Password updated:', value)"
        />
      </div> -->
      <div class="mb-2">
        <Button
          class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          :handleClick="
            async () => {
              await userStore.updateUser(userProfileInput)
            }
          "
        >
          Update
        </Button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Button } from '@/components/molecules'
import { Input } from '@/components/molecules/inputs'
import { useAuthStore, useUserStore } from '@/stores'
import type { User } from '@/types'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const userStore = useUserStore()

const userProfileInput = ref<User>({} as User)

onMounted(() => {
  if (userStore.userProfile) {
    userProfileInput.value = userStore.userProfile
  }
})
</script>
