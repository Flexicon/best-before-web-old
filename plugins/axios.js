export default ({ $axios, store, $identity }) => {
  $axios.interceptors.response.use(null, async (error) => {
    // If the request returns a 401 Unauthorized response, we refresh auth and try again
    if (error.config && error.response?.status === 401) {
      // If the current request is already a retry, then just log the user out
      if (error.config.isRetry) {
        $identity.logout()
      }

      // Refresh auth token and if the refresh succeeds we return the same request config again, marking this as a retry
      const ok = await store.dispatch('auth/refreshAuth')
      if (!ok) {
        return Promise.reject(error.response)
      }
      error.config.isRetry = true
      return $axios.request(error.config)
    }
    // Otherwise just normally reject the request promise
    return Promise.reject(error.response)
  })
}
