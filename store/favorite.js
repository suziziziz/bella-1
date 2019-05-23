export const state = () => ({
  favoriteList: []
})

export const getters = {
  countFavorites: state => {
    return state.favoriteList.length
  },

  findFavoriteById: state => id => {
    if (state.favoriteList.find(talent => talent.id === id)) {
      return true
    } else {
      return false
    }
  },

  getFavorites: state => {
    return state.favoriteList
  }
}

export const mutations = {
  ADD_FAV: (state, id) => {
    state.favoriteList.push({ id: id })
  },

  REMOVE_FAV: (state, id) => {
    state.favoriteList.forEach((talent, index) => {
      if (talent.id === id) state.favoriteList.splice(index, 1)
    })
  },

  RESET_FAV_LIST: state => {
    state.favoriteList.length = 0
  }
}

export const actions = {
  addFavorite: (context, payload) => {
    context.commit('ADD_FAV', payload)
  },

  removeFavorite: (context, payload) => {
    context.commit('REMOVE_FAV', payload)
  },

  resetFavorite: context => {
    context.commit('RESET_FAV_LIST')
  }
}
