const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure:false,
  auth: {
    user: process.env.SMTP_USER ,
    pass: process.env.SMTP_PASS
  }
});

async function sendPasswordResetEmail(toEmail, resetUrl) {
    const mailOptions = {
        from: `"MyApp" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: 'Reset your password',

        // Plain text fallback (always include — some clients block HTML)
        text: `You requested a password reset.\n\nClick this link to reset (expires in 15 minutes):\n${resetUrl}\n\nIf you didn't request this, ignore this email.`,

        // HTML version
        html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
        <h2 style="margin-bottom:8px">Reset your password</h2>
        <p style="color:#555;margin-bottom:24px">
          Click the button below. This link expires in
          <strong>15 minutes</strong>.
        </p>
        <a href="${resetUrl}"
          style="display:inline-block;padding:12px 24px;
                 background:#3b82f6;color:#fff;border-radius:8px;
                 text-decoration:none;font-weight:500">
          Reset password
        </a>
        <p style="margin-top:24px;font-size:12px;color:#999">
          If you didn't request this, you can safely ignore this email.
          Your password won't change.
        </p>
        <p style="font-size:12px;color:#999">
          Or copy this link: <a href="${resetUrl}">${resetUrl}</a>
        </p>
      </div>
    `,
    };
    const info = await transport.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}
module.exports = { sendPasswordResetEmail };
