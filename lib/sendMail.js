import nodemailer from "nodemailer";

export const sendMail = async (subject, receiver, body) => {
  const transporter = nodemailer.createTransporter({
    host: process.env.NODE_MAILER_HOST,
    port: process.env.NODE_MAILER_PORT,
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Developer Mubtasim <${process.env.EMAIL_USER}>`,
    to: receiver,
    subject: subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send email",
      error: error.message,
    };
  }
};
