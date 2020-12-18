export const state = () => ({
  products: [],
  isLoading: false,
})

export const mutations = {
  setProducts(state, products) {
    state.products = [...products]
  },

  startLoading(state) {
    state.isLoading = true
  },

  stopLoading(state) {
    state.isLoading = false
  },
}

export const actions = {
  fetchProducts({ commit, dispatch }) {
    commit('startLoading')

    return this.$axios
      .get('/.netlify/functions/products')
      .then(({ data }) => {
        commit('setProducts', data)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          dispatch('auth/refreshAuth').then(() => dispatch('fetchProducts'))
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        commit('stopLoading')
      })
  },
}
