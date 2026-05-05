import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'sarthakrajvanshi124@gmail.com';

export default async function handler(req: Request, res: Response) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Use local SMTP relay — Gmail SMTP ports are blocked in this environment
  const transport = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: false,
    tls: { rejectUnauthorized: false },
  });

  try {
    await transport.sendMail({
      from: `"Portfolio Contact" <noreply@airoapp.ai>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #fff; border-radius: 12px;">
          <h2 style="color: #06b6d4; margin-bottom: 4px;">New Portfolio Message</h2>
          <p style="color: rgba(255,255,255,0.5); margin-top: 0;">Someone reached out via your portfolio contact form.</p>
          <hr style="border-color: rgba(255,255,255,0.1); margin: 20px 0;" />
          <p><strong style="color: rgba(255,255,255,0.6);">Name:</strong> ${name}</p>
          <p><strong style="color: rgba(255,255,255,0.6);">Email:</strong> <a href="mailto:${email}" style="color: #06b6d4;">${email}</a></p>
          <hr style="border-color: rgba(255,255,255,0.1); margin: 20px 0;" />
          <p><strong style="color: rgba(255,255,255,0.6);">Message:</strong></p>
          <p style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; border-left: 3px solid #06b6d4;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
      text: `New message from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
