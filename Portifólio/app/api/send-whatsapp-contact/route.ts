import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const PHONE_REGEX = /^[+\d\s().-]{8,20}$/;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = await rateLimit('whatsapp-contact', ip, 5, 60 * 10); // 5 / 10min
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: 'Muitos pedidos em pouco tempo. Tenta de novo daqui a pouco.' }),
      { status: 429, headers: { 'Retry-After': '600' } },
    );
  }

  const body = await request.json().catch(() => ({}));
  const whatsapp = typeof body?.whatsapp === 'string' ? body.whatsapp.trim() : '';

  if (!whatsapp || !PHONE_REGEX.test(whatsapp)) {
    return new Response(JSON.stringify({ error: 'Número de WhatsApp inválido.' }), { status: 400 });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return new Response(
      JSON.stringify({ error: 'Email transport not configured.' }),
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const safe = whatsapp.replace(/[<>]/g, '');

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'madureira@kaleidosdigital.com',
    subject: 'Novo contato via WhatsApp',
    text: `Novo número de WhatsApp recebido: ${safe}\nIP: ${ip}`,
    html: `<p>Novo número de WhatsApp recebido: <strong>${safe}</strong></p><p>IP: ${ip}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao enviar e-mail.' }), { status: 500 });
  }
}
