import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Gerätetester kalibrieren – VDE 0701/0702 & DGUV V3',
  description: 'Gerätetester nach VDE 0701/0702 kalibrieren lassen. Schutzleiterwiderstand, Isolationswiderstand, Ableitstrom. Eigenes Labor in Nordhorn. Jetzt Angebot anfordern.',
  keywords: [
    'gerätetester kalibrieren',
    'VDE 0701 prüfgerät kalibrierung',
    'VDE 0702 prüfgerät kalibrierung',
    'VDE prüfgerät kalibrieren',
    'DGUV V3 prüfgerät kalibrieren',
    'gerätetester kalibrieren lassen',
    'gerätetester kalibrieren kosten',
    'VDE prüfgerät kalibrieren lassen',
  ],
  alternates: {
    canonical: 'https://inektra.de/geraetetester-kalibrieren',
  },
  openGraph: {
    title: 'Gerätetester kalibrieren – VDE 0701/0702 | inektra GmbH',
    description: 'Gerätetester nach VDE 0701/0702 kalibrieren lassen. Alle prüfrelevanten Messfunktionen. Labor in Nordhorn.',
    type: 'article',
  },
};

const pruefschritte = [
  {
    schritt: 'Wareneingang und Sichtprüfung',
    text: 'Jeder Gerätetester wird auf äußere Beschädigungen, Zustand der Messleitungen und Prüfadapter geprüft. Der Firmware-Stand und die Geräte-Seriennummer werden dokumentiert. Bei sichtbaren Defekten informieren wir Sie vor Beginn der Kalibrierung.',
  },
  {
    schritt: 'Kalibrierung der Schutzleiterwiderstands-Messung',
    text: 'Die Schutzleiterwiderstandsmessung wird mit kalibrierten Referenzwiderständen bei verschiedenen Prüfströmen (200 mA, 10 A, 25 A) überprüft. Die Messwerte werden an mehreren Prüfpunkten über den gesamten Messbereich erfasst und die Abweichungen dokumentiert.',
  },
  {
    schritt: 'Kalibrierung der Isolationswiderstands-Messung',
    text: 'Die Isolationswiderstandsmessung wird bei den Prüfspannungen 250 V und 500 V mit hochohmigen Referenzwiderständen geprüft. Der Kalibrator erzeugt definierte Widerstandswerte, die vom Gerätetester gemessen und mit dem Sollwert verglichen werden.',
  },
  {
    schritt: 'Kalibrierung der Ableitstrom- und Berührungsstrommessung',
    text: 'Ableitstrom, Berührungsstrom und Differenzstrom werden mit einem Präzisions-Sicherheitskalibrator geprüft. Der Kalibrator simuliert definierte Fehlerströme, die der Gerätetester korrekt messen und anzeigen muss.',
  },
  {
    schritt: 'Kalibrierschein und Dokumentation',
    text: 'Sie erhalten einen rückverfolgbaren Kalibrierschein mit allen Messwerten, Abweichungen und der berechneten Messunsicherheit. Die verwendeten Referenznormale und Umgebungsbedingungen (Temperatur, Feuchte) werden dokumentiert.',
  },
];

const warumKalibrieren = [
  {
    titel: 'Gesetzliche Pflicht nach DGUV Vorschrift 3',
    text: 'Die DGUV Vorschrift 3 (ehemals BGV A3) verpflichtet Arbeitgeber zur regelmäßigen Prüfung ortsveränderlicher elektrischer Betriebsmittel. Die Prüfergebnisse sind nur belastbar, wenn der verwendete Gerätetester nachweislich kalibriert ist. Ohne gültigen Kalibrierschein riskieren Sie bei einem Unfall die Beweislast.',
  },
  {
    titel: 'Haftung im Schadensfall',
    text: 'Wenn ein nach DGUV V3 geprüftes Gerät einen Schaden verursacht, prüft die Versicherung als erstes den Kalibrierstatus des verwendeten Gerätetester. Ein abgelaufener oder fehlender Kalibrierschein kann zur Leistungsverweigerung führen.',
  },
  {
    titel: 'Qualitätsmanagement und Audits',
    text: 'In QM-Systemen und bei Audits wird der Kalibrierstatus aller Prüfmittel regelmäßig überprüft. Ein lückenloser Kalibriernachweis ist Voraussetzung für die Aufrechterhaltung Ihrer Zertifizierung.',
  },
  {
    titel: 'Messgenauigkeit sicherstellen',
    text: 'Gerätetester unterliegen Alterung, mechanischem Verschleiß und Umgebungseinflüssen. Insbesondere die Prüfstromquellen (10 A / 25 A) und die Isolationsmessung bei hohen Prüfspannungen können über die Zeit driften. Regelmäßige Kalibrierung stellt sicher, dass Grenzwertentscheidungen (bestanden/nicht bestanden) korrekt sind.',
  },
];

const prueffunktionen = [
  {
    name: 'Schutzleiterwiderstand',
    text: 'Prüfung bei verschiedenen Prüfströmen (200 mA, 10 A, 25 A) mit kalibrierten Referenzwiderständen. Mehrere Prüfpunkte über den gesamten Messbereich.',
  },
  {
    name: 'Isolationswiderstand',
    text: 'Prüfung bei 250 V und 500 V Prüfspannung mit hochohmigen Referenzen. Vergleich der Messwerte mit den Sollwerten des Kalibrators.',
  },
  {
    name: 'Ableitstrom / Berührungsstrom',
    text: 'Simulation definierter Fehlerströme im µA- und mA-Bereich. Prüfung von Ableitstrom, Berührungsstrom und Differenzstrom.',
  },
  {
    name: 'Ersatzableitstrom',
    text: 'Kalibrierung der Ersatzableitstrommessung bei verschiedenen Messbereichsstufen.',
  },
  {
    name: 'Funktionsprüfung',
    text: 'Überprüfung der korrekten Funktion aller Prüfroutinen, Anzeigen und Grenzwertbewertungen des Gerätetester.',
  },
];

const faqs = [
  {
    question: 'Wie oft muss ein Gerätetester kalibriert werden?',
    answer: 'Die meisten Hersteller empfehlen ein Kalibrierintervall von 12 Monaten. Bei intensiver Nutzung (z. B. täglicher Einsatz auf Baustellen) kann ein kürzeres Intervall von 6 Monaten sinnvoll sein. Entscheidend ist die Risikobewertung: Wie kritisch sind die Prüfergebnisse, die mit dem Gerät erzeugt werden? Weitere Informationen finden Sie in unserem Ratgeber zu Kalibrierintervallen.',
  },
  {
    question: 'Was wird bei einem Gerätetester kalibriert?',
    answer: 'Bei einem VDE 0701/0702-Gerätetester kalibrieren wir alle prüfrelevanten Messfunktionen: Schutzleiterwiderstand (bei 200 mA, 10 A und 25 A Prüfstrom), Isolationswiderstand (bei 250 V und 500 V Prüfspannung), Ableitstrom, Berührungsstrom und Differenzstrom. Jede Funktion wird an mehreren Prüfpunkten über den gesamten Messbereich geprüft und die Abweichung zum Sollwert dokumentiert.',
  },
  {
    question: 'Was kostet die Kalibrierung eines Gerätetester?',
    answer: 'Die Kosten hängen vom Gerätetyp und Funktionsumfang ab. Prüfen Sie in unserer Kalibrierkosten-Suche, ob Ihr Gerätemodell gelistet ist – dort finden Sie den konkreten Preis. Für nicht gelistete Modelle erstellen wir gerne ein individuelles Angebot.',
  },
  {
    question: 'Können Messleitungen und Prüfadapter mitgesendet werden?',
    answer: 'Ja, wir empfehlen sogar, Messleitungen und häufig verwendete Prüfadapter mitzusenden. Der Übergangswiderstand der Messleitungen beeinflusst die Schutzleiterwiderstandsmessung. Wir prüfen den Zustand der Leitungen und dokumentieren den Übergangswiderstand auf dem Kalibrierschein.',
  },
  {
    question: 'Was ist der Unterschied zwischen Kalibrierung und Justierung?',
    answer: 'Bei der Kalibrierung wird festgestellt, wie groß die Abweichung zwischen der Anzeige Ihres Gerätetester und dem tatsächlichen Wert (Referenznormal) ist. Die Abweichung wird dokumentiert, das Gerät aber nicht verändert. Bei einer Justierung wird das Gerät so eingestellt, dass die Abweichung minimiert wird. Wir führen standardmäßig eine Kalibrierung durch. Falls eine Justierung erforderlich ist, stimmen wir das vorher mit Ihnen ab.',
  },
];

export default function GeraetetesterKalibrierenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Kalibrierung von Gerätetestern nach VDE 0701/0702',
    description: 'Werkskalibrierung von Gerätetestern für die wiederkehrende Prüfung ortsveränderlicher elektrischer Betriebsmittel nach DGUV Vorschrift 3.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://inektra.de/#organization',
    },
    areaServed: { '@type': 'Country', name: 'DE' },
    serviceType: 'Kalibrierung',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs items={[{ name: 'Gerätetester kalibrieren' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Gerätetester</span> kalibrieren
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              VDE 0701/0702 Prüfgeräte kalibrieren lassen – alle prüfrelevanten Messfunktionen. Eigenes Labor in Nordhorn.
            </p>
            <Link href="/kontakt" className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg">
              Kalibrierung anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* Einleitung */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Warum Gerätetester regelmäßig kalibriert werden müssen
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Gerätetester nach DIN VDE 0701-0702 treffen Grenzwertentscheidungen: bestanden oder nicht bestanden. Ein Gerätetester, dessen Schutzleiterwiderstandsmessung um 30 % zu niedrig misst, gibt möglicherweise defekte Geräte frei. Die Konsequenzen reichen von Personenschäden bis zum Versicherungsausfall.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              In unserem Kalibrierlabor in Nordhorn kalibrieren wir eine Vielzahl gängiger Gerätetester. Ob wir Ihren Gerätetester kalibrieren können, erfahren Sie in unserer{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten-Suche</Link>{' '}
              – dort sind über 3.200 Gerätetypen mit Preisen gelistet.
            </p>
            <p className="text-lg text-slate-600">
              Sie suchen die Kalibrierung eines Installationstester nach VDE 0100?{' '}
              <Link href="/installationstester-kalibrieren" className="text-accent-600 font-semibold hover:underline">Installationstester kalibrieren →</Link>
              {' '}Informationen zu{' '}
              <Link href="/kalibrierintervalle" className="text-accent-600 font-semibold hover:underline">Kalibrierintervallen</Link> finden Sie in unserem Ratgeber.
            </p>
          </div>
        </div>
      </section>

      {/* Warum kalibrieren */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Vier Gründe für die Kalibrierung</h2>
          <p className="text-xl text-slate-600 mb-12">DGUV V3, Haftung, Qualitätsmanagement und Messgenauigkeit</p>
          <div className="grid md:grid-cols-2 gap-6">
            {warumKalibrieren.map((item) => (
              <div key={item.titel} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.titel}</h3>
                <p className="text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prüffunktionen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Diese Prüffunktionen kalibrieren wir</h2>
            <p className="text-xl text-slate-600">Alle prüfrelevanten Messfunktionen nach DIN VDE 0701-0702</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {prueffunktionen.map((item) => (
              <div key={item.name} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-accent-50 p-6 rounded-xl border border-accent-200">
            <p className="text-slate-700">
              Ob wir Ihren Gerätetester kalibrieren können, erfahren Sie in unserer{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten-Suche →</Link>{' '}
              Dort sind über 3.200 Gerätetypen mit Preisen gelistet. Für nicht gelistete Modelle{' '}
              <Link href="/kontakt" className="text-accent-600 font-semibold hover:underline">kontaktieren Sie uns</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Prüfablauf */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So kalibrieren wir Ihren Gerätetester</h2>
            <p className="text-xl text-slate-600">Vom Wareneingang bis zum Kalibrierschein – fünf Schritte</p>
          </div>
          <div className="space-y-8">
            {pruefschritte.map((item, index) => (
              <div key={item.schritt} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.schritt}</h3>
                  <p className="text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Normen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Relevante Normen und Vorschriften</h2>
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">DIN VDE 0701-0702</h3>
                <p className="text-slate-600">Prüfung nach Instandsetzung und Änderung (0701) sowie wiederkehrende Prüfung (0702) ortsveränderlicher elektrischer Geräte. Definiert die Prüfverfahren und Grenzwerte für Schutzleiterwiderstand, Isolationswiderstand, Ableitstrom und Berührungsstrom.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">DGUV Vorschrift 3 (ehem. BGV A3)</h3>
                <p className="text-slate-600">Unfallverhütungsvorschrift für elektrische Anlagen und Betriebsmittel. Verpflichtet den Arbeitgeber zur regelmäßigen Prüfung. Die Prüfmittel müssen nachweislich kalibriert sein – ohne gültigen Kalibrierschein sind die Prüfberichte im Schadensfall anfechtbar.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">BetrSichV (Betriebssicherheitsverordnung)</h3>
                <p className="text-slate-600">Fordert den Nachweis der Eignung und Funktionsfähigkeit von Prüfmitteln. Kalibrierte Gerätetester erfüllen diese Forderung und dokumentieren die Rückverfolgbarkeit auf nationale Normale.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link href="/installationstester-kalibrieren" className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform">
                Installationstester kalibrieren
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/elektrische-messtechnik-kalibrierung" className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform">
                Alle elektrischen Messgeräte
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/kalibrierkosten" className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform">
                Kalibrierkosten nachschlagen
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/kalibrierintervalle" className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform">
                Kalibrierintervalle
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen zur Kalibrierung von Gerätetestern" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Gerätetester kalibrieren lassen</h2>
          <p className="text-xl text-slate-300 mb-8">
            Senden Sie uns Hersteller, Modell und Seriennummer Ihres Gerätetester – wir prüfen, ob wir Ihr Gerät kalibrieren können, und erstellen Ihnen ein Angebot.
          </p>
          <Link href="/kontakt" className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg">
            Jetzt Angebot anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
