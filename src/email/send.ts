import { MailerSend, Recipient, EmailParams, Sender } from 'mailersend'
import { ShareEmailContext, renderEmailTemplate } from './render'
import { logger } from '../log'

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
})
const sender = new Sender('Best wishes', 'transactional.bestwishes.io')

interface EmailSendInput<T> {
  toEmail: string
  context: T
}

export const sendShareEmail = ({ toEmail, context }: EmailSendInput<ShareEmailContext>) => {
  logger.info(toEmail)
  logger.info(context)
  toEmail = process.env.NODE_ENV === 'development' ? process.env.EMAIL_SINK || '' : toEmail
  const recipients = [new Recipient(toEmail)]

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject(`You are invited to a wish list: ${context.wishListTitle}`)
    .setHtml(renderEmailTemplate('wishListShare', context))

  return mailersend.email.send(emailParams)
}
