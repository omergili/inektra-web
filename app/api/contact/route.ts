import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    // Validierung
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name und E-Mail sind erforderlich.' },
        { status: 400 }
      );
    }

    // Attribution-Daten aus Formular
    const attribRaw = formData.get('_attrib') as string | null;
    let attrib: Record<string, string> | null = null;
    try {
      if (attribRaw) attrib = JSON.parse(attribRaw);
    } catch { /* ignore */ }

    // Lead-Objekt für Logging
    const lead = {
      timestamp: new Date().toISOString(),
      name,
      company: company || '',
      email,
      phone: phone || '',
      message: message || '',
      hasFile: !!file,
      fileName: file?.name || '',
      attribution: attrib,
    };

    console.log('[NEW CONTACT FORM SUBMISSION]', JSON.stringify(lead, null, 2));

    // E-Mail senden via Resend API
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.error('[RESEND not configured]');
      return NextResponse.json({
        success: false,
        message: 'E-Mail-Versand ist nicht konfiguriert. Bitte rufen Sie uns direkt an.',
      }, { status: 500 });
    }

    try {
      const resend = new Resend(resendKey);

      // Anhang vorbereiten
      const attachments: { filename: string; content: Buffer; }[] = [];
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }

      const htmlContent = `
        <h2>Neue Kontaktanfrage über inektra.de</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        ${company ? `<p><strong>Firma:</strong> ${escapeHtml(company)}</p>` : ''}
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
        ${message ? `<p><strong>Nachricht:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>` : ''}
        ${file ? `<p><strong>Datei im Anhang:</strong> ${escapeHtml(file.name)}</p>` : ''}
        ${attrib ? `
        <hr/>
        <table style="font-size: 12px; color: #666; border-collapse: collapse;">
          <tr><td colspan="2" style="font-weight: bold; padding: 4px 0;">Lead-Quelle:</td></tr>
          ${attrib.utm_source ? `<tr><td style="padding: 2px 8px 2px 0;">Quelle:</td><td>${escapeHtml(attrib.utm_source)}${attrib.utm_medium ? ' / ' + escapeHtml(attrib.utm_medium) : ''}</td></tr>` : ''}
          ${attrib.utm_campaign ? `<tr><td style="padding: 2px 8px 2px 0;">Kampagne:</td><td>${escapeHtml(attrib.utm_campaign)}</td></tr>` : ''}
          ${attrib.gclid ? `<tr><td style="padding: 2px 8px 2px 0;">GCLID:</td><td>${escapeHtml(attrib.gclid)}</td></tr>` : ''}
          ${attrib.landing_page ? `<tr><td style="padding: 2px 8px 2px 0;">Landing Page:</td><td>${escapeHtml(attrib.landing_page)}</td></tr>` : ''}
          ${attrib.referrer ? `<tr><td style="padding: 2px 8px 2px 0;">Referrer:</td><td>${escapeHtml(attrib.referrer)}</td></tr>` : ''}
        </table>
        ` : ''}
        <hr/>
        <p style="color: #666; font-size: 12px;">
          Gesendet am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
        </p>
      `;

      await resend.emails.send({
        from: 'inektra Kontaktformular <info@inektra.de>',
        to: ['info@inektra.de'],
        replyTo: email,
        subject: `Neue Anfrage von ${name}${company ? ` (${company})` : ''}`,
        html: htmlContent,
        attachments,
      });

      console.log('[EMAIL SENT via Resend]');

      // Lead an Webhook senden (fire-and-forget, Fehler nicht blockierend)
      try {
        const webhookUrl = process.env.LEAD_WEBHOOK_URL || 'http://91.249.180.159:8890/webhook/lead';
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            domain: 'inektra.de',
            name,
            company: company || '',
            email,
            phone: phone || '',
            message: message || '',
            source: attrib?.utm_source || 'unknown',
            medium: attrib?.utm_medium || 'none',
            campaign: attrib?.utm_campaign || '',
            gclid: attrib?.gclid || '',
            landing_page: attrib?.landing_page || '',
            referrer: attrib?.referrer || '',
          }),
          signal: AbortSignal.timeout(5000),
        });
        console.log('[WEBHOOK SENT]');
      } catch (webhookError: any) {
        console.error('[WEBHOOK FAILED]', webhookError.message);
        // Nicht blockierend — Lead ist per E-Mail schon raus
      }
    } catch (emailError: any) {
      console.error('[EMAIL FAILED]', emailError.message);
      return NextResponse.json({
        success: false,
        message: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Anfrage erfolgreich gesendet! Wir melden uns zeitnah.'
    });
  } catch (error: any) {
    console.error('[CONTACT ERROR]', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut oder rufen Sie uns an.',
      },
      { status: 500 }
    );
  }
}

// HTML-Escaping für Sicherheit
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
