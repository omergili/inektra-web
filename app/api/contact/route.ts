import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
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

    // Lead-Objekt für Logging
    const lead = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || '',
      message: message || '',
      hasFile: !!file,
      fileName: file?.name || '',
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
        <p><strong>Name/Firma:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
        ${message ? `<p><strong>Nachricht:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>` : ''}
        ${file ? `<p><strong>Datei im Anhang:</strong> ${escapeHtml(file.name)}</p>` : ''}
        <hr/>
        <p style="color: #666; font-size: 12px;">
          Gesendet am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
        </p>
      `;

      await resend.emails.send({
        from: 'inektra Kontaktformular <info@inektra.de>',
        to: ['info@inektra.de'],
        replyTo: email,
        subject: `Neue Anfrage von ${name}`,
        html: htmlContent,
        attachments,
      });

      console.log('[EMAIL SENT via Resend]');
    } catch (emailError: any) {
      console.error('[EMAIL FAILED]', emailError.message);
      return NextResponse.json({
        success: false,
        message: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.',
        debug: emailError.message,
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
        debug: error.message,
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
