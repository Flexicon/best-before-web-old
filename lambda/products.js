import { isAuthenticated, unauthorized, userIDFromContext } from './helpers/auth'
import { Product } from './helpers/db'
import { jsonResponse } from './helpers/http'

exports.handler = async (event, context) => {
  if (!isAuthenticated(context)) {
    return unauthorized()
  }

  switch (event.httpMethod) {
    case 'GET':
      return await listHandler(event, context)
    case 'POST':
      return await createHandler(event, context)
    case 'DELETE':
      return await deleteHandler(event, context)
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed',
  }
}

async function listHandler(event, context) {
  const products = await Product.findByUserID(context.clientContext.user.sub)

  return jsonResponse(200, products)
}

async function createHandler(event, context) {
  let payload = null
  try {
    payload = JSON.parse(event.body)
  } catch {
    return jsonResponse(400, { message: 'Invalid payload' })
  }

  // Create new product from payload and assign user details
  const { name, expiryDate } = payload
  const { user } = context.clientContext
  const product = new Product({ name, expiryDate, created_by: user.sub })

  try {
    await product.save()
  } catch (err) {
    console.error('Failed to save new product:', err)
    return jsonResponse(500, { message: 'Failed to save product' })
  }

  return jsonResponse(201, product)
}

async function deleteHandler(event, context) {
  const { id } = event.queryStringParameters
  if (!id) {
    return jsonResponse(400, { message: 'Parameter id is required' })
  }

  let product = null
  try {
    product = await Product.findById(id)
  } catch (err) {
    console.error('Failed to lookup product:', err)
  }

  if (!product || product.created_by !== userIDFromContext(context)) {
    return jsonResponse(404, { message: 'Product not found' })
  }

  try {
    await product.remove()
  } catch (err) {
    console.error('Failed to remove product:', err)
    return jsonResponse(500, { message: 'Failed to remove product' })
  }

  return { statusCode: 204 }
}
