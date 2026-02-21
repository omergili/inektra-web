import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professionelle Messgeräte-Kalibrierung | Schnell & Präzise',
  description: 'Zertifizierte Kalibrierung für Industrie & Labor. Vor-Ort-Service deutschlandweit. ISO 9001. Schnelle Bearbeitung, faire Preise.',
  openGraph: {
    title: 'Professionelle Messgeräte-Kalibrierung | Schnell & Präzise',
    description: 'Zertifizierte Kalibrierung für Industrie & Labor. Vor-Ort-Service deutschlandweit.',
  },
};

export default function HomePage() {
  const services = [
    {
      title: 'Kalibrierservice',
      description: 'Professionelle Kalibrierung aller Messgeräte in unserem akkreditierten Labor.',
      icon: '🔬',
      href: '/kalibrierservice',
    },
    {
      title: 'Messgeräte kalibrieren',
      description: 'Druck, Temperatur, elektrische Messgeräte und mehr – präzise und zuverlässig.',
      icon: '📊',
      href: '/messgeraete-kalibrieren',
    },
    {
      title: 'Vor-Ort-Service',
      description: 'Mobile Kalibrierung direkt bei Ihnen vor Ort deutschlandweit.',
      icon: '🚚',
      href: '/vor-ort-kalibrierung',
    },
  ];

  const features = [
    { title: 'ISO 9001 zertifiziert', icon: '✓' },
    { title: 'Schnelle Bearbeitung', icon: '⚡' },
    { title: 'Deutschlandweit', icon: '🇩🇪' },
    { title: 'Faire Preise', icon: '💰' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Präzise Kalibrierung für Industrie & Labor
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Professionelle Messgeräte-Kalibrierung mit ISO 9001 Zertifizierung. 
              Schnell, zuverlässig und deutschlandweit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Jetzt Angebot anfragen
              </Link>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="text-sm font-medium text-gray-900">{feature.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Von der Labor-Kalibrierung bis zum mobilen Service vor Ort – 
              wir bieten die passende Lösung für Ihre Anforderungen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-blue-600 font-medium flex items-center">
                  Mehr erfahren
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Warum {siteConfig.brandName}?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Akkreditiertes Labor</h3>
                    <p className="text-gray-600">ISO 9001 zertifiziert mit modernster Messtechnik</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Schnelle Bearbeitung</h3>
                    <p className="text-gray-600">Kurze Durchlaufzeiten für minimale Ausfallzeiten</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Vor-Ort-Service</h3>
                    <p className="text-gray-600">Mobile Kalibrierung bundesweit verfügbar</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Faire Preise</h3>
                    <p className="text-gray-600">Transparente Kostenstruktur ohne versteckte Gebühren</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Standort Varel</h3>
              <p className="text-gray-600 mb-6">
                Von unserem Standort in Varel (Norddeutschland) aus bedienen wir Kunden in ganz Deutschland. 
                Unser modernes Kalibrierlabor ist ausgestattet mit neuester Messtechnik.
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.city}
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {siteConfig.contact.email}
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.contact.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit für präzise Kalibrierung?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Fordern Sie jetzt ein unverbindliches Angebot an oder rufen Sie uns direkt an.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Angebot anfragen
            </Link>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
