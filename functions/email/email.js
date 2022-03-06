import mjml2html from 'mjml'
import Handlebars from 'handlebars'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const renderEmailTemplate = async (templateName, context) => {
  const templateString = await readFile(
    path.resolve(__dirname, 'templates', `${templateName}.mjml`)
  ).toString('utf8')
  const { html } = mjml2html(Handlebars.compile(templateString)(context))
  return html
}

module.exports = {
  renderEmailTemplate
}
