import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Temperaturkalibrierung – Thermometer',
  description: 'Temperaturkalibrierung: Thermometer, IR-Thermometer, Pt100-Fühler, Thermoelemente, Hygrometer. Nach DKD-R 5-1. Ab 15,00 € netto.',
  keywords: ['temperaturkalibrierung', 'thermometer kalibrieren', 'temperaturfühler kalibrieren', 'pt100 kalibrierung', 'ir-thermometer kalibrierung', 'hygrometer kalibrierung'],
  alternates: {
    canonical: 'https://inektra.de/temperaturkalibrierung',
  },
  openGraph: {
    title: 'Temperaturkalibrierung – Thermometer | inektra GmbH',
    description: 'Thermometer und Temperaturfühler kalibrieren: Pt100, Thermoelemente, IR-Thermometer, Hygrometer. Nach DKD-R 5-1, Labor in Nordhorn.',
    type: 'article',
  },
};

const geraetetypen = [
  {
    name: 'Thermometer (Flüssigkeit/Bimetall)',
    norm: 'DIN EN 13190',
    richtlinie: 'DKD-R 5-1',
    preisAb: '15,00',
    beispiele: 'Flüssigkeitsglasthermometer, Bimetallthermometer, Stabthermometer, Einschraubthermometer',
    detail: 'Werkskalibrierung an definierten Temperaturpunkten im Kalibrierbad oder Trockenblock-Kalibrator. Messbereiche von -30 °C bis +300 °C je nach Thermometertyp.',
  },
  {
    name: 'IR-Thermometer (Pyrometer)',
    norm: 'VDI/VDE 3511',
    richtlinie: 'DKD-R 5-1',
    preisAb: '45,00',
    beispiele: 'Infrarot-Thermometer, berührungslose Temperaturmessgeräte, Pyrometer für industrielle Anwendungen',
    detail: 'Prüfung gegen Schwarzkörper-Strahler (Hohlraumstrahler) an definierten Temperaturpunkten. Emissionsgrad und Messfleckgröße werden dokumentiert. Messbereiche bis +1200 °C.',
  },
  {
    name: 'Pt100/Pt1000 Temperaturfühler',
    norm: 'DIN EN 60751',
    richtlinie: 'DKD-R 5-1',
    preisAb: '25,00',
    beispiele: 'Pt100-Widerstandsthermometer, Pt1000-Fühler, Einschraubfühler, Einstechfühler, Oberflächenfühler',
    detail: 'Vergleichskalibrierung im Kalibrierbad oder Trockenblock-Kalibrator mit Referenz-Platin-Widerstandsthermometer. Messbereiche von -200 °C bis +600 °C.',
  },
  {
    name: 'Thermoelemente',
    norm: 'DIN EN 60584',
    richtlinie: 'DKD-R 5-1',
    preisAb: '30,00',
    beispiele: 'Thermoelemente Typ K, J, T, N, S, R, B, Mantelthermoelemente, Edelmetall-Thermoelemente',
    detail: 'Werkskalibrierung an definierten Fixpunkten oder im Vergleichsverfahren. Typabhängige Messbereiche von -200 °C bis +1200 °C. Dokumentation der Thermospannung und Abweichung.',
  },
  {
    name: 'Hygrometer & Feuchtemessgeräte',
    norm: '—',
    richtlinie: 'herstellerspez.',
    preisAb: '35,00',
    beispiele: 'Kapazitive Feuchtemessgeräte, Holzfeuchtemessgeräte, Taupunktspiegel, Klimamessgeräte, Psychrometer',
    detail: 'Prüfung der relativen Feuchte und Temperatur an definierten Referenzpunkten. Messbereiche 10 bis 95 % r.F. Holzfeuchtemessgeräte werden an Referenzproben geprüft.',
  },
  {
    name: 'Datenlogger (Temperatur)',
    norm: '—',
    richtlinie: 'DKD-R 5-1',
    preisAb: '40,00',
    beispiele: 'Temperaturdatenlogger, Temperatur-/Feuchtelogger, USB-Datenlogger, Funk-Datenlogger für Transport und Lagerung',
    detail: 'Kalibrierung des integrierten Sensors und der Anzeigeeinheit. Prüfung an definierten Temperaturpunkten im Kalibrierbad. Dokumentation der Messwertabweichung über den gesamten Messbereich.',
  },
];

const pruefschritte = [
  {
    schritt: 'Sichtprüfung & Identifikation',
    text: 'Jedes Temperaturmessgerät wird bei Wareneingang auf äußere Beschädigungen, Korrosion und mechanische Unversehrtheit geprüft. Typenschild, Messbereich, Fühlertyp und Seriennummer werden dokumentiert.',
  },
  {
    schritt: 'Konditionierung & Stabilisierung',
    text: 'Vor der eigentlichen Messung wird das Gerät im Kalibrierbad oder Trockenblock-Kalibrator auf die jeweilige Prüftemperatur gebracht. Ausreichende Verweilzeit stellt das thermische Gleichgewicht zwischen Prüfling und Referenznormal sicher.',
  },
  {
    schritt: 'Vergleichsmessung an Prüfpunkten',
    text: 'An mehreren definierten Temperaturpunkten (z. B. -20 °C, 0 °C, +100 °C, +200 °C) wird der angezeigte Wert des Prüflings mit dem Referenznormal verglichen. Die Abweichung wird an jedem Punkt dokumentiert.',
  },
  {
    schritt: 'Dokumentation & Kalibrierschein',
    text: 'Alle Messwerte, Abweichungen und die berechnete Messunsicherheit werden dokumentiert. Sie erhalten einen rückverfolgbaren Kalibrierschein mit Angabe der verwendeten Referenznormale und der Umgebungsbedingungen.',
  },
];

const normen = [
  {
    name: 'DKD-R 5-1',
    text: 'Die zentrale Kalibrierrichtlinie für Temperaturmessgeräte. Sie beschreibt die Kalibrierung von Berührungsthermometern (Widerstandsthermometer, Thermoelemente, Flüssigkeitsglasthermometer) im Vergleichsverfahren. Definiert Anforderungen an Kalibrierbäder, Referenznormale und die Berechnung der Messunsicherheit.',
  },
  {
    name: 'DIN EN 60751',
    text: 'Die internationale Norm für industrielle Platin-Widerstandsthermometer (Pt100/Pt1000). Legt die Kennlinie, die Toleranzklassen (AA, A, B, C) und die zulässigen Abweichungen fest. Grundlage für die Bewertung der Kalibrierungsergebnisse von Pt100- und Pt1000-Fühlern.',
  },
  {
    name: 'VDI/VDE 3511',
    text: 'Richtlinie für die berührungslose Temperaturmessung mit Infrarot-Thermometern (Pyrometern). Beschreibt Messverfahren, Emissionsgrad-Bestimmung, Einflussgrößen (Abstand, Messfleck, Hintergrundstrahlung) und die Kalibrierung gegen Schwarzkörper-Strahler.',
  },
];

const faqs = [
  {
    question: 'Wie oft sollte ein Thermometer kalibriert werden?',
    answer: 'Für die meisten industriellen Anwendungen wird ein Kalibrierintervall von 12 Monaten empfohlen. Bei sicherheitskritischen Prozessen (Pharma, Lebensmittel, Medizintechnik) können kürzere Intervalle von 6 Monaten sinnvoll sein. Thermoelemente, die hohen Temperaturen ausgesetzt sind, altern schneller und sollten häufiger geprüft werden. Ausführliche Empfehlungen finden Sie in unserem Ratgeber zu Kalibrierintervallen.',
  },
  {
    question: 'Was ist der Unterschied zwischen Vergleichs- und Fixpunktkalibrierung?',
    answer: 'Bei der Vergleichskalibrierung wird der Prüfling zusammen mit einem Referenzthermometer im gleichen Kalibrierbad temperiert und die Abweichung an mehreren Temperaturpunkten gemessen. Bei der Fixpunktkalibrierung werden physikalisch definierte Temperaturpunkte genutzt (z. B. Tripelpunkt des Wassers bei 0,01 °C). Die Vergleichskalibrierung ist das Standardverfahren für Werkskalibrierungen – es ist flexibel, wirtschaftlich und für die meisten industriellen Anforderungen ausreichend genau.',
  },
  {
    question: 'Was kostet eine Temperaturkalibrierung?',
    answer: 'Die Kosten hängen vom Fühlertyp und Messbereich ab. Flüssigkeits- und Bimetallthermometer starten ab 15,00 € netto, Pt100/Pt1000-Fühler ab 25,00 €, Thermoelemente ab 30,00 €, Hygrometer ab 35,00 € und Datenlogger ab 40,00 €. IR-Thermometer kosten ab 45,00 € netto. Der Mindestauftragswert beträgt 40 € netto. Eine vollständige Preisübersicht finden Sie auf unserer Kalibrierkosten-Seite.',
  },
];

export default function TemperaturkalibrierungPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Temperaturkalibrierung' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Temperaturkalibrierung</span> – Thermometer & Temperaturfühler kalibrieren
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Werkskalibrierung nach DKD-R 5-1 für Thermometer, Pt100-Fühler, Thermoelemente und IR-Thermometer. Messbereiche von -200 °C bis +1200 °C.
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
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Temperaturkalibrierung aus eigenem Labor</h2>
            <p className="text-lg text-slate-600 mb-6">
              Die Temperaturkalibrierung stellt sicher, dass Ihre Thermometer, Temperaturfühler und Feuchtemessgeräte innerhalb der zulässigen Fehlergrenzen messen. In Industrie, Lebensmitteltechnik, Pharmazie und Gebäudetechnik sind zuverlässige Temperaturmessungen unverzichtbar – fehlerhafte Messwerte können zu Qualitätsmängeln, Produktionsausfällen oder Verstößen gegen gesetzliche Vorgaben führen.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              In unserem Kalibrierlabor in Nordhorn kalibrieren wir Temperaturmessgeräte aller gängigen Typen: von Flüssigkeitsglasthermometern über Pt100/Pt1000-Widerstandsthermometer und Thermoelemente bis hin zu IR-Thermometern, Hygrometern und Datenloggern. Die Werkskalibrierung erfolgt im Vergleichsverfahren nach DKD-R 5-1 mit rückverfolgbaren Referenznormalen. Informationen zu den empfohlenen{' '}
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Kalibrierbare Temperaturmessgeräte</h2>
            <p className="text-xl text-slate-600">Gerätetypen, Normen und Preise auf einen Blick</p>
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
              <strong className="text-slate-900">Ihr Temperaturmessgerät nicht dabei?</strong> Neben den hier aufgeführten Gerätetypen kalibrieren wir auch Klimaschränke, Wärmebildkameras und Sonderfühler. <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Alle Geräte und Preise nachschlagen →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Prüfverfahren */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So läuft eine Temperaturkalibrierung ab</h2>
            <p className="text-xl text-slate-600">Von der Sichtprüfung bis zum Kalibrierschein – vier Schritte im Überblick</p>
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
              Unsere Temperaturkalibrierungen basieren auf anerkannten nationalen und internationalen Richtlinien:
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
                href="/druckkalibrierung"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Druckkalibrierung
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
      <PageFAQ faqs={faqs} title="Häufige Fragen zur Temperaturkalibrierung" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Temperaturkalibrierung beauftragen</h2>
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
