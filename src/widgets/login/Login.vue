<template>
  <WidgetLayout>
    <template #title>Login or register</template>
    <template #content>
      <div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              {{ t('widgets.login.bodyTitle') }}
            </h1>
            <div class="space-y-4 md:space-y-6" action="#">
              <Input
                id="email"
                :label="t('widgets.login.emailLabel')"
                :modelValue="''"
                :handleInput="(value: string) => (inputloginCredentials.email = value as string)"
              />
              <Input
                id="password"
                :label="t('widgets.login.passwordLabel')"
                type="password"
                :modelValue="''"
                :handleInput="
                  (value: unknown) => (inputloginCredentials.password = value as string)
                "
              />
              <div class="flex items-center justify-between hidden">
                <InputCheckbox
                  id="remember"
                  :label="t('widgets.login.rememberMeLabel')"
                  :modelValue="false"
                  :handleInput="value => console.log(value)"
                />

                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {{ t('widgets.login.forgotPassword') }}
                </a>
              </div>
              <Button
                type="button"
                class="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                :handleClick="handleLogin"
              >
                {{ t('widgets.login.submitButton') }}
              </Button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400 hidden">
                {{ t('widgets.login.noAccountText') }}
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {{ t('widgets.login.noAccountLink') }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>Login footer</template>
  </WidgetLayout>
</template>

<script setup lang="ts">
import { Button } from '@/components/molecules'
import { Input, InputCheckbox } from '@/components/molecules/inputs'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/auth-store'
import WidgetLayout from '../WidgetLayout.vue'

const { t } = useI18n()
const authStore = useAuthStore()

type loginCredentials = {
  email: string
  password: string
}

const inputloginCredentials = ref<loginCredentials>({} as loginCredentials)

const handleLogin = async () => {
  if (
    inputloginCredentials.value === undefined ||
    inputloginCredentials.value.email === null ||
    inputloginCredentials.value.password === null
  ) {
    console.error('No valid login credentials provided')
    return
  }

  const user = await authStore.loginUser(
    inputloginCredentials.value?.email,
    inputloginCredentials.value?.password
  )
}
</script>
