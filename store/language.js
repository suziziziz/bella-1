export const state = () => ({
  locale: ''
})

export const getters = {
  currentLanguage: state => {
    return state.locale
  }
}

export const mutations = {
  SET_LANGUAGE: (state, payload) => {
    state.locale = payload
  }
}

export const actions = {
  setLanguage: (context, payload) => {
    context.commit('SET_LANGUAGE', payload)
  }
}
