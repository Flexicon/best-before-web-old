import netlifyIdentity from 'netlify-identity-widget'

netlifyIdentity.init({})

export default (context, inject, x) => {
  inject('identity', netlifyIdentity)

  // Check if we're authenticated already
  const currentUser = netlifyIdentity.currentUser()
  if (currentUser) {
    context.store.dispatch('auth/logIn', currentUser)
  }
  // Setup authentication event listeners
  netlifyIdentity.on('login', (user) => context.store.dispatch('auth/logIn', user))
  netlifyIdentity.on('logout', () => context.store.dispatch('auth/logOut'))
  netlifyIdentity.on('error', (err) => console.error('Error', err))
}
