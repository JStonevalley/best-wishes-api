import functions from 'firebase-functions'
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

export const sendShareEmail = functions.https.onCall(async (data, { auth }) => {
  console.log(data)
  console.log(auth)
  return data
})
