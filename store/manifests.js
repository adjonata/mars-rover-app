export const state = () => ({
  manifests: [],
  loaded: false,
})

export const mutations = {
  SET_MANIFESTS(state, manifests) {
    state.manifests = manifests
  },
  SET_LOAD_STATUS(state, status) {
    state.loaded = status
  },
}

export const actions = {
  setManifests({ commit }, manifests) {
    return new Promise((resolve) => {
      commit('SET_MANIFESTS', manifests)
      resolve(manifests)
    })
  },
  setLoadStatus({ commit }, status) {
    return new Promise((resolve) => {
      commit('SET_LOAD_STATUS', status)
      resolve(status)
    })
  },
}

export const getters = {
  manifests: (state) => state.manifests,
  isLoaded: (state) => state.loaded,
}
