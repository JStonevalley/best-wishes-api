import { readFileSync } from 'node:fs'
import path from 'node:path'
import { compile } from 'handlebars'
import mjml2html from 'mjml'

export interface ShareEmailContext {
  fromEmail: string
  wishListTitle: string
  wishListLink: string
}

export const renderEmailTemplate = (templateName: string, context: ShareEmailContext) => {
  // eslint-disable-next-line no-undef
  const templateString = readFileSync(path.resolve(__dirname, `./templates/${templateName}.mjml`)).toString('utf8')
  const { html } = mjml2html(compile(templateString)(context))
  return html
}
