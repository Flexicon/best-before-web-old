<template>
  <b-container>
    <b-navbar class="pl-0 pr-0" toggleable="lg">
      <b-navbar-brand href="#">BestBefore</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav></b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="openAuth">
            <span>{{ isAuthed ? `Hi, ${displayName}` : 'Sign in' }}</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
export default {
  computed: {
    isAuthed() {
      return this.$store.state.auth.isLoggedIn
    },

    displayName() {
      return this.$store.state.auth.userName
    },
  },

  methods: {
    openAuth() {
      this.$identity.open()
    },
  },
}
</script>
