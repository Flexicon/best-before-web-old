<template>
  <div class="mt-4">
    <products-list
      :busy="isLoading"
      :saving="isSaving"
      :products="products"
      :is-modal-open="isModalOpen"
      @remove="removeProduct"
      @save="saveProduct"
      @open-modal="toggleModal(true)"
      @close-modal="toggleModal(false)"
    />
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products.products
    },

    isLoading() {
      return this.$store.state.products.isLoading
    },

    isSaving() {
      return this.$store.state.products.saving
    },

    isModalOpen() {
      return this.$store.state.products.isFormShown
    },

    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
  },

  watch: {
    isLoggedIn: {
      handler(val) {
        if (val) {
          this.$store.dispatch('products/fetchProducts')
        }
      },
      immediate: true,
    },
  },

  methods: {
    removeProduct(product) {
      this.$store.dispatch('products/removeProduct', product.id)
    },

    saveProduct(data) {
      this.$store.dispatch('products/saveProduct', data)
    },

    toggleModal(val) {
      this.$store.commit(val ? 'products/showForm' : 'products/hideForm')
    },
  },
}
</script>
