<template>
  <b-navbar class="pl-0 pr-0" toggleable="lg">
    <b-navbar-brand :to="{ name: 'index' }">BestBefore</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav></b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <span>{{ isAuthed ? `Hi, ${displayName}` : 'Sign in' }}</span>
          </template>
          <b-dropdown-item :to="{ name: 'settings' }">Account Settings</b-dropdown-item>
          <b-dropdown-item @click="openAuth">Log out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
