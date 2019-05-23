export const state = () => ({
  currentLanguage: ''
})

export const getters = {
  currentLanguage: state => {
    return state.currentLanguage
  }
}

export const mutations = {
  SET_LANGUAGE: (state, payload) => {
    state.currentLanguage = payload
  }
}

export const actions = {
  setLanguage: (context, payload) => {
    context.commit('SET_LANGUAGE', payload)
  }
}
