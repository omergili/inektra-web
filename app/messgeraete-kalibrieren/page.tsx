import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messgeräte kalibrieren | Präzise & Zertifiziert',
  description: 'Professionelle Kalibrierung aller Messgeräte nach ISO-Normen: Druck, Temperatur, elektrische Messtechnik. Schnelle Bearbeitung.',
  keywords: ['messgeräte kalibrieren', 'messmittel kalibrierung', 'kalibrierung messgeräte'],
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
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Messgeräte kalibrieren lassen
            </h1>
            <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
              Von Druck und Temperatur bis zu elektrischen Messgeräten – 
              wir kalibrieren alle gängigen Messgerätetypen präzise und zuverlässig nach ISO-Normen.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-neutral-900 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-100 transition-all shadow-soft-lg"
            >
              Jetzt anfragen
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Welche Messgeräte kalibrieren wir?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Unser Labor deckt ein breites Spektrum an Gerätetypen ab.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deviceCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-soft transition-all"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {category.title}
                </h3>
                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-700 mb-2">Gerätetypen:</p>
                  <ul className="space-y-1">
                    {category.devices.map((device) => (
                      <li key={device} className="text-sm text-neutral-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                        {device}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-1">Typische Anwendung:</p>
                  <p className="text-sm text-neutral-600">{category.applications}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Warum Messgeräte kalibrieren?
              </h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Messgeräte unterliegen natürlichem Verschleiß und Drift. Regelmäßige Kalibrierung 
                  stellt sicher, dass Ihre Messergebnisse präzise und zuverlässig bleiben.
                </p>
                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-neutral-900 mb-3">Vorteile der Kalibrierung:</h3>
                  <ul className="space-y-2">
                    {[
                      'Sicherstellung der Messgenauigkeit',
                      'Rechtssichere Dokumentation',
                      'Vermeidung von Messfehlern',
                      'Qualitätssicherung in der Produktion',
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Kalibrierintervalle</h3>
              <p className="text-neutral-600 mb-6 text-sm">
                Die empfohlenen Kalibrierintervalle hängen von verschiedenen Faktoren ab:
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Standard-Intervalle', desc: '12 Monate für die meisten Messgeräte', color: 'primary' },
                  { title: 'Kritische Anwendungen', desc: '6 Monate bei hoher Messfrequenz', color: 'accent' },
                  { title: 'Selten genutzt', desc: '24 Monate bei geringer Beanspruchung', color: 'neutral' },
                ].map((item) => (
                  <div key={item.title} className={`border-l-4 border-${item.color}-600 pl-4`}>
                    <h4 className="font-semibold text-neutral-900 mb-1 text-sm">{item.title}</h4>
                    <p className="text-xs text-neutral-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-6">
                Wir beraten Sie gerne bei der Festlegung optimaler Kalibrierintervalle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Messgeräte kalibrieren lassen</h2>
          <p className="text-xl text-primary-100 mb-8">
            Fordern Sie jetzt ein kostenloses Angebot für die Kalibrierung Ihrer Messgeräte an.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-all shadow-lg"
          >
            Angebot anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
