import Vue from 'vue'
export const state = () => ({
  authorizationToken: null,
  token: {
    mf: '',
    panel: ''
  },
  talents: '',
  page: 1,
  posts: ''
})

export const getters = {
  authToken: state => {
    return state.authorizationToken
  },
  page: state => state.page,
  posts: state => state.posts,
  lang: state => state.lang.locale

}

export const mutations = {
  UPDATE_AUTH_TOKEN: (state, payload) => {
    state.authorizationToken = payload
  },
  setToken (state, payload) {
    state.token.mf = payload.mf
    state.token.panel = payload.panel
  },
  setSlides (state, payload) {
    state.slides = payload
  },
  setPost (state, payload) {
    state.posts = payload
  },
  setTalents (state, payload) {
    state.talents = payload
  },
  addPost (state, payload) {
    payload.forEach(post => {
      state.posts.push(post)
    })
    state.page = ++state.page
  },
  resetBlog (state, payload) {
    state.page = 0
    Vue.set(state, 'posts', [])
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const panel = this.$axios.$post(`/login`, {
      salt: this.$env.salt,
      api_token: this.$env.api_token
    })

    const mf = this.$axios.$post('https://integration.managerfashion.net/api/signin', {
      api_key: '1415us4zethy6lfxkp51mve4zmyfjb',
      salt: 'c7577e5ed53d30a27e82af09fc03e7e712c6ad33ac9dec4e13188b81404596d2fa17bc105cebd7c4dd3b92db8042c47ac382ce8b43177d42072600eb9bb7eb37'
    })

    const [token_panel, token_mf] = await Promise.all([panel, mf])
    // this.$axios.setToken(token_panel.access_token, 'Bearer')
    // console.log(token_panel, token_mf)

    commit('setToken', {
      panel: `Bearer ${token_panel.access_token}`,
      mf: `Bearer ${token_mf.access_token}`
    })
  },
  updateAuthToken: (context, payload) => {
    context.commit('UPDATE_AUTH_TOKEN', payload)
  }
}
