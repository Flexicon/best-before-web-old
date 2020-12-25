export const state = () => ({
  products: [],
  isLoading: false,
})

export const mutations = {
  setProducts(state, products) {
    state.products = [...products]
  },

  deleteProduct(state, id) {
    state.products = state.products.filter((p) => p.id !== id)
  },

  setProductBusy(state, { id, busy }) {
    state.products = state.products.map((p) => {
      if (p.id === id) {
        p.busy = busy
      }
      return p
    })
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
      .finally(() => {
        commit('stopLoading')
      })
  },

  removeProduct({ commit, dispatch, state }, id) {
    commit('setProductBusy', { id, busy: true })

    return this.$axios
      .delete(`/.netlify/functions/products?id=${id}`)
      .then(() => {
        commit('deleteProduct', id)
      })
      .finally(() => commit('setProductBusy', { id, busy: false }))
  },
}
