import { MailerSend, Recipient, EmailParams, Sender } from 'mailersend'
import { ShareEmailContext, renderEmailTemplate } from './render'

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
})
const sender = new Sender('Best wishes', 'transactional.bestwishes.io')

interface EmailSendInput<T> {
  toEmails: string[]
  context: T
}

const sendShareEmail = ({ toEmails, context }: EmailSendInput<ShareEmailContext>) => {
  const recipients = toEmails.map((email) => new Recipient(email))

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject('Subject')
    .setHtml(renderEmailTemplate('wishListShare', context))

  return mailersend.email.send(emailParams)
}
