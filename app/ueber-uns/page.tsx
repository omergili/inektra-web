import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Über uns | Kalibrierlabor in Nordhorn',
  description: `${siteConfig.brandName} – Ihr Partner für professionelle Werkskalibrierung. Langjährige Erfahrung, modernes Labor in Nordhorn.`,
  keywords: ['kalibrierlabor nordhorn', 'inektra', 'werkskalibrierung'],
};

export default function UeberUnsPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Über {siteConfig.brandName}
            </h1>
            <p className="text-xl text-neutral-200 leading-relaxed">
              Ihr zuverlässiger Partner für professionelle Werkskalibrierung 
              mit modernster Technik und langjähriger Erfahrung.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Unser Unternehmen</h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Die {siteConfig.brandName} steht für höchste Qualität in der Messtechnik und Kalibrierung. 
                  Wir bieten professionelle Werkskalibrierung für Industrie, Labor und Handwerk.
                </p>
                <p>
                  Unser Kalibrierlabor in Nordhorn ist mit modernster Messtechnik 
                  ausgestattet und ermöglicht präzise Kalibrierungen für ein breites Spektrum an Gerätetypen.
                </p>
                <p>
                  Ob Druckmessgeräte, Temperaturmesstechnik oder elektrische Messgeräte – 
                  wir garantieren rückführbare Kalibrierungen nach ISO-Normen.
                </p>
              </div>
            </div>
            <div className="bg-primary-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Unsere Werte</h3>
              <div className="space-y-4">
                {[
                  { letter: 'Q', title: 'Qualität', desc: 'Höchste Präzision in jeder Kalibrierung' },
                  { letter: 'Z', title: 'Zuverlässigkeit', desc: 'Termintreue und verlässliche Ergebnisse' },
                  { letter: 'S', title: 'Service', desc: 'Persönliche Beratung und Kundenbetreuung' },
                ].map((item) => (
                  <div key={item.letter} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold mr-4">
                      {item.letter}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Unsere Kompetenzen</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Werkskalibrierung',
                description: 'Kalibrierung nach ISO-Normen mit rückführbaren Normalen',
              },
              {
                title: 'Moderne Messtechnik',
                description: 'Hochpräzise Referenzgeräte der neuesten Generation',
              },
              {
                title: 'Erfahrenes Team',
                description: 'Qualifizierte Messtechniker mit langjähriger Expertise',
              },
              {
                title: 'Breites Spektrum',
                description: 'Kalibrierung aller gängigen Gerätetypen',
              },
              {
                title: 'Schneller Service',
                description: 'Kurze Durchlaufzeiten und flexible Terminplanung',
              },
              {
                title: 'Deutschlandweit',
                description: 'Service für Kunden in ganz Deutschland',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">{siteConfig.brandName}</h3>
              <p className="text-neutral-400 text-sm mb-6">{siteConfig.contact.address.subtitle}</p>
              <p className="text-neutral-300 mb-8 text-sm leading-relaxed">
                Unser Kalibrierlabor in Nordhorn (Grafschaft Bentheim) bedient Kunden in ganz Deutschland.
              </p>
              <div className="space-y-3">
                <div className="flex items-start text-sm">
                  <svg className="w-5 h-5 mr-3 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <div>
                    {siteConfig.contact.address.street}<br />
                    {siteConfig.contact.address.city}
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 mr-3 text-accent-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-accent-400 transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 mr-3 text-accent-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent-400 transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Qualität</h3>
              <div className="space-y-4">
                <div className="border border-neutral-200 p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">Werkskalibrierung</h4>
                      <p className="text-sm text-neutral-600">
                        Kalibrierung nach ISO-Normen für höchste Messgenauigkeit
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-neutral-200 p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">Rückführbare Kalibrierung</h4>
                      <p className="text-sm text-neutral-600">
                        Alle Kalibrierungen sind auf nationale Normale rückführbar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Lernen Sie uns kennen</h2>
          <p className="text-xl text-primary-100 mb-8">
            Kontaktieren Sie uns für ein persönliches Gespräch oder besuchen Sie unser Labor in Nordhorn.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-all shadow-lg"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </>
  );
}
