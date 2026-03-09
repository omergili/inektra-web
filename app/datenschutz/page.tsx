import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-lg max-w-none text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
            wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Datenerfassung auf dieser Website</h3>
          <h4 className="text-lg font-medium text-slate-800 mt-4 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum entnehmen.
          </p>

          <h4 className="text-lg font-medium text-slate-800 mt-4 mb-2">Wie erfassen wir Ihre Daten?</h4>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, 
            die Sie in ein Kontaktformular eingeben.
          </p>
          <p>
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. 
            Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Wofür nutzen wir Ihre Daten?</h3>
          <p>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
            Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Hosting</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
          </p>
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Vercel</h3>
          <p>
            Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.
            Wenn Sie unsere Website besuchen, werden Ihre personenbezogenen Daten (z.B. IP-Adresse, Browsertyp,
            Betriebssystem, Referrer-URL, Zugriffszeit) auf den Servern von Vercel verarbeitet.
          </p>
          <p>
            Die Nutzung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes
            Interesse an einer zuverlaessigen und schnellen Bereitstellung unserer Website. Die Datenuebermittlung
            in die USA wird auf EU-Standardvertragsklauseln gestuetzt.
          </p>
          <p>
            Weitere Informationen finden Sie in der{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Datenschutzerklaerung von Vercel
            </a>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Verantwortliche Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p>
            {siteConfig.legal.company}<br />
            {siteConfig.contact.legal_address.street}<br />
            {siteConfig.contact.legal_address.city}
          </p>
          <p>
            Telefon: {siteConfig.contact.phone}<br />
            E-Mail: <a href={`mailto:${siteConfig.contact.email}`} className="text-blue-600 hover:underline">{siteConfig.contact.email}</a>
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Speicherdauer</h3>
          <p>
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, 
            verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Ihre Rechte</h3>
          <p>Sie haben jederzeit das Recht:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten und deren Verarbeitung zu erhalten</li>
            <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
            <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
            <li>Einschränkung der Datenverarbeitung zu verlangen</li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen</li>
            <li>Datenübertragbarkeit zu verlangen</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Datenerfassung auf dieser Website</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
            inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
            von Anschlussfragen bei uns gespeichert.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Anfrage per E-Mail oder Telefon</h3>
          <p>
            Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden
            personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Cookies und Tracking-Technologien</h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Was sind Cookies?</h3>
          <p>
            Cookies sind kleine Textdateien, die auf Ihrem Endgeraet gespeichert werden. Sie richten keinen Schaden
            an und enthalten keine Viren. Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten
            und bestimmte Funktionen zu ermoeglichen.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Essenzielle Cookies</h3>
          <p>
            Wir verwenden technisch notwendige Speichermechanismen (localStorage), um Ihre Cookie-Einstellungen
            zu speichern. Diese sind fuer den Betrieb der Website erforderlich und koennen nicht deaktiviert werden.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) i.V.m. TTDSG &sect; 25 Abs. 2 Nr. 2
            (technisch notwendige Speicherung).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Marketing-Cookies (Google Ads)</h3>
          <p>
            Mit Ihrer Einwilligung setzen wir Marketing-Cookies von Google Ads ein. Diese Cookies dienen der
            Messung der Wirksamkeit unserer Werbeanzeigen (Conversion-Tracking). Folgende Cookies koennen gesetzt werden:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><code className="text-sm bg-slate-100 px-1 rounded">_gcl_au</code> – Google Ads Conversion-Linker (90 Tage)</li>
            <li><code className="text-sm bg-slate-100 px-1 rounded">_gcl_aw</code> – Google Ads Click-ID (90 Tage)</li>
            <li><code className="text-sm bg-slate-100 px-1 rounded">_gac_*</code> – Google Ads Kampagneninformationen (90 Tage)</li>
          </ul>
          <p className="mt-3">
            Diese Cookies werden <strong>nur nach Ihrer ausdruecklichen Einwilligung</strong> ueber unseren Cookie-Banner gesetzt.
            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) i.V.m. TTDSG &sect; 25 Abs. 1.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4" id="cookie-einstellungen">6. Google Ads Conversion-Tracking</h2>
          <p>
            Wir nutzen Google Ads Conversion-Tracking, einen Dienst der Google Ireland Limited,
            Gordon House, Barrow Street, Dublin 4, Irland (&bdquo;Google&ldquo;).
          </p>
          <p>
            Wenn Sie auf eine unserer Google-Anzeigen klicken, wird ein Conversion-Tracking-Cookie auf Ihrem
            Endgeraet gespeichert (sofern Sie eingewilligt haben). Wenn Sie anschliessend bestimmte Aktionen
            auf unserer Website ausfuehren (z.B. Absenden des Kontaktformulars), kann Google zuordnen, dass
            Sie zuvor auf die Anzeige geklickt haben.
          </p>
          <p>
            Wir verwenden Google Consent Mode v2. Das bedeutet: Ohne Ihre Einwilligung werden keine
            Marketing-Cookies gesetzt und keine personenbezogenen Daten an Google uebermittelt. Google kann
            in diesem Fall jedoch anonymisierte, cookielose Signale erheben (Consent Mode Modeling), um
            aggregierte Statistiken zu erstellen.
          </p>
          <p>
            Die von Google erhobenen Daten koennen in die USA uebertragen werden. Die Datenuebermittlung
            wird auf EU-Standardvertragsklauseln gestuetzt.
          </p>
          <p>
            Weitere Informationen finden Sie in der{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Datenschutzerklaerung von Google
            </a>{' '}
            sowie den{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Informationen zu Google Ads
            </a>.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Einwilligung widerrufen</h3>
          <p>
            Sie koennen Ihre Einwilligung jederzeit widerrufen, indem Sie im Footer unserer Website auf
            &bdquo;Cookie-Einstellungen&ldquo; klicken. Nach dem Widerruf werden keine Marketing-Cookies
            mehr gesetzt. Bereits gesetzte Cookies koennen Sie ueber die Einstellungen Ihres Browsers loeschen.
            Die gespeicherte Einwilligung laeuft automatisch nach 13 Monaten ab.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">7. E-Mail-Verarbeitung</h2>
          <p>
            Fuer den Versand von E-Mails aus unserem Kontaktformular nutzen wir den Dienst Resend
            (Resend Inc., USA). Wenn Sie unser Kontaktformular absenden, werden Ihre eingegebenen Daten
            (Name, E-Mail-Adresse, Telefonnummer, Nachricht, ggf. Dateianhang) ueber die Server von
            Resend an uns uebermittelt.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung bzw. Durchfuehrung vorvertraglicher
            Massnahmen auf Anfrage der betroffenen Person). Die Datenuebermittlung in die USA wird auf
            EU-Standardvertragsklauseln gestuetzt.
          </p>

          <p className="mt-8 text-sm text-gray-600">
            Stand: Maerz 2026
          </p>
        </div>
      </div>
    </div>
  );
}
