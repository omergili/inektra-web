import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL || 'http://91.249.180.159:8890/webhook/lead';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const resp = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[WEBHOOK PROXY ERROR]', error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }
}
