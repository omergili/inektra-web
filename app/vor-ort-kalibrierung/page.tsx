import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vor-Ort-Kalibrierung | Mobiler Kalibrierservice',
  description: 'Mobile Kalibrierung deutschlandweit. Ihre Messgeräte werden direkt vor Ort kalibriert – keine Ausfallzeiten, schneller Service.',
  keywords: ['vor ort kalibrierung', 'mobile kalibrierung', 'kalibrierung vor ort', 'mobiler kalibrierservice'],
};

export default function VorOrtKalibrierungPage() {
  const advantages = [
    {
      title: 'Keine Ausfallzeiten',
      description: 'Geräte bleiben in Ihrer Produktion – wir kommen zu Ihnen',
      icon: '⏱️',
    },
    {
      title: 'Zeitersparnis',
      description: 'Kein aufwändiges Verpacken und Versenden',
      icon: '📦',
    },
    {
      title: 'Deutschlandweit',
      description: 'Bundesweiter Service mit kurzen Anfahrtszeiten',
      icon: '🇩🇪',
    },
    {
      title: 'Sofort einsatzbereit',
      description: 'Kalibrierung erfolgt direkt – Geräte sind sofort nutzbar',
      icon: '✓',
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mobile Kalibrierung vor Ort
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Wir kommen zu Ihnen! Professionelle Kalibrierung direkt in Ihrem Betrieb 
              – deutschlandweit, schnell und ohne Ausfallzeiten.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Termin anfragen
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ihre Vorteile der Vor-Ort-Kalibrierung
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unsere mobile Kalibrierung bringt das Labor zu Ihnen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item) => (
              <div key={item.title} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Für welche Geräte geeignet?
              </h2>
              <p className="text-gray-600 mb-6">
                Die mobile Kalibrierung eignet sich besonders für:
              </p>
              <ul className="space-y-3">
                {[
                  'Großgeräte und schwere Messeinrichtungen',
                  'Fest installierte Messtechnik',
                  'Produktionsanlagen mit integrierter Messtechnik',
                  'Mehrere Geräte an einem Standort',
                  'Zeitkritische Kalibrierungen',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ablauf Vor-Ort-Kalibrierung
              </h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Terminvereinbarung', desc: 'Wir planen den Termin nach Ihren Wünschen' },
                  { step: '2', title: 'Anreise', desc: 'Unser Servicetechniker kommt mit mobiler Ausrüstung' },
                  { step: '3', title: 'Kalibrierung', desc: 'Präzise Kalibrierung direkt vor Ort' },
                  { step: '4', title: 'Dokumentation', desc: 'Kalibrierschein wird sofort ausgestellt' },
                  { step: '5', title: 'Abschluss', desc: 'Geräte sind sofort wieder einsatzbereit' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Servicegebiete</h2>
            <p className="text-gray-300 mb-6">
              Unser mobiler Kalibrierservice ist deutschlandweit verfügbar. 
              Von unserem Standort in Varel (Niedersachsen) erreichen wir alle Regionen schnell und zuverlässig.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Norddeutschland</h3>
                <p className="text-gray-400">Bremen, Hamburg, Oldenburg, Hannover</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Bundesweit</h3>
                <p className="text-gray-400">Auf Anfrage deutschlandweit verfügbar</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Anfahrtszeit</h3>
                <p className="text-gray-400">Innerhalb 24-48 Stunden</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Termin für Vor-Ort-Kalibrierung anfragen</h2>
          <p className="text-xl text-blue-100 mb-8">
            Kontaktieren Sie uns für ein unverbindliches Angebot und Terminvorschlag.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Jetzt Termin anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
