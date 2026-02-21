import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';

export const metadata: Metadata = {
  title: 'Professioneller Kalibrierservice für Industrie & Labor | inektra',
  description: 'Werkskalibrierung nach ISO-Normen. Schnelle Bearbeitung, transparente Preise, über 3.200 Gerätetypen. Labor in Nordhorn.',
  keywords: ['kalibrierservice', 'werkskalibrierung', 'iso kalibrierung', 'kalibrierlabor', 'messgeräte kalibrieren'],
};

const processSteps = [
  { step: 1, title: 'Anfrage', description: 'Senden Sie uns Ihre Geräteliste oder kontaktieren Sie uns telefonisch.' },
  { step: 2, title: 'Angebot', description: 'Sie erhalten ein transparentes, verbindliches Angebot inkl. Bearbeitungszeit.' },
  { step: 3, title: 'Versand', description: 'Senden Sie Ihre Geräte versichert an unser Labor. Versandkosten: 15 € netto zzgl. MwSt. (Palettenversand nach Aufwand).' },
  { step: 4, title: 'Kalibrierung', description: 'Wir kalibrieren nach ISO-Normen und dokumentieren alle Messwerte.' },
  { step: 5, title: 'Rücksendung', description: 'Sie erhalten Ihre Geräte mit rückverfolgbarem Kalibrierschein zurück.' },
];

const benefits = [
  'Schnelle Bearbeitungszeiten',
  'Transparente Preisgestaltung',
  'Persönlicher Ansprechpartner',
  'Erinnerung an Rekalibrierung',
  'Digitale Zertifikatsverwaltung',
];

const faqs = [
  {
    question: 'Was kostet der Kalibrierservice?',
    answer: 'Die Kosten variieren je nach Gerätetyp und Umfang. Wir erstellen Ihnen ein individuelles Angebot basierend auf Ihrer Geräteliste. Versandkosten: 15 € netto zzgl. MwSt. (Palettenversand nach Aufwand).',
  },
  {
    question: 'Wie lange dauert die Kalibrierung?',
    answer: 'Standard-Bearbeitungszeit: 5-10 Werktage ab Eingang. Express-Service auf Anfrage möglich.',
  },
  {
    question: 'Welche Kalibrierscheine erhalte ich?',
    answer: 'Sie erhalten rückverfolgbare Kalibrierscheine mit allen Messwerten, Abweichungen und Prüfmittelnummern. Optional digital verfügbar.',
  },
];

export default function KalibrierservicePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Professioneller <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Kalibrierservice</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Werkskalibrierung nach ISO-Normen. Schnell, präzise, zuverlässig. Labor in Nordhorn.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
            >
              Jetzt Angebot anfordern
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So funktioniert's</h2>
            <p className="text-xl text-slate-600">Einfacher Ablauf in 5 Schritten</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                {item.step < 5 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Qualität & Zertifizierung</h2>
              <p className="text-lg text-slate-600 mb-6">
                Unser Labor in Nordhorn kalibriert nach anerkannten ISO-Normen. Alle Kalibrierungen sind rückverfolglich dokumentiert.
              </p>
              <p className="text-slate-600 mb-4">
                Wir bieten Werkskalibrierung für über 3.200 Gerätetypen aus allen Bereichen der Messtechnik.
              </p>
              <Link
                href="/messgeraete-kalibrieren"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Alle kalibrierbaren Geräte
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Ihre Vorteile</h3>
              <ul className="space-y-4">
                {benefits.map((item) => (
                  <li key={item} className="flex items-center text-slate-700">
                    <svg className="w-6 h-6 text-accent-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen zum Kalibrierservice" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Bereit für professionelle Kalibrierung?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Kontaktieren Sie uns für ein unverbindliches Angebot.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </>
  );
}
