const functions = require('firebase-functions')
const { getMetadata } = require('page-metadata-parser')

exports.fetchPageMetadata = functions.https.onRequest(
  async ({ body: { url } }, res) => {
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
  }
)
