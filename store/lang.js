export const state = () => ({
  locales: ['en', 'pt'],
  locale: 'pt'
})

export const getters = {
  currentLocale: state => {
    return state.locale
  }
}

export const mutations = {
  SET_LOCALE(state, payload) {
    if (state.locales.indexOf(payload) !== -1) {
      state.locale = payload
    }
  }
}

export const actions = {
  setLocale: (context, payload) => {
    context.commit('SET_LOCALE', payload)
  }
}
