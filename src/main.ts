import '@/assets/tailwind.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './firebase/config'
import i18n from './i18n'
import router from './router'

const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
