const serverless = require('serverless-http')
const express = require('express')
const app = express()

const router = express.Router()

router.get('/', function (req, res) {
  res.send('Hello World!')
})

router.get('/foo', function (req, res) {
  res.send('bar')
})

router.get('/baz', function (req, res) {
  res.send({ msg: __filename })
})

app.use(`/.netlify/functions/app`, router)

module.exports.handler = serverless(app)
