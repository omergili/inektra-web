import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messgeräte kalibrieren | Präzise & Zertifiziert',
  description: 'Professionelle Kalibrierung aller Messgeräte: Druck, Temperatur, elektrische Messtechnik. ISO zertifiziert, schnelle Bearbeitung.',
  keywords: ['messgeräte kalibrieren', 'messmittel kalibrierung', 'kalibrierung messgeräte', 'prüfmittelüberwachung'],
};

export default function MessgeraeteKalibrierenPage() {
  const deviceCategories = [
    {
      title: 'Druckmessgeräte',
      devices: ['Manometer', 'Drucktransmitter', 'Druckschalter', 'Barometer'],
      applications: 'Pneumatik, Hydraulik, Prozessindustrie',
    },
    {
      title: 'Temperaturmessgeräte',
      devices: ['Thermometer', 'Temperaturfühler', 'Thermoelemente', 'Pyrometer'],
      applications: 'Labor, Pharma, Lebensmittelindustrie',
    },
    {
      title: 'Elektrische Messgeräte',
      devices: ['Multimeter', 'Strommesszangen', 'Oszilloskope', 'Widerstandsmessgeräte'],
      applications: 'Elektrotechnik, Elektronikfertigung',
    },
    {
      title: 'Waagen & Kraftmesstechnik',
      devices: ['Präzisionswaagen', 'Analysenwaagen', 'Prüfgewichte', 'Kraftmessgeräte'],
      applications: 'Labor, Qualitätskontrolle, Produktion',
    },
    {
      title: 'Dimensionelle Messtechnik',
      devices: ['Messschieber', 'Mikrometerschrauben', 'Lehren', 'Höhenmessgeräte'],
      applications: 'Metallverarbeitung, Maschinenbau',
    },
    {
      title: 'Feuchte & Klima',
      devices: ['Hygrometer', 'Klimamessgeräte', 'Taupunktmessgeräte', 'Datenlogger'],
      applications: 'Klimatechnik, Lagerhaltung',
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Messgeräte kalibrieren lassen
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Von Druck und Temperatur bis zu elektrischen Messgeräten – 
              wir kalibrieren alle gängigen Messgerätetypen präzise und zuverlässig.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Jetzt anfragen
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welche Messgeräte kalibrieren wir?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unser akkreditiertes Labor deckt ein breites Spektrum an Messgrößen ab.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deviceCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Gerätetypen:</p>
                  <ul className="space-y-1">
                    {category.devices.map((device) => (
                      <li key={device} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        {device}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Typische Anwendung:</p>
                  <p className="text-sm text-gray-600">{category.applications}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Warum Messgeräte kalibrieren?
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Messgeräte unterliegen natürlichem Verschleiß und Drift. Regelmäßige Kalibrierung 
                  stellt sicher, dass Ihre Messergebnisse präzise und zuverlässig bleiben.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Vorteile der Kalibrierung:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Sicherstellung der Messgenauigkeit</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Erfüllung von ISO 9001 Anforderungen</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Rechtssichere Dokumentation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Vermeidung von Messfehlern</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Qualitätssicherung in der Produktion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kalibrierintervalle</h3>
              <p className="text-gray-600 mb-6">
                Die empfohlenen Kalibrierintervalle hängen von verschiedenen Faktoren ab:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Standard-Intervalle</h4>
                  <p className="text-sm text-gray-600">12 Monate für die meisten Messgeräte</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Kritische Anwendungen</h4>
                  <p className="text-sm text-gray-600">6 Monate bei hoher Messfrequenz</p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Selten genutzt</h4>
                  <p className="text-sm text-gray-600">24 Monate bei geringer Beanspruchung</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Wir beraten Sie gerne bei der Festlegung optimaler Kalibrierintervalle für Ihre Messgeräte.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Messgeräte kalibrieren lassen</h2>
          <p className="text-xl text-blue-100 mb-8">
            Fordern Sie jetzt ein kostenloses Angebot für die Kalibrierung Ihrer Messgeräte an.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Angebot anfragen
            </Link>
            <Link
              href="/kalibrierservice"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Mehr zum Service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
