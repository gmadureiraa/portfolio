import { NextRequest } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_USER_ID = process.env.TELEGRAM_USER_ID || '1568212499';

const MAX_LEN = 2000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = await rateLimit('telegram-contact', ip, 5, 60 * 10); // 5 reqs / 10min
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: 'Muitas mensagens em pouco tempo. Tenta de novo daqui a pouco.' }),
      { status: 429, headers: { 'Retry-After': '600' } },
    );
  }

  const body = await request.json().catch(() => ({}));
  const contato = typeof body?.contato === 'string' ? body.contato.trim() : '';

  if (!TELEGRAM_BOT_TOKEN) {
    return new Response(JSON.stringify({ error: 'Telegram bot token not configured.' }), { status: 500 });
  }

  if (!contato) {
    return new Response(JSON.stringify({ error: 'Preencha o campo de contato.' }), { status: 400 });
  }
  if (contato.length > MAX_LEN) {
    return new Response(JSON.stringify({ error: 'Mensagem muito longa.' }), { status: 400 });
  }

  // Plain text — no Markdown injection from user input.
  const message = `Novo contato recebido:\n\n${contato}\n\nIP: ${ip}`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_USER_ID,
        text: message,
      }),
    });
    if (!res.ok) throw new Error('Erro ao enviar para o Telegram');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao enviar para o Telegram.' }), { status: 500 });
  }
}
