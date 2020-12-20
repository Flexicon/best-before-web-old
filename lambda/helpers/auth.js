// Shared function auth utilities

exports.isAuthenticated = (context) => {
  const { user } = context.clientContext
  // Since JWTs aren't properly verified in dev env, we will check token expiry manually
  if (process.env?.NETLIFY_DEV) {
    const exp = user?.exp ?? 0
    const now = Math.floor(Date.now() / 1000)

    return exp - now > 0
  }

  return Boolean(user)
}

exports.unauthorized = () => ({
  statusCode: 401,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ message: 'Unauthorized' }),
})

exports.userIDFromContext = (context) => context?.clientContext?.user?.sub
