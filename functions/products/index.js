exports.handler = function (event, context) {
  const { user } = context.clientContext
  if (!user) {
    return { statusCode: 401, body: 'Unauthorized' }
  }

  // TODO: fetch a list of products
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify([
      { id: '12', name: 'Nivea lotion', expiryDate: '2021-02-18' }, // TODO: replace dummy data
      { id: '13', name: 'Shampoo', expiryDate: '2025-01-01' },
      { id: '14', name: 'Shaving cream', expiryDate: '2021-06-01' },
    ]),
  }
}
