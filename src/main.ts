import '@/assets/tailwind.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './firebase/config'
import i18n from './i18n'
import router from './router'
import { useAuthStore } from './stores'

const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
authStore.initAuth()

router.beforeEach(async (to, from, next) => {
  // Wacht tot de 'authIsReady' state true is voordat je verder gaat.
  // Dit voorkomt dat je wordt weggestuurd terwijl Firebase nog aan het laden is.
  if (!authStore.authIsReady) {
    // We maken een 'watcher' om te wachten tot de store klaar is
    await new Promise<void>(resolve => {
      const unwatch = authStore.$subscribe((mutation, state) => {
        if (state.authIsReady) {
          unwatch() // Stop met luisteren
          resolve()
        }
      })
    })
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

app.mount('#app')
