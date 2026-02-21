import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalibrierservice | Professionelle Werkskalibrierung',
  description: 'Werkskalibrierung für alle Messgeräte nach ISO-Normen. Schnelle Bearbeitung, faire Preise. Laborservice deutschlandweit.',
  keywords: ['kalibrierservice', 'werkskalibrierung', 'kalibrierlabor', 'messmittelüberwachung'],
};

export default function KalibrierservicePage() {
  const calibrationTypes = [
    { title: 'Druckmessgeräte', description: 'Manometer, Drucktransmitter, Druckschalter', range: '0-1000 bar' },
    { title: 'Temperaturmessgeräte', description: 'Thermometer, Temperaturfühler, Thermoelemente', range: '-200°C bis +1200°C' },
    { title: 'Elektrische Messgeräte', description: 'Multimeter, Strommesszangen, Widerstandsmessgeräte', range: 'Nach Herstellerangaben' },
    { title: 'Waagen & Gewichte', description: 'Präzisionswaagen, Prüfgewichte, Kraftmessgeräte', range: '0,1g bis 5000kg' },
    { title: 'Dimensionelle Messtechnik', description: 'Messschieber, Mikrometerschrauben, Lehren', range: 'Nach ISO-Normen' },
    { title: 'Feuchte & Klima', description: 'Hygrometer, Klimamessgeräte, Datenlogger', range: '0-100% rF' },
  ];

  const process = [
    { step: '1', title: 'Anfrage', description: 'Senden Sie uns Ihre Anfrage mit Geräteliste' },
    { step: '2', title: 'Angebot', description: 'Sie erhalten ein unverbindliches Angebot' },
    { step: '3', title: 'Einsendung', description: 'Senden Sie die Geräte ein' },
    { step: '4', title: 'Kalibrierung', description: 'Professionelle Werkskalibrierung in unserem Labor' },
    { step: '5', title: 'Kalibrierschein', description: 'Sie erhalten einen Kalibrierschein nach ISO-Normen' },
    { step: '6', title: 'Rücksendung', description: 'Sichere Rücksendung Ihrer kalibrierten Geräte' },
  ];

  return (
    <>
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professioneller Kalibrierservice
            </h1>
            <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
              Werkskalibrierung für Industrie, Labor und Handwerk nach ISO-Normen. 
              Mit rückführbaren Normalen für höchste Präzision.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-neutral-900 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-100 transition-all shadow-soft-lg"
            >
              Jetzt Angebot anfragen
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Was wir kalibrieren</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Unser Labor deckt ein breites Spektrum an Gerätetypen ab.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calibrationTypes.map((type) => (
              <div key={type.title} className="bg-white p-6 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-soft transition-all">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{type.title}</h3>
                <p className="text-neutral-600 text-sm mb-3">{type.description}</p>
                <div className="text-xs text-primary-600 font-medium">Messbereich: {type.range}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">So läuft die Kalibrierung ab</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item) => (
              <div key={item.step} className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Qualität & Zertifizierung</h2>
              <div className="space-y-4">
                {[
                  { title: 'Werkskalibrierung', desc: 'Kalibrierung nach ISO-Normen' },
                  { title: 'Rückführbare Normale', desc: 'Alle Messungen sind auf nationale Normale rückführbar' },
                  { title: 'Kalibrierscheine', desc: 'Ausführliche Dokumentation' },
                  { title: 'Moderne Messtechnik', desc: 'Hochpräzise Referenzgeräte der neuesten Generation' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-neutral-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Ihre Vorteile</h3>
              <ul className="space-y-3">
                {['Schnelle Bearbeitungszeiten', 'Transparente Preisgestaltung', 'Persönlicher Ansprechpartner', 'Kostenloser Versand ab 500€', 'Erinnerung an Rekalibrierung', 'Digitale Zertifikatsverwaltung'].map((item) => (
                  <li key={item} className="flex items-center text-neutral-700">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit für die Kalibrierung?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Fordern Sie jetzt ein kostenloses Angebot an oder lassen Sie sich beraten.
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
