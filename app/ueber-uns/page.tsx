import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import PageFAQ from '@/components/PageFAQ';

export const metadata: Metadata = {
  title: 'Über uns | Kalibrierlabor in Nordhorn | inektra GmbH',
  description: 'inektra GmbH – Ihr Partner für präzise Werkskalibrierung. Labor in Nordhorn. Über 3.200 kalibrierbare Gerätetypen. Erfahren Sie mehr über uns.',
  keywords: ['kalibrierlabor nordhorn', 'inektra', 'über uns', 'calpro hagels', 'werkskalibrierung'],
};

const faqs = [
  {
    question: 'Wo befindet sich Ihr Labor?',
    answer: 'Unser Kalibrierlabor befindet sich in Nordhorn (Losserstr. 4, 48527 Nordhorn), ehemals Calpro Hagels/Theußing GmbH & Co. KG. Der Firmensitz der inektra GmbH ist in Varel.',
  },
  {
    question: 'Seit wann bieten Sie Kalibrierung an?',
    answer: 'Unser Labor in Nordhorn hat langjährige Erfahrung in der Kalibrierung von Messgeräten. Unter inektra GmbH bieten wir diese Expertise bundesweit an.',
  },
  {
    question: 'Sind Sie akkreditiert?',
    answer: 'Wir bieten Werkskalibrierung nach ISO-Normen an. Werkskalibrierung ist für die meisten industriellen Anwendungen ausreichend und kostengünstiger als akkreditierte Kalibrierung.',
  },
];

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Präzision ist unsere <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Mission</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              inektra GmbH – Ihr zuverlässiger Partner für professionelle Werkskalibrierung
            </p>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Wer wir sind</h2>
              <div className="space-y-4 text-lg text-slate-600">
                <p>
                  Die <strong>inektra GmbH</strong> betreibt ein modernes Kalibrierlabor in Nordhorn (ehemals Calpro Hagels/Theußing GmbH & Co. KG) und bietet professionelle Werkskalibrierung nach ISO-Normen.
                </p>
                <p>
                  Mit über <strong>3.200 kalibrierbaren Gerätetypen</strong> decken wir nahezu alle Bereiche der Messtechnik ab – von elektrischer Messtechnik über Temperatur und Druck bis hin zu Dimensionsmesstechnik und Waagen.
                </p>
                <p>
                  Unser Ziel: <strong>Präzise, schnelle und zuverlässige Kalibrierung</strong> für Industrie, Labor und Qualitätssicherung.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-slate-50 p-8 rounded-xl border border-accent-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Unser Standort</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-accent-700 mb-1">Kalibrierlabor</p>
                  <p className="text-slate-700">
                    Losserstr. 4<br />
                    48527 Nordhorn<br />
                    Deutschland
                  </p>
                  <p className="text-sm text-slate-500 mt-1">(ehemals Calpro Hagels/Theußing GmbH & Co. KG)</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-accent-700 mb-1">Firmensitz</p>
                  <p className="text-slate-700">
                    inektra GmbH<br />
                    Zum Jadebusen 73<br />
                    26316 Varel
                  </p>
                </div>
                <div className="pt-4 border-t border-accent-200">
                  <p className="text-sm font-semibold text-accent-700 mb-2">Kontakt</p>
                  <p className="text-slate-700">
                    📞 {siteConfig.contact.phone}<br />
                    ✉️ {siteConfig.contact.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Unsere Werte</h2>
            <p className="text-xl text-slate-600">Darauf können Sie sich verlassen</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Präzision</h3>
              <p className="text-slate-600">
                Höchste Genauigkeit bei allen Kalibrierungen nach anerkannten ISO-Normen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Zuverlässigkeit</h3>
              <p className="text-slate-600">
                Pünktliche Bearbeitung, transparente Kommunikation, verlässliche Termine.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Service</h3>
              <p className="text-slate-600">
                Persönlicher Ansprechpartner, individuelle Lösungen, schnelle Hilfe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen über uns" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Lernen Sie uns kennen</h2>
          <p className="text-xl text-slate-300 mb-8">
            Kontaktieren Sie uns für eine persönliche Beratung.
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
