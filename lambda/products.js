import { isAuthenticated, unauthorized } from './helpers/auth'
import { Product } from './helpers/db'

exports.handler = async (event, context) => {
  if (!isAuthenticated(context)) {
    return unauthorized()
  }

  const products = await Product.findByUserID(context.clientContext.user.sub)

  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(products),
  }
}
