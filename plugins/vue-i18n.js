import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app }, store) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  // eslint-disable-next-line no-console
  console.log('store: ', store)
  // app.i18n = new VueI18n({
  //   locale:
  //     store.language.state.locale === '' ? 'pt' : store.language.state.locale,
  //   fallbackLocale: 'pt',
  //   messages: {
  //     en: require('~/locales/en.json'),
  //     pt: require('~/locales/pt.json')
  //   }
  // })
}
