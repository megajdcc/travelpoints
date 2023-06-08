import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
function loadLocaleMessages() {

  const locales = import.meta.globEager('./locales/*.json')
  const messages = {}
  
   for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales[path].default
    }
  }
  return messages
}
export default new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages: loadLocaleMessages(),
})