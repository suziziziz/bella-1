import Vue from 'vue'
import VueI18n from 'vue-i18n'

// const langStore = require('~/store/language')
// const langInit =
//   langStore.getters.currentLanguage === ''
//     ? 'pt'
//     : langStore.getters.currentLanguage

// eslint-disable-next-line no-console
// console.log('C langStore: ', langStore.lang.state.locale)

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch

  if (process.browser) {
    // eslint-disable-next-line no-console
    console.log('currLanguage: ', store.getters)
  }

  app.i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'pt',
    messages: {
      en: require('~/locales/en.json'),
      pt: require('~/locales/pt.json')
    }
  })

  Vue.prototype.$changeLang = function(string) {
    app.i18n.locale = string
    document.querySelector('html').setAttribute('lang', string)
  }
}
