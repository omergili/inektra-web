import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // 📊 Console-Log für Vercel Logs (Backup)
    console.log('[🔔 NEW CONTACT FORM SUBMISSION]', JSON.stringify(lead, null, 2));

    // ✉️ E-Mail senden via Nodemailer (SMTP)
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('[⚠️ SMTP not configured]', {
        hasHost: !!smtpHost,
        hasUser: !!smtpUser,
        hasPass: !!smtpPass,
      });
      return NextResponse.json({
        success: false,
        message: 'E-Mail-Versand ist nicht konfiguriert. Bitte rufen Sie uns direkt an.',
      }, { status: 500 });
    }

    try {
      const smtpPort = Number(process.env.SMTP_PORT) || 465;
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // SSL for 465, STARTTLS for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Anhang vorbereiten
      const attachments = [];
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        });
      }

      await transporter.sendMail({
        from: `inektra Kontaktformular <${smtpUser}>`,
        to: 'info@inektra.de',
        replyTo: email,
        subject: `Neue Anfrage von ${name}`,
        html: `
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
        `,
        attachments,
      });

      console.log('[✅ EMAIL SENT via SMTP]');
    } catch (emailError: any) {
      console.error('[❌ EMAIL FAILED]', emailError.message, emailError.code);
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
    console.error('[❌ CONTACT ERROR]', error);

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
