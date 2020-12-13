const { isAuthenticated, unauthorized } = require('../auth')

exports.handler = function (event, context, callback) {
  if (!isAuthenticated(context)) {
    return callback(null, unauthorized())
  }

  // TODO: fetch a list of products
  return callback(null, {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify([
      { id: '12', name: 'Nivea lotion', expiryDate: '2021-02-18' }, // TODO: replace dummy data
      { id: '13', name: 'Shampoo', expiryDate: '2025-01-01' },
      { id: '14', name: 'Shaving cream', expiryDate: '2021-06-01' },
    ]),
  })
}
