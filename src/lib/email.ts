import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInvitationEmail(email: string, inviteToken: string) {
  const signUpUrl = `${process.env.NEXT_PUBLIC_APP_URL}/sign-up?token=${inviteToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Welcome to Our Gym - Complete Your Registration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Our Gym!</h2>
        <p>You've been invited to join our fitness community. Click the button below to complete your registration:</p>
        <a href="${signUpUrl}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Complete Registration
        </a>
        <p>Or copy and paste this URL into your browser:</p>
        <p style="color: #666;">${signUpUrl}</p>
        <p>This invitation link will expire in 24 hours.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}