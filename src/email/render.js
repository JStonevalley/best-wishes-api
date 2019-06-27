const mjml2html = require('mjml')
const Handlebars = require('handlebars')
const { readFileSync } = require('fs')
const path = require('path')

const renderEmailTemplate = (templateName, context) => {
  const templateString = readFileSync(path.resolve(__dirname, `./templates/${templateName}.mjml`)).toString('utf8')
  const { html } = mjml2html(Handlebars.compile(templateString)(context))
  return html
}

module.exports = {
  renderEmailTemplate
}
