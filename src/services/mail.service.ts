import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

class MailService {
  private transporter

  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 0,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  async sendActivationMail(to: string, link: string) {
    if (!this.transporter) return console.error('no transporter')
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Account activation on: ' + process.env.API_URL,
        text: '',
        html: `
                      <div>
                          <h1>To activate, follow the link</h1>
                          <a href="${link}">${link}</a>
                      </div>
                  `
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export default new MailService()
