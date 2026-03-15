import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Drehmomentkalibrierung – Schlüssel',
  description: 'Drehmomentschlüssel kalibrieren nach DIN EN ISO 6789. Rechts-/Linksauslösung, elektronische Schlüssel. Labor in Nordhorn. Ab 24,76 €.',
  keywords: ['drehmomentkalibrierung', 'drehmomentschlüssel kalibrieren', 'drehmomentschlüssel kalibrieren lassen', 'drehmomentschlüssel kalibrierung kosten', 'drehmoment kalibrierung', 'drehmomentschlüssel prüfen'],
  alternates: {
    canonical: 'https://inektra.de/drehmoment-kalibrierung',
  },
  openGraph: {
    title: 'Drehmomentkalibrierung – Schlüssel | inektra GmbH',
    description: 'Drehmomentschlüssel und Prüfgeräte kalibrieren: Rechts-/Linksauslösung, elektronisch. Prüfung nach DIN EN ISO 6789, Labor in Nordhorn.',
    type: 'article',
  },
};

const geraetetypen = [
  {
    name: 'Drehmomentschlüssel (rechtsauslösend)',
    norm: 'DIN EN ISO 6789',
    richtlinie: 'Typ I/II, Klasse A–E',
    preisAb: '24,76',
    beispiele: 'Klick-Drehmomentschlüssel, Knick-Schlüssel, einstellbare und voreingestellte Drehmomentschlüssel',
    detail: 'Rechtsauslösend, 5 Prüfpunkte bei 20/60/100 % des Messbereichs. Messbereiche von 2 bis 1.000 Nm. Feinmoment-Schlüssel (≤ 5 Nm) ab 32,56 €.',
  },
  {
    name: 'Drehmomentschlüssel (rechts- u. linksauslösend)',
    norm: 'DIN EN ISO 6789',
    richtlinie: 'Typ I/II',
    preisAb: '32,56',
    beispiele: 'Bidirektionale Schlüssel für Montage und Demontage, Schlüssel mit Umschaltknarre',
    detail: 'Prüfung in beide Drehrichtungen. 5 Prüfpunkte je Richtung = 10 Messpunkte gesamt. Messbereiche bis 1.000 Nm.',
  },
  {
    name: 'Elektronische Drehmomentschlüssel',
    norm: 'DIN EN ISO 6789',
    richtlinie: 'Typ II',
    preisAb: '52,12',
    beispiele: 'Digitale Drehmomentschlüssel mit Display, Drehmomentschlüssel mit Datenlogger, Funkschlüssel',
    detail: 'Elektronische Auslösung mit digitaler Anzeige. Höhere Genauigkeit als mechanische Schlüssel. Messbereiche von 5 bis 1.000 Nm.',
  },
  {
    name: 'Drehmomentprüfgeräte (rechtsauslösend)',
    norm: 'DIN EN ISO 6789',
    richtlinie: '—',
    preisAb: '110,74',
    beispiele: 'Drehmoment-Prüfstände, Referenz-Messaufnehmer, Drehmomentmesszellen',
    detail: 'Prüfung der Kalibriereinrichtung selbst. Rückverfolgbarkeit auf nationale Normale. Messbereiche bis 1.000 Nm.',
  },
  {
    name: 'Drehmomentprüfgeräte (bidirektional)',
    norm: 'DIN EN ISO 6789',
    richtlinie: '—',
    preisAb: '179,82',
    beispiele: 'Bidirektionale Prüfstände, Referenzmesseinrichtungen für Rechts- und Linksanzug',
    detail: 'Prüfung in beiden Drehrichtungen. Für Kalibrierlabore und Qualitätssicherung. Messbereiche bis 1.000 Nm.',
  },
  {
    name: 'Drehmomentschrauber',
    norm: '—',
    richtlinie: 'herstellerspez.',
    preisAb: '72,96',
    beispiele: 'Elektrische Drehmomentschrauber, pneumatische Schrauber, Akkuschrauber mit Drehmomentbegrenzung',
    detail: 'Kalibrierung nach Herstellervorgaben. Dokumentierte Sollwertprüfung an definierten Messpunkten.',
  },
];

const pruefschritte = [
  {
    schritt: 'Sichtprüfung & Identifikation',
    text: 'Jeder Drehmomentschlüssel wird bei Wareneingang auf äußere Beschädigungen, Korrosion und mechanische Funktion geprüft. Typenschild, Nennmoment und Seriennummer werden dokumentiert.',
  },
  {
    schritt: 'Konditionierung (Vorlast)',
    text: 'Vor der eigentlichen Messung werden 5 Vorlastzyklen auf Nennmoment durchgeführt. Dies dient der thermischen Stabilisierung und stellt sicher, dass der Schlüssel unter realistischen Bedingungen geprüft wird.',
  },
  {
    schritt: 'Prüfung in definierten Messpunkten',
    text: '5 Messpunkte bei 20, 60 und 100 % des Messbereichsendwerts – an jedem Punkt werden 5 Messwerte aufgenommen. Aus den Ergebnissen werden Abweichung und Wiederholpräzision berechnet.',
  },
  {
    schritt: 'Dokumentation & Kalibrierschein',
    text: 'Alle Messwerte, Abweichungen und die berechnete Messunsicherheit werden dokumentiert. Sie erhalten einen rückverfolgbaren Kalibrierschein mit Angabe der Referenznormale und Umgebungsbedingungen.',
  },
];

const normen = [
  {
    name: 'DIN EN ISO 6789 (Teil 1 + 2)',
    text: 'Die zentrale Norm für Drehmoment-Schraubwerkzeuge. Teil 1 definiert Anforderungen und Prüfverfahren für handbetätigte Drehmomentwerkzeuge, Teil 2 beschreibt die Kalibrierung. Unterscheidet Typ I (anzeigend) und Typ II (auslösend) sowie die Genauigkeitsklassen A bis E.',
  },
  {
    name: 'VDI/VDE 2645 Blatt 2',
    text: 'Richtlinie für die rückverfolgbare Kalibrierung von Drehmoment-Messeinrichtungen. Beschreibt Messverfahren, Anforderungen an Referenznormale und die Berechnung der Messunsicherheit bei statischer Drehmomentmessung.',
  },
  {
    name: 'DIN 51309',
    text: 'Norm für die Kalibrierung von Drehmoment-Messgeräten. Definiert statische Kalibrierverfahren für Drehmomentaufnehmer und Referenzmesseinrichtungen. Ergänzt DIN EN ISO 6789 um Anforderungen an höherwertige Kalibriereinrichtungen.',
  },
];

const faqs = [
  {
    question: 'Wie oft muss ein Drehmomentschlüssel kalibriert werden?',
    answer: 'Die DIN EN ISO 6789 empfiehlt eine Kalibrierung alle 12 Monate oder nach 5.000 Betätigungen – je nachdem, was zuerst eintritt. Bei sicherheitskritischen Verschraubungen (Automotive, Luftfahrt, Medizintechnik) können kürzere Intervalle sinnvoll sein. Ausführliche Empfehlungen finden Sie in unserem Ratgeber zu Kalibrierintervallen.',
  },
  {
    question: 'Was wird bei einer Drehmomentschlüssel-Kalibrierung geprüft?',
    answer: 'Nach 5 Vorlastzyklen auf Nennmoment werden 5 Messpunkte bei 20, 60 und 100 % des Messbereichsendwerts geprüft. An jedem Punkt werden 5 Messwerte aufgenommen. Aus den Ergebnissen werden die Abweichung vom Sollwert, die Wiederholpräzision und die Messunsicherheit berechnet – alles dokumentiert im Kalibrierschein.',
  },
  {
    question: 'Was kostet eine Drehmomentschlüssel-Kalibrierung?',
    answer: 'Die Kosten hängen vom Schlüsseltyp und Messbereich ab. Rechtsauslösende Drehmomentschlüssel starten ab 24,76 € netto, bidirektionale ab 32,56 €, elektronische ab 52,12 €. Drehmomentprüfgeräte kosten ab 110,74 € (rechts) bis 280,15 € (bidirektional). Der Mindestauftragswert beträgt 40 € netto. Eine vollständige Preisübersicht finden Sie auf unserer Kalibrierkosten-Seite.',
  },
];

export default function DrehmomentkalibrierungPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Drehmomentkalibrierung' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Drehmomentkalibrierung</span> – Drehmomentschlüssel & Prüfgeräte
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Kalibrierung nach DIN EN ISO 6789 mit 5 Vorlastzyklen und definierten Messpunkten. Messbereiche von 2 bis 1.000 Nm.
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
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Drehmomentkalibrierung aus eigenem Labor</h2>
            <p className="text-lg text-slate-600 mb-6">
              Wer Drehmomentschlüssel kalibrieren lassen möchte, sorgt für sichere und normgerechte Verschraubungen in Produktion, Instandhaltung und Qualitätssicherung. Ein falsch eingestellter oder verschlissener Drehmomentschlüssel kann zu Unter- oder Überanzug führen – mit Folgen von gelösten Schraubverbindungen bis hin zu Materialschäden. Die regelmäßige Kalibrierung nach DIN EN ISO 6789 stellt sicher, dass Ihre Werkzeuge innerhalb der zulässigen Abweichungsgrenzen arbeiten.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              In unserem Kalibrierlabor in Nordhorn prüfen wir Drehmomentschlüssel, Drehmomentschrauber und Drehmomentprüfgeräte nach dem genormten Verfahren mit Vorlastzyklen und definierten Messpunkten. Die DIN EN ISO 6789 empfiehlt eine Kalibrierung alle 12 Monate oder nach 5.000 Betätigungen. Informationen zu den empfohlenen{' '}
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Kalibrierbare Drehmomentwerkzeuge</h2>
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
              <strong className="text-slate-900">Ihr Drehmomentwerkzeug nicht dabei?</strong> Neben den hier aufgeführten Gerätetypen kalibrieren wir auch Drehmomentmultiplikatoren, Drehwinkelmessgeräte und Sonderwerkzeuge. <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Alle Geräte und Preise nachschlagen →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Prüfverfahren */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So läuft eine Drehmomentkalibrierung ab</h2>
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
              Unsere Drehmomentkalibrierungen basieren auf anerkannten nationalen und internationalen Normen:
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
      <PageFAQ faqs={faqs} title="Häufige Fragen zur Drehmomentkalibrierung" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Drehmomentkalibrierung beauftragen</h2>
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
