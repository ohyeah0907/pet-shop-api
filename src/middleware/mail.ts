import nodemailer from "nodemailer";
import { emailConstant } from "../constants/mail";

const transport = nodemailer.createTransport(emailConstant);

export const sendMailVerification = async (
  email: string,
  token: string,
): Promise<Boolean> => {
  console.log(email, token);
  const mailOptions = {
    from: emailConstant.auth!.user,
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="https://pet-shop-service.onrender.com/api/auth/verify-email/${token}">here</a> to verify your email</p>`,
  };

  return transport
    .sendMail(mailOptions)
    .then((info) => {
      console.log(info);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
