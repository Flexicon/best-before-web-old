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

      <ul>
        <li v-for="p in products" :key="p._id">{{ p.name }} - {{ p.expiryDate }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthed: false,
      userName: null,
      products: [],
    }
  },

  computed: {
    displayName() {
      return this.userName ?? 'User'
    },
  },

  watch: {
    isAuthed(val) {
      if (val) {
        this.fetchProducts()
      }
    },
  },

  created() {
    this.handleAuthedUser(this.$identity.currentUser())

    this.$identity.on('login', this.handleAuthedUser)

    this.$identity.on('logout', this.handleAuthedUser)

    this.$identity.on('error', (err) => console.error('Error', err))
  },

  methods: {
    signIn() {
      this.$identity.open()
    },

    handleAuthedUser(user) {
      this.isAuthed = !!user
      this.userName = user?.user_metadata?.full_name || null

      if (this.isAuthed) {
        this.$axios.setToken(user?.token?.access_token, 'Bearer')
      } else {
        this.$axios.setToken(false)
      }
    },

    fetchProducts() {
      this.$axios
        .get('/.netlify/functions/products')
        .then(({ data }) => {
          this.products = data
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            this.refreshAuth().then(() => this.fetchProducts())
          } else {
            console.error(err)
          }
        })
    },

    refreshAuth() {
      return this.$identity
        .refresh()
        .then((jwt) => {
          this.$axios.setToken(jwt, 'Bearer')
          return true
        })
        .catch(() => {
          this.handleAuthedUser()
          return false
        })
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
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
