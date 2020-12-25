export default ({ $axios, store }) => {
  $axios.interceptors.response.use(null, (error) => {
    // If the request returns a 401 Unauthorized response, we refresh auth and check to make sure we only retry the request once
    if (error.config && !error.config.retryCount && error.response?.status === 401) {
      // Refresh auth token and if the refresh succeeds we return the same request config again, marking this as a retry
      return store.dispatch('auth/refreshAuth').then((ok) => {
        if (ok) {
          error.config.retryCount = 1
          return $axios.request(error.config)
        }
        return Promise.reject(error.response)
      })
    }
    // Otherwise just normally reject the request promise
    return Promise.reject(error.response)
  })
}
