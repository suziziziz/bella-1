import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.getters['lang/currentLocale'],
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
