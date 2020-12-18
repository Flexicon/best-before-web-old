<template>
  <b-container>
    <div class="text-center mt-5">
      <h1 class="title mt-3 mb-4">best-before-web</h1>

      <b-spinner v-if="isLoading" />

      <b-list-group v-else>
        <b-list-group-item v-for="p in products" :key="p._id">{{ p.name }} - {{ p.expiryDate }}</b-list-group-item>
      </b-list-group>
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
