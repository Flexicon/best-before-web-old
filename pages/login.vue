<template>
  <div class="Login">
    <div>
      <Logo />
    </div>

    <b-button class="mt-4" @click="openAuth">Sign in</b-button>
  </div>
</template>

<script>
export default {
  layout: 'standalone',
  methods: {
    openAuth() {
      this.$identity.open()
    },
  },
}
</script>

<style scoped>
.Login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
}
</style>
