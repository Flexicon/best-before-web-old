<template>
  <b-container>
    <div class="mt-4">
      <products-list :busy="isLoading" :products="products" @remove="removeProduct" />
    </div>
  </b-container>
</template>

<script>
let fetchProductsTimeout = null

export default {
  computed: {
    products() {
      return this.$store.state.products.products
    },

    isLoading() {
      return this.$store.state.products.isLoading
    },

    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
  },

  watch: {
    isLoggedIn: {
      handler(val) {
        if (val) {
          this.startFetchingProducts()
        }
      },
      immediate: true,
    },
  },

  beforeDestroy() {
    if (fetchProductsTimeout) clearTimeout(fetchProductsTimeout)
  },

  methods: {
    async startFetchingProducts() {
      if (!this.isLoggedIn) return

      await this.$store.dispatch('products/fetchProducts')
      fetchProductsTimeout = setTimeout(this.startFetchingProducts, 10000)
    },

    removeProduct(product) {
      this.$store.dispatch('products/removeProduct', product.id)
    },
  },
}
</script>
