import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';
import PageFAQ from '@/components/PageFAQ';

export const metadata: Metadata = {
  title: 'Kontakt | Kalibrierung anfragen | inektra GmbH',
  description: `Kontaktieren Sie ${siteConfig.brandName} für professionelle Werkskalibrierung. Telefon, E-Mail oder Kontaktformular. Schnelle Antwort garantiert.`,
  keywords: ['kalibrierung anfragen', 'angebot kalibrierung', 'kontakt kalibrierlabor', 'nordhorn'],
};

const faqs = [
  {
    question: 'Wie schnell erhalte ich ein Angebot?',
    answer: 'In der Regel innerhalb von 24 Stunden. Senden Sie uns Ihre Geräteliste per E-Mail, Formular oder laden Sie sie direkt hoch.',
  },
  {
    question: 'Was kostet der Versand?',
    answer: 'Standardversand: 15 € netto zzgl. MwSt. Palettenversand nach Aufwand. Versicherter Versand inklusive.',
  },
  {
    question: 'Kann ich Geräte persönlich vorbeibringen?',
    answer: 'Nach vorheriger Terminabsprache gerne! Kontaktieren Sie uns telefonisch oder per E-Mail.',
  },
];

export default function KontaktPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kontakt aufnehmen
            </h1>
            <p className="text-xl text-neutral-200 leading-relaxed">
              Wir freuen uns auf Ihre Anfrage. Unser Team berät Sie gerne 
              und erstellt Ihnen ein individuelles Angebot.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Direkter Kontakt
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Telefon</h3>
                      <a 
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                        className="text-primary-600 hover:underline text-lg"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <p className="text-sm text-neutral-500 mt-1">Mo-Fr: 8:00 - 16:30 Uhr</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">E-Mail</h3>
                      <a 
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-primary-600 hover:underline text-lg"
                      >
                        {siteConfig.contact.email}
                      </a>
                      <p className="text-sm text-neutral-500 mt-1">Antwort innerhalb von 24 Stunden</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Adresse</h3>
                      <p className="text-neutral-600">
                        {siteConfig.brandName}<br />
                        <span className="text-xs text-neutral-500">{siteConfig.contact.address.subtitle}</span><br />
                        {siteConfig.contact.address.street}<br />
                        {siteConfig.contact.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Schnelle Antwort gewünscht?</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Nutzen Sie das Schnellanfrage-Formular rechts oder rufen Sie uns direkt an. 
                  Wir sind für Sie da!
                </p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="inline-block bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Jetzt anrufen
                </a>
              </div>

              <div className="bg-primary-50 p-6 rounded-xl">
                <h3 className="font-semibold text-neutral-900 mb-3">Anfahrt</h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Unser Kalibrierlabor befindet sich in Nordhorn (Grafschaft Bentheim), 
                  gut erreichbar über die A31.
                </p>
                <p className="text-sm text-neutral-600">
                  <strong>Parkplätze</strong> sind direkt am Gebäude vorhanden.
                </p>
              </div>
            </div>

            {/* Info Box (Formular ist in Sidebar) */}
            <div>
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Anfrage stellen</h2>
                <p className="text-primary-100 mb-6">
                  Nutzen Sie das Schnellanfrage-Formular rechts, um uns Ihre Anfrage 
                  oder Messmittelliste zu senden.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Datei-Upload für Messmittellisten
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Antwort innerhalb von 24 Stunden
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unverbindliches Angebot
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white p-6 rounded-xl border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Geschäftszeiten</h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex justify-between">
                    <span>Montag - Freitag:</span>
                    <span className="font-medium">8:00 - 16:30 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag - Sonntag:</span>
                    <span className="font-medium">Geschlossen</span>
                  </div>
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
