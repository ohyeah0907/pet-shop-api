import SMTPTransport from "nodemailer/lib/smtp-transport";

export const emailConstant = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  } as SMTPTransport.Options;
  