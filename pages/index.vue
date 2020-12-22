<template>
  <b-container>
    <div class="mt-4">
      <products-list :busy="isLoading" :products="products" />
    </div>
  </b-container>
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
}
</script>
