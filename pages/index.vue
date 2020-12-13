<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">best-before-web</h1>
      <div class="links">
        <button class="button--green" @click="signIn">
          {{ isAuthed ? `Hi, ${displayName}` : 'Sign In' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthed: true,
      userName: null,
    }
  },

  computed: {
    displayName() {
      return this.userName ?? 'User'
    },
  },

  created() {
    this.handleAuthedUser(this.$identity.currentUser())

    this.$identity.on('login', this.handleAuthedUser)

    this.$identity.on('logout', () => {
      this.isAuthed = false
      this.userName = null
    })

    this.$identity.on('error', (err) => console.error('Error', err)) // eslint-disable-line
  },

  methods: {
    signIn() {
      this.$identity.open()
    },

    handleAuthedUser(user) {
      this.isAuthed = !!user
      this.userName = user?.user_metadata?.full_name || null
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
