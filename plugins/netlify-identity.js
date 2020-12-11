import netlifyIdentity from 'netlify-identity-widget'

netlifyIdentity.init({})

export default (context, inject) => {
  inject('identity', netlifyIdentity)
}
