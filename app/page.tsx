import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Präzisions-Werkskalibrierung | Über 3.200 Gerätetypen',
  description: 'Professionelle Werkskalibrierung nach ISO-Normen. Über 3.200 kalibrierbare Gerätetypen. Von Dimensionsmesstechnik bis Elektronik – präzise, schnell, deutschlandweit.',
  openGraph: {
    title: 'Präzisions-Werkskalibrierung | inektra GmbH',
    description: 'Werkskalibrierung mit über 3.200 Gerätetypen. Deutschlandweiter Service.',
  },
};

export default function HomePage() {
  const services = [
    {
      title: 'Dimensionsmesstechnik',
      description: 'Messschieber, Bügelmessschrauben, Lehren – höchste Präzision für die Fertigung',
      count: '800+',
      href: '/kalibrierservice',
    },
    {
      title: 'Elektrische Messtechnik',
      description: 'Multimeter, Oszilloskope, Spannungsprüfer – alle führenden Hersteller',
      count: '1.200+',
      href: '/messgeraete-kalibrieren',
    },
    {
      title: 'Temperaturmesstechnik',
      description: 'Thermometer, Infrarot-Sensoren, Thermoelemente – von -200°C bis +1200°C',
      count: '400+',
      href: '/messgeraete-kalibrieren',
    },
    {
      title: 'Druckmesstechnik',
      description: 'Manometer, Drucktransmitter, Sensoren – 0 bis 1000 bar',
      count: '300+',
      href: '/kalibrierservice',
    },
  ];

  const brands = [
    'Digital-Multimeter', 'Oszilloskope', 'Messschieber', 'Bügelmessschrauben',
    'Manometer', 'Thermometer', 'Waagen', 'Prüfgewichte',
  ];

  return (
    <>
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-accent-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-accent-500/40">
              <span className="text-accent-200 text-sm font-medium">✓ Werkskalibrierung nach ISO-Normen</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Präzisions-Werkskalibrierung<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
                für höchste Ansprüche
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-200 mb-10 leading-relaxed">
              Über <span className="text-accent-400 font-semibold">3.200 kalibrierbare Gerätetypen</span> in unserem Kalibrierlabor. 
              Von Dimensionsmesstechnik bis Elektronik – präzise, schnell und deutschlandweit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="group bg-accent-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-accent-600 transition-all shadow-soft-lg hover:shadow-xl hover:scale-105"
              >
                Jetzt Angebot anfragen
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
              Unsere Kernkompetenzen
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Von der Labor-Kalibrierung bis zur Vor-Ort-Prüfung – 
              wir decken das gesamte Spektrum moderner Messtechnik ab.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative bg-white p-8 rounded-2xl border border-neutral-200 hover:border-primary-300 transition-all hover:shadow-soft-lg"
              >
                <div className="absolute top-6 right-6 text-xs font-medium text-neutral-400">
                  {service.count}
                </div>
                
                {/* Outline Icon statt Emoji */}
                <div className="w-14 h-14 mb-4 rounded-xl bg-accent-50 flex items-center justify-center ring-2 ring-accent-200">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="text-primary-600 font-medium text-sm flex items-center">
                  Mehr erfahren
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Device Types Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-sm font-semibold text-neutral-600 uppercase tracking-wider">
              Typische Gerätetypen die wir kalibrieren
            </h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {brands.map((brand) => (
              <div
                key={brand}
                className="text-neutral-400 hover:text-neutral-700 transition-colors font-medium text-lg"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Qualität</span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-6">
                Warum inektra?
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Werkskalibrierung', desc: 'Kalibrierung nach ISO-Normen mit rückführbaren Normalen' },
                  { title: 'Riesiges Portfolio', desc: 'Über 3.200 kalibrierbare Gerätetypen – eines der umfangreichsten in Deutschland' },
                  { title: 'Herstellerunabhängig', desc: 'Alle gängigen Geräte-Hersteller und Fabrikate' },
                  { title: 'Schneller Service', desc: 'Kurze Durchlaufzeiten für minimale Ausfallzeiten' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center font-bold mr-4">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-neutral-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-10 rounded-3xl text-white shadow-soft-lg border-2 border-accent-500/20">
              <div className="inline-flex items-center bg-accent-500/20 rounded-full px-4 py-2 mb-6">
                <span className="text-accent-300 text-sm font-medium">📍 Standort</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{siteConfig.brandName}</h3>
              <p className="text-neutral-400 text-sm mb-4">{siteConfig.contact.address.subtitle}</p>
              <p className="text-neutral-300 mb-8 leading-relaxed">
                Unser Kalibrierlabor in Nordhorn ist mit modernster Messtechnik ausgestattet 
                und bedient Kunden in ganz Deutschland.
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für präzise Werkskalibrierung?</h2>
          <p className="text-xl text-primary-100 mb-10 leading-relaxed">
            Fordern Sie jetzt ein unverbindliches Angebot an oder laden Sie Ihre Messmittelliste hoch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-all shadow-soft-lg hover:shadow-xl"
            >
              Messmittelliste hochladen
            </Link>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
