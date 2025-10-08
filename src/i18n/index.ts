import { createI18n } from 'vue-i18n'
import en from './en'
import it from './it'
import nl from './nl'

export default createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en', // set default locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    nl,
    it
  }
})
