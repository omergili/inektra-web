import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';
import PageFAQ from '@/components/PageFAQ';
import EmailLink from '@/components/EmailLink';

export const metadata: Metadata = {
  title: 'Kontakt – Kalibrierung anfragen',
  description: `Kontaktieren Sie ${siteConfig.brandName} für Werkskalibrierung. Per Telefon, E-Mail oder Kontaktformular. Antwort innerhalb von 24 Stunden. Jetzt unverbindliches Angebot anfordern!`,
  keywords: ['kalibrierung anfragen', 'angebot kalibrierung', 'kontakt kalibrierlabor', 'kalibrierung nordhorn', 'messmittel kalibrieren lassen'],
  alternates: {
    canonical: 'https://inektra.de/kontakt',
  },
};

const faqs = [
  {
    question: 'Wie schnell erhalte ich ein Angebot?',
    answer: 'In der Regel innerhalb von 24 Stunden. Senden Sie uns Ihre Geräteliste per E-Mail, Formular oder laden Sie sie direkt hoch.',
  },
  {
    question: 'Was kostet der Rückversand?',
    answer: 'Rückversand: 15 € netto zzgl. MwSt. Palettenversand nach Aufwand. Versicherter Versand inklusive. Die Einsendung erfolgt auf Ihre Kosten.',
  },
  {
    question: 'Kann ich Geräte persönlich vorbeibringen?',
    answer: 'Nach vorheriger Terminabsprache gerne! Kontaktieren Sie uns telefonisch oder per E-Mail.',
  },
];

export default function KontaktPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20 min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Kontakt <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">aufnehmen</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Wir freuen uns auf Ihre Anfrage. Unser Team berät Sie gerne und erstellt Ihnen ein individuelles Angebot.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Direct Contact */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Direkter Kontakt
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Telefon</h3>
                      <a 
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                        className="text-accent-600 hover:text-accent-700 text-lg font-medium transition-colors"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <p className="text-sm text-slate-600 mt-1">Mo-Fr: 8:00 - 16:30 Uhr</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">E-Mail</h3>
                      <EmailLink
                        email={siteConfig.contact.email}
                        className="text-accent-600 hover:text-accent-700 text-lg font-medium transition-colors break-all cursor-pointer"
                      />
                      <p className="text-sm text-slate-600 mt-1">Antwort innerhalb von 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Adresse</h3>
                      <p className="text-slate-700">
                        {siteConfig.contact.address.street}<br />
                        {siteConfig.contact.address.city}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">{siteConfig.contact.address.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar-Hinweis */}
              <div className="mt-8 bg-gradient-to-br from-accent-50 to-slate-50 p-6 rounded-xl border border-accent-200">
                <h3 className="font-semibold text-slate-900 mb-3">💡 Schnellanfrage</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Nutzen Sie das Kontaktformular rechts, um uns schnell eine Anfrage oder Messmittelliste zu senden.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-slate-700">
                    <svg className="w-5 h-5 text-accent-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Datei-Upload für Messmittellisten
                  </div>
                  <div className="flex items-center text-slate-700">
                    <svg className="w-5 h-5 text-accent-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Antwort innerhalb von 24 Stunden
                  </div>
                  <div className="flex items-center text-slate-700">
                    <svg className="w-5 h-5 text-accent-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unverbindliches Angebot
                  </div>
                </div>
              </div>

              {/* Geschäftszeiten */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Geschäftszeiten</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Montag - Freitag:</span>
                    <span className="font-medium text-slate-900">8:00 - 16:30 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag - Sonntag:</span>
                    <span className="font-medium text-slate-900">Geschlossen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Placeholder */}
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-xl border border-slate-200 h-full flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">
                    Nutzen Sie die Schnellanfrage rechts →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen zum Kontakt" />
    </>
  );
}
