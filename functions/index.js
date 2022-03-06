import functions from 'firebase-functions'
import fetch from 'isomorphic-fetch'
import domino from 'domino'
import { getMetadata } from 'page-metadata-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
export {
  associateCreatedShareByEmail,
  associateShareWithCreatedUserByEmail
} from './dbTriggers.js'

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

export const fetchPageMetadata = functions.https.onRequest(
  combineMiddleware(
    cors(),
    bodyParser.json()
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
