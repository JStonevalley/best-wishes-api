import functions from 'firebase-functions'
import bodyParser from 'body-parser'
import cors from 'cors'
import { combineMiddleware } from '../expressTools.js'
import mjml2html from 'mjml'
import Handlebars from 'handlebars'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const renderEmailTemplate = (templateName) => async (context) => {
  const templateString = await readFile(
    path.resolve(__dirname, 'templates', `${templateName}.mjml`)
  ).toString('utf8')
  const { html } = mjml2html(Handlebars.compile(templateString)(context))
  return html
}

export const sendShareEmail = functions.https.onRequest(
  combineMiddleware(
    cors(),
    bodyParser.json()
  )(async ({ body: { shareIds = [] } }, res) => {
    try {
      res.json()
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  })
)
