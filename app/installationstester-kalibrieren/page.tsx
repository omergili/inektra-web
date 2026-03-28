import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Installationstester kalibrieren – VDE 0100 & DIN EN 61557',
  description: 'Installationstester nach VDE 0100 kalibrieren lassen. Schleifenimpedanz, RCD-Auslösezeit, Isolationswiderstand. Eigenes Labor in Nordhorn. Jetzt anfragen.',
  keywords: [
    'installationstester kalibrieren',
    'VDE 0100 prüfgerät kalibrierung',
    'installationstester kalibrieren kosten',
    'anlagenprüfgerät kalibrieren',
    'schleifenimpedanzmessgerät kalibrieren',
    'RCD prüfgerät kalibrierung',
    'DIN EN 61557 prüfgerät',
    'installationstester kalibrieren lassen',
  ],
  alternates: {
    canonical: 'https://inektra.de/installationstester-kalibrieren',
  },
  openGraph: {
    title: 'Installationstester kalibrieren – VDE 0100 | inektra GmbH',
    description: 'Installationstester nach VDE 0100 kalibrieren lassen. Schleifenimpedanz, RCD, Isolation. Labor in Nordhorn.',
    type: 'article',
  },
};

const prueffunktionen = [
  {
    name: 'Schleifenimpedanz',
    text: 'Prüfung mit definierten Impedanznormalen an mehreren Prüfpunkten. Sicherstellung, dass der Installationstester korrekte Werte für die Kurzschlussstrombewertung liefert.',
  },
  {
    name: 'RCD-Auslösezeit',
    text: 'Kalibrierung bei verschiedenen Fehlerströmen (0,5× I∆n, 1× I∆n, 5× I∆n) für RCD Typ A, B und F – soweit vom Gerät unterstützt.',
  },
  {
    name: 'Isolationswiderstand',
    text: 'Prüfung bei 250 V, 500 V und ggf. 1.000 V Prüfspannung mit hochohmigen Referenzwiderständen.',
  },
  {
    name: 'Erdungswiderstand',
    text: 'Kalibrierung der Erdungswiderstandsmessung mit kalibrierten Referenzwiderständen.',
  },
  {
    name: 'Durchgangsprüfung (Niederohmig)',
    text: 'Prüfung der niederohmigen Durchgangsmessung bei 200 mA Prüfstrom mit definierten Widerstandswerten.',
  },
  {
    name: 'Drehfeldrichtung',
    text: 'Überprüfung der korrekten Erkennung der Drehfeldrichtung (Rechtsdrehfeld / Linksdrehfeld).',
  },
];

const pruefschritte = [
  {
    schritt: 'Wareneingang und Sichtprüfung',
    text: 'Jeder Installationstester wird auf äußere Beschädigungen und den Zustand der Messleitungen geprüft. Firmware-Stand und Seriennummer werden dokumentiert.',
  },
  {
    schritt: 'Kalibrierung der Schleifenimpedanzmessung',
    text: 'Die Schleifenimpedanzmessung wird mit definierten Impedanznormalen geprüft. Mehrere Prüfpunkte über den gesamten Messbereich stellen sicher, dass der Installationstester korrekte Werte für die Kurzschlussstrombewertung liefert.',
  },
  {
    schritt: 'Kalibrierung der RCD-Auslösezeitmessung',
    text: 'Die RCD-Prüffunktion wird bei verschiedenen Fehlerströmen für die vom Gerät unterstützten RCD-Typen kalibriert. Der Kalibrator simuliert definierte Auslösebedingungen, die der Installationstester korrekt erkennen muss.',
  },
  {
    schritt: 'Kalibrierung der Isolations- und Erdungsmessung',
    text: 'Die Isolationswiderstandsmessung wird bei verschiedenen Prüfspannungen geprüft. Zusätzlich werden Erdungswiderstandsmessung und niederohmige Durchgangsmessung kalibriert.',
  },
  {
    schritt: 'Kalibrierschein und Dokumentation',
    text: 'Sie erhalten einen rückverfolgbaren Kalibrierschein mit allen Messwerten, Abweichungen und der berechneten Messunsicherheit. Die verwendeten Referenznormale und Umgebungsbedingungen werden dokumentiert.',
  },
];

const faqs = [
  {
    question: 'Wie oft muss ein Installationstester kalibriert werden?',
    answer: 'Die meisten Hersteller empfehlen ein Kalibrierintervall von 12 Monaten. Bei intensiver Nutzung auf Baustellen kann ein kürzeres Intervall sinnvoll sein. Entscheidend ist: Die Ergebnisse Ihrer Anlagenprüfung sind nur belastbar, wenn der Installationstester nachweislich kalibriert ist. Weitere Informationen finden Sie in unserem Ratgeber zu Kalibrierintervallen.',
  },
  {
    question: 'Was wird bei einem Installationstester kalibriert?',
    answer: 'Wir kalibrieren alle prüfrelevanten Messfunktionen: Schleifenimpedanz, RCD-Auslösezeit (soweit vom Gerät unterstützt), Isolationswiderstand, Erdungswiderstand und Durchgangsprüfung. Zusätzlich wird die Drehfeldrichtungserkennung überprüft.',
  },
  {
    question: 'Was kostet die Kalibrierung eines Installationstester?',
    answer: 'Die Kosten hängen vom Gerätetyp und Funktionsumfang ab. Prüfen Sie in unserer Kalibrierkosten-Suche, ob Ihr Modell gelistet ist – dort finden Sie den konkreten Preis. Für nicht gelistete Modelle erstellen wir gerne ein individuelles Angebot.',
  },
  {
    question: 'Werden alle RCD-Typen kalibriert?',
    answer: 'Wir kalibrieren die RCD-Prüffunktion für alle Typen die Ihr Installationstester unterstützt: Typ A (pulsierender Gleichstrom), Typ B (glatter Gleichstrom) und Typ F (Frequenzumrichter). Für jeden Typ werden mehrere Fehlerstromstufen geprüft.',
  },
  {
    question: 'Warum ist die Kalibrierung eines Installationstester besonders wichtig?',
    answer: 'Ein Installationstester entscheidet, ob eine elektrische Anlage sicher in Betrieb genommen werden darf. Wenn die Schleifenimpedanzmessung falsch niedrige Werte anzeigt, wird eine unzureichend abgesicherte Anlage fälschlicherweise freigegeben. Im Schadensfall haftet die prüfende Fachkraft – und der Kalibrierstatus des Prüfgeräts wird als erstes geprüft.',
  },
];

export default function InstallationstesterKalibrierenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Kalibrierung von Installationstestern nach VDE 0100',
    description: 'Werkskalibrierung von Installationstestern für die Erst- und Wiederholungsprüfung ortsfester elektrischer Anlagen nach DIN VDE 0100 und DIN EN 61557.',
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

      <Breadcrumbs items={[{ name: 'Installationstester kalibrieren' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Installationstester</span> kalibrieren
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              VDE 0100 Prüfgeräte kalibrieren lassen – Schleifenimpedanz, RCD-Auslösezeit, Isolationswiderstand. Eigenes Labor in Nordhorn.
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
              Warum Installationstester kalibriert werden müssen
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Installationstester nach DIN VDE 0100 entscheiden, ob eine elektrische Anlage sicher in Betrieb genommen werden darf. Wenn die Schleifenimpedanzmessung falsch niedrige Werte liefert, wird eine unzureichend abgesicherte Anlage fälschlicherweise freigegeben. Die Konsequenzen reichen von Brandgefahr bis zum Personenschaden.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              In unserem Kalibrierlabor in Nordhorn kalibrieren wir eine Vielzahl gängiger Installationstester. Ob wir Ihren Installationstester kalibrieren können, erfahren Sie in unserer{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten-Suche</Link>{' '}
              – dort sind über 3.200 Gerätetypen mit Preisen gelistet.
            </p>
            <p className="text-lg text-slate-600">
              Sie suchen die Kalibrierung eines Gerätetester nach VDE 0701/0702?{' '}
              <Link href="/geraetetester-kalibrieren" className="text-accent-600 font-semibold hover:underline">Gerätetester kalibrieren →</Link>
              {' '}Informationen zu{' '}
              <Link href="/kalibrierintervalle" className="text-accent-600 font-semibold hover:underline">Kalibrierintervallen</Link> finden Sie in unserem Ratgeber.
            </p>
          </div>
        </div>
      </section>

      {/* Prüffunktionen */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Diese Prüffunktionen kalibrieren wir</h2>
            <p className="text-xl text-slate-600">Alle prüfrelevanten Messfunktionen nach DIN VDE 0100 und DIN EN 61557</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {prueffunktionen.map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-accent-50 p-6 rounded-xl border border-accent-200">
            <p className="text-slate-700">
              Ob wir Ihren Installationstester kalibrieren können, erfahren Sie in unserer{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten-Suche →</Link>{' '}
              Dort sind über 3.200 Gerätetypen mit Preisen gelistet. Für nicht gelistete Modelle{' '}
              <Link href="/kontakt" className="text-accent-600 font-semibold hover:underline">kontaktieren Sie uns</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Prüfablauf */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So kalibrieren wir Ihren Installationstester</h2>
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Relevante Normen und Vorschriften</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">DIN VDE 0100 Teil 600</h3>
                <p className="text-slate-600">Erstprüfung und wiederkehrende Prüfung ortsfester elektrischer Anlagen. Beschreibt die Prüfverfahren für Schleifenimpedanz, RCD-Auslösezeit, Isolationswiderstand und Erdungswiderstand. Ein kalibrierter Installationstester ist Voraussetzung für normkonforme Prüfberichte.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">DIN EN 61557</h3>
                <p className="text-slate-600">Legt die Genauigkeitsanforderungen an Prüfgeräte für Schutzmaßnahmen in Niederspannungsanlagen fest. Definiert die zulässigen Messunsicherheiten für Schleifenimpedanz, RCD-Auslösezeit, Isolationswiderstand und Erdungswiderstand.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">DGUV Vorschrift 3 (ehem. BGV A3)</h3>
                <p className="text-slate-600">Unfallverhütungsvorschrift für elektrische Anlagen und Betriebsmittel. Verpflichtet zur regelmäßigen Anlagenprüfung mit kalibrierten Prüfmitteln.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">BetrSichV (Betriebssicherheitsverordnung)</h3>
                <p className="text-slate-600">Fordert den Nachweis der Eignung und Funktionsfähigkeit von Prüfmitteln. Kalibrierte Installationstester erfüllen diese Forderung.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link href="/geraetetester-kalibrieren" className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform">
                Gerätetester kalibrieren
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
      <PageFAQ faqs={faqs} title="Häufige Fragen zur Kalibrierung von Installationstestern" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Installationstester kalibrieren lassen</h2>
          <p className="text-xl text-slate-300 mb-8">
            Senden Sie uns Hersteller, Modell und Seriennummer Ihres Installationstester – wir prüfen, ob wir Ihr Gerät kalibrieren können, und erstellen Ihnen ein Angebot.
          </p>
          <Link href="/kontakt" className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg">
            Jetzt Angebot anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
