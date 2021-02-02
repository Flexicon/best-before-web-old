export const state = () => ({
  products: [],
  isLoading: false,
  isFormShown: false,
  saving: false,
})

export const mutations = {
  setProducts(state, products) {
    state.products = [...products]
  },

  deleteProduct(state, id) {
    state.products = state.products.filter((p) => p.id !== id)
  },

  addProduct(state, product) {
    state.products = [...state.products, product].sort((a, b) => (a.expiryDate > b.expiryDate ? 1 : -1))
  },

  updateProduct(state, updatedProduct) {
    state.products = state.products
      .map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      .sort((a, b) => (a.expiryDate > b.expiryDate ? 1 : -1))
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

  startSaving(state) {
    state.saving = true
  },

  stopSaving(state) {
    state.saving = false
  },

  showForm(state) {
    state.isFormShown = true
  },

  hideForm(state) {
    state.isFormShown = false
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

  saveProduct({ commit, dispatch }, { id, ...data }) {
    commit('startSaving')

    const endpoint = '/.netlify/functions/products'
    const req = id ? this.$axios.patch(`${endpoint}?id=${id}`, data) : this.$axios.post(endpoint, data)

    return req
      .then((res) => {
        commit(id ? 'updateProduct' : 'addProduct', res.data)
        commit('hideForm')
      })
      .finally(() => commit('stopSaving'))
  },

  removeProduct({ commit, dispatch }, id) {
    commit('setProductBusy', { id, busy: true })

    return this.$axios
      .delete(`/.netlify/functions/products?id=${id}`)
      .then(() => {
        commit('deleteProduct', id)
      })
      .finally(() => commit('setProductBusy', { id, busy: false }))
  },
}
