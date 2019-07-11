import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  // window.onNuxtReady(() => {})

  new VuexPersistence({
    /**
     * Options (not requiered)
     */
  }).plugin(store)
}
