import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL?.replace('/webhook/lead', '/webhook/woocommerce')
  || 'http://91.249.180.159:8890/webhook/woocommerce';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('X-WC-Webhook-Signature') || '';
    const topic = req.headers.get('X-WC-Webhook-Topic') || '';

    const resp = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WC-Webhook-Signature': signature,
        'X-WC-Webhook-Topic': topic,
      },
      body,
      signal: AbortSignal.timeout(10000),
    });

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[WC WEBHOOK PROXY ERROR]', error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }
}
