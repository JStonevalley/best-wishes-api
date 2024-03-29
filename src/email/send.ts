import { MailerSend, Recipient, EmailParams, Sender } from 'mailersend'
import { ShareEmailContext, renderEmailTemplate } from './render'

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
})
const sender = new Sender('no-reply@transactional.bestwishes.io', 'Bestwishes')

interface EmailSendInput<T> {
  toEmail: string
  context: T
}

export const sendShareEmail = ({ toEmail, context }: EmailSendInput<ShareEmailContext>) => {
  toEmail = process.env.ENV === 'production' ? toEmail : process.env.EMAIL_SINK || ''
  const recipients = [new Recipient(toEmail)]

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject(`You are invited to a wish list: ${context.wishListTitle}`)
    .setHtml(renderEmailTemplate('wishListShare', context))

  return mailersend.email.send(emailParams)
}
