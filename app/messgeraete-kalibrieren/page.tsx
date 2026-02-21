import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';

export const metadata: Metadata = {
  title: 'Messgeräte kalibrieren | Über 3.200 Gerätetypen | inektra',
  description: 'Kalibrierung elektrischer Messgeräte: Multimeter, Oszilloskope, Stromzangen, Leistungsanalysatoren. Temperatur, Druck, Dimensionsmesstechnik und mehr.',
  keywords: ['multimeter kalibrieren', 'oszilloskop kalibrieren', 'messgeräte kalibrierung', 'elektrische messtechnik', 'temperatur kalibrierung'],
};

const categories = [
  {
    name: 'Elektrische Messtechnik',
    description: 'Multimeter, Oszilloskope, Stromzangen, Leistungsanalysatoren, Widerstandsmessgeräte',
    icon: '⚡',
    count: '1.200+',
  },
  {
    name: 'Temperaturmesstechnik',
    description: 'Thermometer, Thermoelemente, IR-Sensoren, Temperaturregler, Datalogger',
    icon: '🌡️',
    count: '400+',
  },
  {
    name: 'Druckmesstechnik',
    description: 'Manometer, Drucktransmitter, Drucksensoren, Differenzdruckmessgeräte',
    icon: '🔬',
    count: '300+',
  },
  {
    name: 'Dimensionsmesstechnik',
    description: 'Messschieber, Messschrauben, Lehren, Prüfmittel, Längenmessgeräte',
    icon: '📐',
    count: '800+',
  },
  {
    name: 'Waagen & Kraft',
    description: 'Analysenwaagen, Präzisionswaagen, Kraftmessgeräte, Drehmomentschlüssel',
    icon: '⚖️',
    count: '200+',
  },
  {
    name: 'Weitere Messgeräte',
    description: 'Zeit, Frequenz, Optik, Feuchte, Akustik, Chemie, Gas-Analyse',
    icon: '🔧',
    count: '300+',
  },
];

const faqs = [
  {
    question: 'Welche Messgeräte können Sie kalibrieren?',
    answer: 'Wir kalibrieren über 3.200 Gerätetypen: Elektrische Messtechnik (Multimeter, Oszilloskope), Temperatur, Druck, Dimensionsmesstechnik, Waagen und viele mehr. Senden Sie uns Ihre Geräteliste für ein individuelles Angebot.',
  },
  {
    question: 'Kalibrieren Sie auch Spezialgeräte?',
    answer: 'Ja! Unser Portfolio ist umfangreich. Sollte Ihr Gerät nicht standardmäßig dabei sein, kontaktieren Sie uns – wir finden eine Lösung oder vermitteln Sie an spezialisierte Partner.',
  },
  {
    question: 'Wie oft sollte ich kalibrieren lassen?',
    answer: 'Empfohlen wird eine jährliche Kalibrierung. Je nach Nutzungshäufigkeit und Genauigkeitsanforderungen kann das Intervall kürzer (halbjährlich) oder länger (alle 2 Jahre) sein.',
  },
];

export default function MessgeraetePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Über <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">3.200 kalibrierbare</span> Gerätetypen
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Von elektrischer Messtechnik bis Dimensionsmesstechnik – wir kalibrieren Ihre komplette Messausstattung.
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

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Unsere Kategorien</h2>
            <p className="text-xl text-slate-600">Umfassende Kalibrierung für alle Messgerätebereiche</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="p-8 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-accent-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900">{cat.name}</h3>
                  <span className="text-sm font-semibold text-accent-600">{cat.count}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Warum inektra?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">ISO-konforme Kalibrierung</h3>
                <p className="text-slate-600 text-sm">Rückverfolgbare Kalibrierscheine nach anerkannten Normen.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Schnelle Bearbeitung</h3>
                <p className="text-slate-600 text-sm">5-10 Werktage Standard, Express auf Anfrage.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Transparente Preise</h3>
                <p className="text-slate-600 text-sm">Faire Kalkulation, keine versteckten Kosten.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen zu Messgeräte-Kalibrierung" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
