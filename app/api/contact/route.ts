import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, hasFile, fileName } = body;

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
      hasFile: hasFile || false,
      fileName: fileName || '',
    };

    // 📊 WICHTIG: Console-Log für Vercel Logs (Backup-Methode)
    console.log('[🔔 NEW CONTACT FORM SUBMISSION]', JSON.stringify(lead, null, 2));

    // ✉️ E-Mail senden via Resend (wenn API-Key konfiguriert)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'inektra Kontaktformular <onboarding@resend.dev>', // TODO: Use custom domain
          to: ['bot@mylurch.de'],
          replyTo: email,
          subject: `Neue Anfrage von ${name}`,
          html: `
            <h2>Neue Kontaktanfrage über inektra-web.vercel.app</h2>
            <p><strong>Name/Firma:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
            ${message ? `<p><strong>Nachricht:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>` : ''}
            ${hasFile ? `<p><strong>Datei hochgeladen:</strong> ${escapeHtml(fileName || 'unbekannt')}</p>` : ''}
            <hr/>
            <p style="color: #666; font-size: 12px;">
              Gesendet am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
            </p>
          `,
        });
        
        console.log('[✅ EMAIL SENT via Resend]');
      } catch (emailError: any) {
        console.error('[⚠️ EMAIL FAILED]', emailError.message);
        // Nicht kritisch - weitermachen
      }
    } else {
      console.log('[⚠️ RESEND_API_KEY not configured - email skipped]');
    }

    // 📱 TODO: Telegram-Benachrichtigung (via Heartbeat-Polling oder Webhook)
    // myLurch checks Vercel logs or /api/admin/leads endpoint

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
