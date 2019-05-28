export const state = () => ({
  authorizationToken: null
})

export const getters = {
  authToken: state => {
    return state.authorizationToken
  }
}

export const mutations = {
  UPDATE_AUTH_TOKEN: (state, payload) => {
    state.authorizationToken = payload
  }
}

export const actions = {
  updateAuthToken: (context, payload) => {
    context.commit('UPDATE_AUTH_TOKEN', payload)
  }
}
