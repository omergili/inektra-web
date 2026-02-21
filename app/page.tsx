import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Präzise Werkskalibrierung für Industrie & Labor | inektra GmbH',
  description: 'Professionelle Werkskalibrierung nach ISO-Normen. Über 3.200 kalibrierbare Gerätetypen. Labor in Nordhorn. Schnell, präzise, zuverlässig.',
  keywords: ['werkskalibrierung', 'messgeräte kalibrieren', 'kalibrierlabor', 'iso kalibrierung', 'nordhorn', 'inektra'],
  openGraph: {
    title: 'Präzise Werkskalibrierung | inektra GmbH',
    description: 'Professionelle Werkskalibrierung nach ISO-Normen. Über 3.200 kalibrierbare Gerätetypen.',
    url: siteConfig.siteUrl,
    type: 'website',
    locale: 'de_DE',
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Präzise <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Werkskalibrierung</span> für Ihre Messgeräte
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Professionelle Kalibrierung nach ISO-Normen. Über 3.200 kalibrierbare Gerätetypen. Labor in Nordhorn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/kontakt" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-accent-500 rounded-xl hover:bg-accent-600 transition-all duration-200 shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50"
              >
                Jetzt Angebot anfordern
              </Link>
              <Link 
                href="/kalibrierservice" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 backdrop-blur transition-all duration-200"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">ISO-konforme Kalibrierung</h3>
              <p className="text-slate-600">Werkskalibrierung nach anerkannten ISO-Normen mit rückverfolgbaren Kalibrierscheinen.</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Schnelle Bearbeitung</h3>
              <p className="text-slate-600">Kurze Durchlaufzeiten und flexible Terminvereinbarung nach Ihren Anforderungen.</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Über 3.200 Gerätetypen</h3>
              <p className="text-slate-600">Umfangreiches Portfolio von elektrischer Messtechnik bis Dimensionsmesstechnik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Unsere Leistungen</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professionelle Werkskalibrierung für Industrie, Labor und Qualitätssicherung
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/messgeraete-kalibrieren" className="group block p-8 rounded-xl bg-white border border-slate-200 hover:border-accent-300 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent-600 transition-colors">Messgeräte-Kalibrierung</h3>
              <p className="text-slate-600 mb-4">
                Kalibrierung elektrischer Messgeräte: Multimeter, Oszilloskope, Stromzangen, Leistungsanalysatoren und mehr.
              </p>
              <span className="inline-flex items-center text-accent-600 font-semibold group-hover:translate-x-2 transition-transform">
                Mehr erfahren
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            <Link href="/kalibrierservice" className="group block p-8 rounded-xl bg-white border border-slate-200 hover:border-accent-300 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent-600 transition-colors">Vollservice-Kalibrierung</h3>
              <p className="text-slate-600 mb-4">
                Von Temperatur über Druck bis Dimensionsmesstechnik – wir kalibrieren Ihre komplette Messausstattung.
              </p>
              <span className="inline-flex items-center text-accent-600 font-semibold group-hover:translate-x-2 transition-transform">
                Alle Services
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Bereit für präzise Kalibrierung?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Kontaktieren Sie uns für ein unverbindliches Angebot. Wir beraten Sie gerne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/kontakt" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
            >
              Jetzt Kontakt aufnehmen
            </Link>
            <a 
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-white/20 rounded-xl hover:bg-white/10 backdrop-blur transition-all"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
