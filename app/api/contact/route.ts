import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Environment-Check
    if (!process.env.SMTP_PASSWORD) {
      console.error('SMTP_PASSWORD not configured');
      return NextResponse.json(
        { success: false, message: 'Server-Konfigurationsfehler. Bitte kontaktieren Sie uns telefonisch.' },
        { status: 500 }
      );
    }

    // Email-Konfiguration (nutzt bot@mylurch.de Mail-Server)
    const transporter = nodemailer.createTransport({
      host: 'cp120.sp-server.net',
      port: 465,
      secure: true,
      auth: {
        user: 'bot@mylurch.de',
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Für selbstsignierte Zertifikate
      },
    });

    // E-Mail erstellen
    const mailOptions = {
      from: 'bot@mylurch.de',
      to: 'bot@mylurch.de', // An uns selbst
      replyTo: email,
      subject: `Neue Anfrage von ${name} (${email})`,
      html: `
        <h2>Neue Kontaktanfrage über kalibrierservice.com</h2>
        <p><strong>Name/Firma:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${message ? `<p><strong>Nachricht:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>` : ''}
        ${hasFile ? `<p><strong>Datei hochgeladen:</strong> ${fileName}</p>` : ''}
        <hr/>
        <p style="color: #666; font-size: 12px;">
          Gesendet am ${new Date().toLocaleString('de-DE')} über das Kontaktformular.
        </p>
      `,
    };

    // E-Mail senden
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({ success: true, message: 'Anfrage erfolgreich gesendet!' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    console.error('Error details:', error.message, error.code);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.',
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
