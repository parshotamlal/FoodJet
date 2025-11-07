import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // Must be App Password, not Gmail password
  },
});

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Reset Your Password - OTP Verification",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 15px;">
        <h2>OTP Verification</h2>
        <p>Your OTP code for resetting your password is:</p>
        <h1 style="letter-spacing: 3px; color: #ff6600;">${otp}</h1>
        <p>This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone.</p>
        <br/>
        <p>Regards,<br/>Your App Team</p>
      </div>
    `,
  });
};
