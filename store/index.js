export const state = () => ({
  authorizationToken: null,
  locales: ['en', 'pt'],
  locale: 'pt'
})

export const getters = {
  authToken: state => {
    return state.authorizationToken
  },

  currentLocale: state => {
    return state.locale
  }
}

export const mutations = {
  UPDATE_AUTH_TOKEN: (state, payload) => {
    state.authorizationToken = payload
  },

  SET_LOCALE(state, payload) {
    if (state.locales.indexOf(payload) !== -1) {
      state.locale = payload
    }
  }
}

export const actions = {
  updateAuthToken: (context, payload) => {
    context.commit('UPDATE_AUTH_TOKEN', payload)
  },

  setLocale: (context, payload) => {
    context.commit('SET_LOCALE', payload)
  }
}
