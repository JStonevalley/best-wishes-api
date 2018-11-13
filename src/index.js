const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const {getMetadata} = require('page-metadata-parser')
const domino = require('domino')
const fetch = require('isomorphic-fetch')

const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.json({message: `Hello ${process.env.ENV}!`})
})

app.post('/fetch-page-meta', async ({body: {url}}, res) => {
  url = url + (url.includes('?') ? '&' : '?') + '_escaped_fragment_='
  const response = await fetch(url, {method: 'GET', mode: 'no-cors'})
  const html = await response.text()
  const doc = domino.createWindow(html).document
  res.json(getMetadata(doc, url))
})

module.exports = {
  handler: serverless(app)
}
