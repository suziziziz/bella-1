import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch

  // const initLocale = store.getters.currentLocale

  // // eslint-disable-next-line no-console
  // console.log('P initLocale: ', initLocale)

  app.i18n = new VueI18n({
    locale: store.getters.currentLocale,
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
