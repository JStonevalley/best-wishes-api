const functions = require('firebase-functions')
const fetch = require('isomorphic-fetch')
const domino = require('domino')
const { getMetadata } = require('page-metadata-parser')
const { json: jsonParser } = require('body-parser')
const cors = require('cors')
const {
  associateCreatedShareByEmail,
  associateShareWithCreatedUserByEmail
} = require('./dbTriggers')

const combineMiddleware =
  (...middlewares) =>
  (func) => {
    return [...middlewares, func].reduce((combination, middleware) => {
      return function (req, res, next) {
        combination(req, res, function (err) {
          if (err) {
            return next(err)
          }
          middleware(req, res, next)
        })
      }
    })
  }

exports.fetchPageMetadata = functions.https.onRequest(
  combineMiddleware(
    cors(),
    jsonParser()
  )(async ({ body: { url } }, res) => {
    if (!url) return res.json({})
    try {
      url = url + (url.includes('?') ? '&' : '?') + '_escaped_fragment_='
      const response = await fetch(url, { method: 'GET', mode: 'no-cors' })
      const html = await response.text()
      const doc = domino.createWindow(html).document
      res.json(getMetadata(doc, url))
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  })
)

exports.associateCreatedShareByEmail = associateCreatedShareByEmail

exports.associateShareWithCreatedUserByEmail =
  associateShareWithCreatedUserByEmail
