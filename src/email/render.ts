import mjml2html from 'mjml'
import { compile } from 'handlebars'
import { readFileSync } from 'fs'
import path from 'path'

export const renderEmailTemplate = (templateName: string, context) => {
  // eslint-disable-next-line no-undef
  const templateString = readFileSync(path.resolve(__dirname, `./templates/${templateName}.mjml`)).toString('utf8')
  const { html } = mjml2html(compile(templateString)(context))
  return html
}
