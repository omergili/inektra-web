import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Druckkalibrierung – Manometer kalibrieren',
  description: 'Druckkalibrierung für Manometer, Drucksensoren und Transmitter. Prüfung nach DKD-R 6-1. Labor in Nordhorn. Ab 20,85 € netto.',
  keywords: ['druckkalibrierung', 'manometer kalibrieren', 'drucksensor kalibrierung', 'druckmessgerät kalibrieren', 'manometer prüfen', 'drucktransmitter kalibrierung'],
  alternates: {
    canonical: 'https://inektra.de/druckkalibrierung',
  },
  openGraph: {
    title: 'Druckkalibrierung – Manometer kalibrieren | inektra GmbH',
    description: 'Druckmessgeräte kalibrieren: Manometer, Sensoren, Transmitter. Prüfung nach DKD-R 6-1, eigenes Labor in Nordhorn.',
    type: 'article',
  },
};

const geraetetypen = [
  {
    name: 'Manometer',
    norm: 'DIN EN 837',
    richtlinie: 'DKD-R 6-1',
    preisAb: '20,85',
    beispiele: 'Rohrfedermanometer (±2,5%), Manometer (±1,0%/±1,6%), Feinmessmanometer (±0,6%)',
    detail: 'Jeweils 5 Prüfpunkte bei steigendem und fallendem Druck. Druckbereiche von 1 bis 1.200 bar je nach Genauigkeitsklasse. Unterdruck-Messung zusätzlich 13,02 €.',
  },
  {
    name: 'Feinmess-Manometer',
    norm: 'DIN EN 837',
    richtlinie: 'DKD-R 6-1',
    preisAb: '28,66',
    beispiele: 'Feinmessmanometer (±0,1%), Präzisionsmanometer (±0,3%), hochgenaue Referenzmanometer',
    detail: 'Je nach Genauigkeitsklasse 5 oder 10 Prüfpunkte bei steigendem und fallendem Druck. Druckbereiche von 1 bis 700 bar.',
  },
  {
    name: 'Geringdruck-Manometer',
    norm: 'DIN EN 837',
    richtlinie: '—',
    preisAb: '36,47',
    beispiele: 'Kapselfedermanometer, Plattenfedermanometer, Membranmanometer für niedrige Drücke',
    detail: 'Genauigkeitsklasse 0,5 bis 2,5. Messbereiche im Millibar-Bereich: 10 bis 1.000 mbar. Geeignet für Lüftungs- und Klimatechnik.',
  },
  {
    name: 'Drucksensoren & Transmitter',
    norm: '—',
    richtlinie: 'DKD-R 6-1',
    preisAb: '46,90',
    beispiele: 'Piezoresistive Sensoren, kapazitive Transmitter, Druckmessumformer (4–20 mA / 0–10 V)',
    detail: 'Genauigkeit ±0,05% bis ±0,5%. Jeweils 5 Prüfpunkte steigend und fallend. Kalibrierung der Anzeigeeinheit zusätzlich 27,36 €. Druckbereiche von 1 bis 700 bar.',
  },
  {
    name: 'Drucktrommelschreiber',
    norm: '—',
    richtlinie: 'DKD-R 6-1',
    preisAb: '49,51',
    beispiele: 'Registrierende Druckmessgeräte, Kreisblattschreiber, Langzeitschreiber',
    detail: 'Genauigkeit ±0,5% bis ±2,5%. Jeweils 5 Prüfpunkte bei steigendem und fallendem Druck. Druckbereiche von 1 bis 700 bar.',
  },
  {
    name: 'Prüfpumpen & Reifendruckprüfer',
    norm: '—',
    richtlinie: '—',
    preisAb: '32,56',
    beispiele: 'Handbetriebene Prüfpumpen (16–160 bar), Reifendruckprüfer (bis 20 bar, ±2,5%)',
    detail: 'Prüfpumpen werden nach hauseigenem Verfahren geprüft. Reifendruckprüfer bis 20 bar Messbereich. Abmontage vom Anschlussstück bei Bedarf: 6,51 €.',
  },
];

const pruefschritte = [
  {
    schritt: 'Sichtprüfung & Vorbereitung',
    text: 'Jedes Druckmessgerät wird bei Wareneingang auf äußere Beschädigungen, Undichtigkeiten und korrekte Funktion geprüft. Das Gerät wird gereinigt und an den Prüfstand angeschlossen.',
  },
  {
    schritt: 'Steigende Druckpunkte',
    text: 'Der Druck wird stufenweise von Null bis zum Messbereichsendwert erhöht. An jedem Prüfpunkt (in der Regel 5 gleichmäßig verteilte Punkte) wird der angezeigte Wert mit dem Referenznormal verglichen und dokumentiert.',
  },
  {
    schritt: 'Fallende Druckpunkte',
    text: 'Anschließend wird der Druck schrittweise abgesenkt. Die gleichen Prüfpunkte werden erneut gemessen. Aus der Differenz zwischen steigenden und fallenden Werten ergibt sich die Hysterese – ein wichtiges Qualitätsmerkmal jedes Druckmessgeräts.',
  },
  {
    schritt: 'Dokumentation & Kalibrierschein',
    text: 'Alle Messwerte, Abweichungen und die berechnete Messunsicherheit werden dokumentiert. Sie erhalten einen rückverfolgbaren Kalibrierschein mit Angabe der verwendeten Referenznormale und der Umgebungsbedingungen.',
  },
];

const normen = [
  {
    name: 'DKD-R 6-1',
    text: 'Die zentrale Kalibrierrichtlinie für Druckmessgeräte. Sie definiert die Prüfverfahren, die Anzahl der Messpunkte (steigend und fallend), die Berechnung der Messunsicherheit und die Anforderungen an die Dokumentation. Gilt für Manometer, Drucksensoren und Transmitter.',
  },
  {
    name: 'DIN EN 837',
    text: 'Die europäische Norm für mechanische Druckmessgeräte mit Rohrfeder (Teil 1: Manometer, Teil 2: Auswahl und Einbau, Teil 3: Druckmessgeräte mit Plattenfeder). Definiert Genauigkeitsklassen von 0,1 bis 4,0 und die zugehörigen Fehlergrenzen.',
  },
  {
    name: 'DIN EN ISO 6529 / VDI/VDE 2617',
    text: 'Ergänzende Normen für spezielle Druckmessaufgaben und die Rückführung auf nationale Normale. Die Messunsicherheitsberechnung erfolgt nach GUM (Guide to the Expression of Uncertainty in Measurement).',
  },
];

const faqs = [
  {
    question: 'Warum werden steigende UND fallende Druckpunkte gemessen?',
    answer: 'Durch die Messung in beiden Richtungen wird die Hysterese des Messgeräts ermittelt – also die Differenz zwischen den Messwerten bei steigendem und fallendem Druck am gleichen Prüfpunkt. Die Hysterese ist ein wichtiges Qualitätsmerkmal: Sie zeigt, wie reproduzierbar ein Gerät misst. Hohe Hysterese deutet auf mechanischen Verschleiß hin und kann bedeuten, dass das Gerät ausgetauscht werden muss.',
  },
  {
    question: 'Welche Genauigkeitsklassen gibt es bei Manometern?',
    answer: 'Manometer werden nach DIN EN 837 in Genauigkeitsklassen eingeteilt: Klasse 0,1 und 0,3 (Feinmessmanometer für Labore und Referenzmessungen), Klasse 0,6 (gehobene Industrieanwendungen), Klasse 1,0 und 1,6 (Standard-Industriemanometer) sowie Klasse 2,5 (einfache Überwachungsaufgaben). Die Klasse gibt die zulässige Abweichung in Prozent der Messspanne an.',
  },
  {
    question: 'Was kostet eine Manometer-Kalibrierung?',
    answer: 'Die Kosten hängen von der Genauigkeitsklasse und dem Druckbereich ab. Manometer der Klasse 2,5 starten ab 20,85 € netto, Klasse 1,0/1,6 ab 23,45 €, Feinmessmanometer ab 28,66 € und Präzisionsmanometer (Klasse 0,1/0,3) ab 36,47 €. Drucksensoren und Transmitter ab 46,90 €. Der Mindestauftragswert beträgt 40 € netto. Eine vollständige Preisübersicht finden Sie auf unserer Kalibrierkosten-Seite.',
  },
];

export default function DruckkalibrierungPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Druckkalibrierung' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Druckkalibrierung</span> – Manometer & Druckmessgeräte
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Kalibrierung nach DKD-R 6-1 mit steigenden und fallenden Druckpunkten. Prüfbereiche von Millibar bis 1.200 bar.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
            >
              Kalibrierung anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* Einleitung */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Druckkalibrierung aus eigenem Labor</h2>
            <p className="text-lg text-slate-600 mb-6">
              Die Druckkalibrierung stellt sicher, dass Ihre Manometer, Drucksensoren und Transmitter innerhalb der zulässigen Fehlergrenzen arbeiten. In Industrie, Verfahrenstechnik und Gebäudetechnik sind zuverlässige Druckmessungen unverzichtbar – fehlerhafte Messgeräte können zu Prozessstörungen, Qualitätsmängeln oder Sicherheitsrisiken führen.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              In unserem Kalibrierlabor in Nordhorn prüfen wir Druckmessgeräte aller Genauigkeitsklassen nach der Kalibrierrichtlinie DKD-R 6-1. Jede Kalibrierung umfasst Messungen bei steigendem und fallendem Druck, um neben der Genauigkeit auch die Hysterese des Geräts zu dokumentieren. Informationen zu den empfohlenen{' '}
              <Link href="/kalibrierintervalle" className="text-accent-600 font-semibold hover:underline">Kalibrierintervallen</Link> und den{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten</Link>{' '}
              finden Sie auf unseren Ratgeber-Seiten.
            </p>
          </div>
        </div>
      </section>

      {/* Gerätetypen */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Kalibrierbare Druckmessgeräte</h2>
            <p className="text-xl text-slate-600">Prüfungsrichtlinien, Genauigkeitsklassen und Preise auf einen Blick</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {geraetetypen.map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.norm !== '—' && (
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">{item.norm}</span>
                  )}
                  <span className="text-xs font-medium bg-accent-50 text-accent-700 px-2 py-1 rounded">{item.richtlinie}</span>
                </div>
                <p className="text-sm text-slate-500 mb-3">{item.beispiele}</p>
                <p className="text-sm text-slate-600 mb-4">{item.detail}</p>
                <div className="bg-accent-50 text-accent-700 font-bold px-4 py-2 rounded-lg text-lg inline-block">
                  ab {item.preisAb} € netto
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-slate-600">
              <strong className="text-slate-900">Ihr Druckmessgerät nicht dabei?</strong> Neben den hier aufgeführten Gerätetypen kalibrieren wir auch Differenzdruckmessgeräte, Druckschalter und spezielle Prozessmesstechnik. <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Alle Geräte und Preise nachschlagen →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Prüfverfahren */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So läuft eine Druckkalibrierung ab</h2>
            <p className="text-xl text-slate-600">Vom Wareneingang bis zum Kalibrierschein – vier Schritte im Überblick</p>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Normen und Prüfungsrichtlinien</h2>
            <p className="text-lg text-slate-600 mb-6">
              Unsere Druckkalibrierungen basieren auf anerkannten nationalen und internationalen Richtlinien:
            </p>

            <div className="space-y-6">
              {normen.map((norm) => (
                <div key={norm.name} className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{norm.name}</h3>
                  <p className="text-slate-600">{norm.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                href="/messgeraete-kalibrieren"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Alle Messverfahren
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/laengenkalibrierung"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Längenkalibrierung
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/elektrische-messtechnik-kalibrierung"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Elektrische Kalibrierung
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/drehmoment-kalibrierung"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Drehmomentkalibrierung
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/kalibrierkosten"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Kalibrierkosten nachschlagen
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/kalibrierintervalle"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Kalibrierintervalle
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen zur Druckkalibrierung" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Druckkalibrierung beauftragen</h2>
          <p className="text-xl text-slate-300 mb-8">
            Senden Sie uns Ihre Geräteliste – wir erstellen Ihnen ein transparentes Angebot mit konkreten Preisen und Bearbeitungszeiten.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
          >
            Jetzt Angebot anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
