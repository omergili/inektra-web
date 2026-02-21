import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Über uns | Kalibrierlabor in Varel',
  description: `${siteConfig.brandName} – Ihr Partner für professionelle Kalibrierung. ISO 9001 zertifiziert, langjährige Erfahrung, modernes Labor in Varel.`,
  keywords: ['kalibrierlabor varel', 'inektra', 'kalibrierung norddeutschland'],
};

export default function UeberUnsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Über {siteConfig.brandName}
            </h1>
            <p className="text-xl text-blue-100">
              Ihr zuverlässiger Partner für professionelle Messgeräte-Kalibrierung 
              mit modernster Technik und langjähriger Erfahrung.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unser Unternehmen
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Die {siteConfig.brandName} steht für höchste Qualität in der Messtechnik und Kalibrierung. 
                  Als ISO 9001 zertifiziertes Unternehmen bieten wir professionelle Kalibrierdienstleistungen 
                  für Industrie, Labor und Handwerk.
                </p>
                <p>
                  Unser akkreditiertes Kalibrierlabor in Varel (Niedersachsen) ist mit modernster Messtechnik 
                  ausgestattet und ermöglicht präzise Kalibrierungen für ein breites Spektrum an Messgrößen.
                </p>
                <p>
                  Ob Druckmessgeräte, Temperaturmesstechnik oder elektrische Messgeräte – 
                  wir garantieren rückführbare Kalibrierungen nach höchsten Standards.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Unsere Werte</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    Q
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Qualität</h4>
                    <p className="text-sm text-gray-600">Höchste Präzision in jeder Kalibrierung</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    Z
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Zuverlässigkeit</h4>
                    <p className="text-sm text-gray-600">Termintreue und verlässliche Ergebnisse</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Service</h4>
                    <p className="text-sm text-gray-600">Persönliche Beratung und Kundenbetreuung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unsere Kompetenzen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Akkreditiertes Labor',
                description: 'ISO 9001:2015 zertifiziert mit rückführbaren Normalen',
                icon: '🏆',
              },
              {
                title: 'Moderne Messtechnik',
                description: 'Hochpräzise Referenzgeräte der neuesten Generation',
                icon: '🔬',
              },
              {
                title: 'Erfahrenes Team',
                description: 'Qualifizierte Messtechniker mit langjähriger Expertise',
                icon: '👥',
              },
              {
                title: 'Breites Spektrum',
                description: 'Kalibrierung aller gängigen Messgrößen',
                icon: '📊',
              },
              {
                title: 'Schneller Service',
                description: 'Kurze Durchlaufzeiten und flexible Terminplanung',
                icon: '⚡',
              },
              {
                title: 'Deutschlandweit',
                description: 'Mobile Kalibrierung vor Ort bundesweit',
                icon: '🚚',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Standort Varel</h3>
              <p className="text-blue-100 mb-6">
                Unser Kalibrierlabor befindet sich in Varel, Niedersachsen – 
                optimal gelegen für Kunden aus ganz Norddeutschland.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">{siteConfig.contact.address.street}</p>
                    <p>{siteConfig.contact.address.city}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:underline">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Zertifizierungen</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">ISO 9001:2015</h4>
                      <p className="text-sm text-gray-600">
                        Qualitätsmanagementsystem für Kalibrierdienstleistungen
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Registernummer: {siteConfig.legal.register}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Rückführbare Kalibrierung</h4>
                      <p className="text-sm text-gray-600">
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

      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Lernen Sie uns kennen</h2>
          <p className="text-xl text-blue-100 mb-8">
            Kontaktieren Sie uns für ein persönliches Gespräch oder besuchen Sie unser Labor in Varel.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </>
  );
}
