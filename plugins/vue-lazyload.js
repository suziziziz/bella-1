import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '../img/placeholder.svg',
  attempt: 1,
  observer: true,
  dispatchEvent: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  },
  adapter: {
    loaded({
      bindType,
      el,
      naturalHeight,
      naturalWidth,
      $parent,
      src,
      loading,
      error,
      Init
    }) {
      // eslint-disable-next-line no-console
      // console.log('el: ', el)
    }
  }
})
