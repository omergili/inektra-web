import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Messgeräte kalibrieren lassen – Über 3.200 Gerätetypen',
  description: 'Messgeräte kalibrieren lassen: Multimeter, Oszilloskope, Stromzangen, Temperatur-, Druck- und Dimensionsmesstechnik. ISO-konforme Werkskalibrierung. Jetzt Angebot anfordern!',
  keywords: ['messgeräte kalibrieren', 'kalibrierung messgeräte', 'multimeter kalibrieren', 'multimeter kalibrieren lassen', 'oszilloskop kalibrieren', 'messgeräte kalibrierung', 'messmittel kalibrierung', 'prüfmittel kalibrieren', 'elektrische messtechnik', 'temperatur kalibrierung', 'druck kalibrierung', 'messmittelkalibrierung', 'kalibrieren messgeräte'],
  alternates: {
    canonical: 'https://inektra.de/messgeraete-kalibrieren',
  },
  openGraph: {
    title: 'Messgeräte kalibrieren lassen – Über 3.200 Gerätetypen | inektra GmbH',
    description: 'Über 3.200 kalibrierbare Gerätetypen: Elektrische Messtechnik, Temperatur, Druck, Dimensionsmesstechnik und mehr. ISO-konforme Werkskalibrierung mit rückverfolgbarem Kalibrierschein.',
    type: 'website',
  },
};

const categories = [
  {
    name: 'Elektrische Messtechnik',
    description: 'Multimeter, Oszilloskope, Stromzangen, Leistungsanalysatoren, Widerstandsmessgeräte, Netzgeräte, Kalibratoren und Prüfgeräte für Schutzmaßnahmen.',
    details: 'Kalibrierung nach herstellerspezifischen Verfahren. Umfasst Gleichstrom, Wechselstrom, Widerstand und Frequenz in verschiedenen Messbereichen.',
    icon: '⚡',
    count: '1.200+',
    price: 'ab 29,97 €',
  },
  {
    name: 'Temperaturmesstechnik',
    description: 'Thermometer (analog und digital), Thermoelemente, IR-Thermometer, Temperaturregler, Datalogger und Hygrometer.',
    details: 'Prüfung in definierten Temperaturpunkten mit rückverfolgbaren Referenznormalen. Messbereiche je nach Gerätetyp von -40 °C bis +1.200 °C.',
    icon: '🌡️',
    count: '400+',
    price: 'ab 59,94 €',
  },
  {
    name: 'Druckmesstechnik',
    description: 'Manometer, Drucktransmitter, Drucksensoren, Differenzdruckmessgeräte und Reifendruckprüfer.',
    details: 'Kalibrierung nach DKD-R 6-1 mit steigenden und fallenden Druckpunkten. Prüfbereiche von Vakuum bis 1.000 bar je nach Genauigkeitsklasse.',
    icon: '🔬',
    count: '300+',
    price: 'ab 20,85 €',
  },
  {
    name: 'Dimensionsmesstechnik',
    description: 'Messschieber, Messschrauben, Endmaße, Lehrdorne, Messuhren, Feinzeiger und Prüfstifte.',
    details: 'Prüfung nach DKD-R 4-3 und VDI/VDE/DGQ 2618 mit dokumentierten Messpunkten. Genauigkeitsanforderungen nach DIN 862, DIN 863 und DIN EN ISO 3650.',
    icon: '📐',
    count: '800+',
    price: 'ab 3,90 €',
  },
  {
    name: 'Waagen & Kraft',
    description: 'Analysenwaagen, Präzisionswaagen, Industriewaagen, Drehmomentschlüssel und Kraftmessgeräte.',
    details: 'Drehmomentschlüssel-Kalibrierung nach DIN EN ISO 6789 in mehreren Prüfpunkten. Waagenkalibrierung mit zertifizierten Prüfgewichten.',
    icon: '⚖️',
    count: '200+',
    price: 'ab 24,76 €',
  },
  {
    name: 'Weitere Messgeräte',
    description: 'Schallpegelmesser, Shore-Härteprüfer, Feuchtemessgeräte, Zeitmessgeräte und optische Messtechnik.',
    details: 'Spezialkalibrierungen für Akustik, Härte, Feuchte und weitere physikalische Größen nach geltenden Prüfvorschriften.',
    icon: '🔧',
    count: '300+',
    price: 'auf Anfrage',
  },
];

const steps = [
  {
    number: '1',
    title: 'Anfrage & Angebot',
    description: 'Senden Sie uns Ihre Geräteliste per E-Mail oder über unser Kontaktformular. Sie erhalten innerhalb von 24 Stunden ein individuelles Angebot mit allen Preisen und Lieferzeiten.',
  },
  {
    number: '2',
    title: 'Geräte einsenden',
    description: 'Versenden Sie Ihre Messgeräte sicher verpackt an unser Kalibrierlabor in Nordhorn. Die Einsendung erfolgt auf Ihre Kosten – Versandhinweise erhalten Sie mit der Auftragsbestätigung.',
  },
  {
    number: '3',
    title: 'Kalibrierung im Labor',
    description: 'Unsere Techniker prüfen und kalibrieren Ihre Geräte nach ISO-Normen mit rückverfolgbaren Referenznormalen. Jedes Gerät erhält einen detaillierten Kalibrierschein mit allen Messwerten.',
  },
  {
    number: '4',
    title: 'Rücksendung',
    description: 'Nach der Kalibrierung senden wir Ihre Geräte versichert zurück. Der Rückversand beträgt pauschal 15 € netto pro Sendung. Bearbeitungszeit: 5–10 Werktage.',
  },
];

const faqs = [
  {
    question: 'Welche Messgeräte können Sie kalibrieren?',
    answer: 'Wir kalibrieren über 3.200 Gerätetypen aus allen Bereichen der Messtechnik: Elektrische Messgeräte (Multimeter, Oszilloskope, Stromzangen), Temperaturmessgeräte, Druckmessgeräte, Dimensionsmessgeräte (Messschieber, Messschrauben, Endmaße), Waagen und Drehmomentschlüssel. Senden Sie uns Ihre Geräteliste für ein individuelles Angebot.',
  },
  {
    question: 'Was kostet eine Messgeräte-Kalibrierung?',
    answer: 'Die Kosten hängen vom Gerätetyp und Messbereich ab. Beispiele: Manometer ab 20,85 €, Drehmomentschlüssel ab 24,76 €, Multimeter ab 29,97 €, Thermometer ab 59,94 €. Der Mindestauftragswert beträgt 40 € netto. Alle Preise verstehen sich zzgl. MwSt. und Versandkosten. Eine vollständige Preisübersicht finden Sie auf unserer Kalibrierkosten-Seite.',
  },
  {
    question: 'Kalibrieren Sie auch Spezialgeräte?',
    answer: 'Ja! Unser Portfolio umfasst über 3.200 Gerätetypen. Sollte Ihr Messgerät nicht standardmäßig dabei sein, kontaktieren Sie uns – wir finden eine Lösung oder vermitteln Sie an spezialisierte Partner.',
  },
  {
    question: 'Wie oft sollte ich meine Messgeräte kalibrieren lassen?',
    answer: 'Empfohlen wird eine jährliche Kalibrierung. Je nach Nutzungshäufigkeit und Genauigkeitsanforderungen kann das Intervall kürzer (halbjährlich) oder länger (alle 2 Jahre) sein. Ausführliche Empfehlungen nach Gerätetyp finden Sie in unserem Ratgeber zu Kalibrierintervallen.',
  },
  {
    question: 'Welche Normen gelten für die Kalibrierung von Messgeräten?',
    answer: 'Unsere Werkskalibrierung orientiert sich an anerkannten Prüfungsrichtlinien: DKD-R 4-3 für dimensionale Messgeräte, DKD-R 6-1 für Druckmesstechnik, VDI/VDE/DGQ 2618 für verschiedene Messmittel sowie DIN-Normen wie DIN 862 (Messschieber), DIN 863 (Messschrauben) und DIN EN ISO 6789 (Drehmomentschlüssel). Alle Kalibrierungen erfolgen mit rückverfolgbaren Referenznormalen.',
  },
];

export default function MessgeraetePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Messgeräte kalibrieren' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Über <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">3.200 kalibrierbare</span> Gerätetypen
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Von elektrischer Messtechnik bis Dimensionsmesstechnik – wir kalibrieren Ihre komplette Messausstattung nach ISO-Normen.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
            >
              Anfrage starten
            </Link>
          </div>
        </div>
      </section>

      {/* Intro-Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Messgeräte kalibrieren – Qualität sichern, Normen erfüllen</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Die regelmäßige Kalibrierung von Messgeräten ist ein zentraler Baustein der Qualitätssicherung in Industrie und Handwerk. Ob Multimeter, Manometer oder Messschieber – nur kalibrierte Messmittel liefern zuverlässige Ergebnisse und erfüllen die Anforderungen an Rückverfolgbarkeit und Dokumentation. Viele Qualitätsmanagementsysteme fordern den Nachweis regelmäßiger Messmittelkalibrierung als Grundvoraussetzung.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Als Kalibrierlabor in Nordhorn bieten wir Ihnen die Werkskalibrierung für über 3.200 Gerätetypen aus allen Bereichen der Messtechnik. Jedes Gerät erhält einen rückverfolgbaren Kalibrierschein mit allen Messwerten, Abweichungen und Prüfmittelnummern. Informationen zu den{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten</Link> und empfohlenen{' '}
              <Link href="/kalibrierintervalle" className="text-accent-600 font-semibold hover:underline">Kalibrierintervallen</Link>{' '}
              finden Sie auf unseren Ratgeber-Seiten.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Unsere Kategorien</h2>
            <p className="text-xl text-slate-600">Umfassende Kalibrierung für alle Messgerätebereiche</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="relative p-8 rounded-xl bg-white border border-slate-200 hover:border-accent-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Count Badge - oben rechts */}
                <span className="absolute top-4 right-4 px-3 py-1 bg-accent-100 text-accent-700 text-xs font-bold rounded-full">
                  {cat.count}
                </span>

                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 pr-16">{cat.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{cat.description}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{cat.details}</p>
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg">
                  {cat.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-slate-600">
              <strong className="text-slate-900">Tipp:</strong> Detaillierte Informationen zu Prüfverfahren, Normen und Preisen für dimensionale Messtechnik finden Sie auf unserer Seite zur{' '}
              <Link href="/laengenkalibrierung" className="text-accent-600 font-semibold hover:underline">Längenkalibrierung</Link>. Manometer, Drucksensoren und Transmitter behandeln wir ausführlich auf unserer Seite zur{' '}
              <Link href="/druckkalibrierung" className="text-accent-600 font-semibold hover:underline">Druckkalibrierung</Link>. Eine vollständige Preisübersicht aller Gerätetypen bietet unsere{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten-Seite</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So läuft Ihre Kalibrierung ab</h2>
            <p className="text-xl text-slate-600">In vier Schritten zum Kalibrierschein – einfach und transparent</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/kalibrierkosten"
              className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
            >
              Jetzt Geräteliste einsenden
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Warum inektra?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">ISO-konforme Kalibrierung</h3>
                <p className="text-slate-600 text-sm">Rückverfolgbare Kalibrierscheine nach anerkannten Normen wie DKD-R, VDI/VDE/DGQ und DIN-Standards.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Schnelle Bearbeitung</h3>
                <p className="text-slate-600 text-sm">5–10 Werktage Standardbearbeitung, Express-Service auf Anfrage möglich.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Transparente Preise</h3>
                <p className="text-slate-600 text-sm">Faire Kalkulation ab 40 € Mindestauftragswert – keine versteckten Kosten.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen zur Messgeräte-Kalibrierung" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Ihr Messgerät nicht dabei?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Kontaktieren Sie uns – wir finden eine Lösung!
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
          >
            Jetzt anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
