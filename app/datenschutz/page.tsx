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
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Externes Hosting</h3>
          <p>
            Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, 
            werden auf den Servern des Hosters / der Hoster gespeichert.
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

          <p className="mt-8 text-sm text-gray-600">
            Stand: {new Date().toLocaleDateString('de-DE')}
          </p>
        </div>
      </div>
    </div>
  );
}
