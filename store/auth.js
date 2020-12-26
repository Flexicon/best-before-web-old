export const state = () => ({
  isLoggedIn: false,
  userName: null,
})

export const mutations = {
  setLoggedIn(state) {
    state.isLoggedIn = true
  },

  setLoggedOut(state) {
    state.isLoggedIn = false
  },

  setUserName(state, name) {
    state.userName = name
  },
}

export const actions = {
  logIn({ commit }, user) {
    commit('setLoggedIn')
    commit('setUserName', user.user_metadata?.full_name)

    this.$axios.setToken(user?.token?.access_token, 'Bearer')
    this.$identity.close()
    this.$router.push({ name: 'index' })
  },

  logOut({ commit }) {
    commit('setLoggedOut')
    commit('setUserName', null)

    this.$axios.setToken(false)
    this.$identity.close()
    this.$router.push({ name: 'login' })
  },

  refreshAuth(context) {
    return this.$identity
      .refresh()
      .then((jwt) => {
        this.$axios.setToken(jwt, 'Bearer')
        return true
      })
      .catch(() => {
        this.$identity.logout()
        return false
      })
  },
}
