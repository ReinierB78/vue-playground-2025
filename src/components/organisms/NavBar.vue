<template>
  <nav class="bg-white border-b w-screen sticky top-0">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between px-4 sm:px-0">
        <div>
          <!-- Website Logo -->
          <a href="#" class="flex items-center py-4">
            <Logo />
          </a>
        </div>
        <div class="flex space-x-7">
          <!-- Primary Navbar items -->
          <div class="hidden md:flex items-center justify-center space-x-1 w-full">
            <router-link
              class="py-4 px-2"
              :class="[
                currentPath === route.path
                  ? 'text-blue-500 border-b-4 border-blue-500 font-semibold'
                  : null
              ]"
              v-for="route in navbarRoutes"
              :key="route.path"
              :to="route.path"
            >
              {{ t(`message.routes.${String(route.name)}`) }}
            </router-link>
          </div>
        </div>

        <!-- Secondary Navbar items -->
        <div class="hidden md:flex items-center relative">
          <button
            v-if="authStore.isLoggedIn"
            class="mr-2"
            @click="(authStore.logoutUser(), router.push('/'))"
          >
            <span class="flex gap-2">
              <IconExit class="w-4" />
              {{ t('general.logout') }}
            </span>
          </button>
          <router-link
            class="py-4 px-2"
            :class="[currentPath === route.path ? 'text-blue-500 font-semibold' : null]"
            v-for="route in navbarExtraRoutes"
            :key="route.path"
            :to="route.path"
          >
            {{ t(`message.routes.${String(route.name)}`) }}
          </router-link>
          <button
            @click="isDropdownOpen = !isDropdownOpen"
            class="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            {{ currentLocale.toUpperCase() }}
            <svg
              class="w-4 h-4 inline-block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            v-show="isDropdownOpen"
            class="absolute top-[100%] right-0 bg-white shadow-md rounded-md mt-2"
          >
            <ul>
              <li
                v-for="locale in availableLocales"
                :key="locale"
                @click="(changeLocale(locale), (isDropdownOpen = false))"
                class="px-4 py-2 hover:bg-gray-100"
              >
                {{ locale.toUpperCase() }}
              </li>
            </ul>
          </div>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none" @click="toggleMenu">
            <svg
              class="w-6 h-6 text-gray-500 hover:text-blue-500"
              :class="{ hidden: isOpen, block: !isOpen }"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg
              class="w-6 h-6 text-gray-500 hover:text-blue-500"
              :class="{ block: isOpen, hidden: !isOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div
      class="md:hidden h-screen flex-col justify-between"
      :class="{ block: isOpen, hidden: !isOpen }"
    >
      <div>
        <router-link
          class="block py-2 px-4 text-sm text-blue-500 font-semibold"
          v-for="route in navbarRoutes"
          :key="route.path"
          :to="route.path"
        >
          {{ route.name }}
        </router-link>
      </div>
      <div>Hello</div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Logo } from '@/components/organisms'
import { useAuthStore } from '@/stores/'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { IconExit } from '../icons'

const { t } = useI18n()
const authStore = useAuthStore()

const { locale: currentLocale, availableLocales } = useI18n()

const isDropdownOpen = ref(false)
const router = useRouter()
const route = useRoute()
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const currentPath = computed(() => {
  return route.path
})

const changeLocale = (newLocale: string) => {
  currentLocale.value = newLocale
  // Optional: save to localStorage
  localStorage.setItem('userLocaleReinApp', newLocale)
}

const navbarRoutes = computed(() =>
  router
    .getRoutes()
    .filter(route => (route.meta.location as string[]).includes('navbar'))
    .filter(route => {
      if (authStore.isLoggedIn) return true
      // Toon alleen als requiresAuth niet true is
      return route.meta.requiresAuth !== true
    })
    .map(route => ({
      path: route.path,
      name: route.name
    }))
)
const navbarExtraRoutes = computed(() =>
  router
    .getRoutes()
    .filter(route => (route.meta.location as string[]).includes('navbar-extra'))
    .filter(route => {
      if (authStore.isLoggedIn) return route.meta.requiresAuth === true
      return route.meta.requiresAuth === false || route.meta.requiresAuth === undefined
    })
    .map(route => ({
      path: route.path,
      name: route.name
    }))
)

function setCurrentLocals() {
  if (!localStorage?.userLocaleReinApp) {
    localStorage.setItem('userLocaleReinApp', currentLocale.value)
  } else {
    currentLocale.value = (localStorage.getItem('userLocaleReinApp') as string) ?? null
  }
}

onMounted(() => {
  setCurrentLocals()
})
</script>
