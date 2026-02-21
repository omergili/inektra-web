import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalibrierservice | Professionelle Messgeräte-Kalibrierung',
  description: 'Akkreditierter Kalibrierservice für alle Messgeräte. ISO 9001 zertifiziert, schnelle Bearbeitung, faire Preise. Laborservice und Vor-Ort-Kalibrierung.',
  keywords: ['kalibrierservice', 'kalibrierung dienstleister', 'kalibrierlabor', 'messmittelüberwachung', 'ISO 9001'],
};

export default function KalibrierservicePage() {
  const calibrationTypes = [
    {
      title: 'Druckmessgeräte',
      description: 'Manometer, Drucktransmitter, Druckschalter',
      range: '0-1000 bar',
    },
    {
      title: 'Temperaturmessgeräte',
      description: 'Thermometer, Temperaturfühler, Thermoelemente',
      range: '-200°C bis +1200°C',
    },
    {
      title: 'Elektrische Messgeräte',
      description: 'Multimeter, Strommesszangen, Widerstandsmessgeräte',
      range: 'Nach Herstellerangaben',
    },
    {
      title: 'Waagen & Gewichte',
      description: 'Präzisionswaagen, Prüfgewichte, Kraftmessgeräte',
      range: '0,1g bis 5000kg',
    },
    {
      title: 'Dimensionelle Messtechnik',
      description: 'Messschieber, Mikrometerschrauben, Lehren',
      range: 'Nach DIN EN ISO',
    },
    {
      title: 'Feuchte & Klima',
      description: 'Hygrometer, Klimamessgeräte, Datenlogger',
      range: '0-100% rF',
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Anfrage',
      description: 'Senden Sie uns Ihre Anfrage mit Geräteliste',
    },
    {
      step: '2',
      title: 'Angebot',
      description: 'Sie erhalten ein unverbindliches Angebot',
    },
    {
      step: '3',
      title: 'Einsendung',
      description: 'Senden Sie die Geräte ein oder wir kommen vor Ort',
    },
    {
      step: '4',
      title: 'Kalibrierung',
      description: 'Professionelle Kalibrierung in unserem Labor',
    },
    {
      step: '5',
      title: 'Zertifikat',
      description: 'Sie erhalten ein Kalibrierschein nach ISO 9001',
    },
    {
      step: '6',
      title: 'Rücksendung',
      description: 'Sichere Rücksendung Ihrer kalibrierten Geräte',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professioneller Kalibrierservice
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Akkreditierte Kalibrierung für Industrie, Labor und Handwerk. 
              ISO 9001 zertifiziert mit rückführbaren Normalen.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Jetzt Angebot anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* What We Calibrate */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Was wir kalibrieren
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unser akkreditiertes Labor deckt ein breites Spektrum an Messgrößen ab. 
              Von Druck und Temperatur bis zu elektrischen Messgeräten.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calibrationTypes.map((type) => (
              <div
                key={type.title}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                <div className="text-xs text-blue-600 font-medium">
                  Messbereich: {type.range}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              So läuft die Kalibrierung ab
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ein transparenter Prozess von der Anfrage bis zur zertifizierten Rücksendung.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item) => (
              <div key={item.step} className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Qualität & Zertifizierung
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">ISO 9001:2015 zertifiziert</h3>
                    <p className="text-gray-600">Unser Qualitätsmanagementsystem erfüllt höchste Standards</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Rückführbare Normale</h3>
                    <p className="text-gray-600">Alle Messungen sind auf nationale Normale rückführbar</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Kalibrierscheine</h3>
                    <p className="text-gray-600">Ausführliche Dokumentation nach DIN EN ISO/IEC 17025</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Moderne Messtechnik</h3>
                    <p className="text-gray-600">Hochpräzise Referenzgeräte der neuesten Generation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ihre Vorteile</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Schnelle Bearbeitungszeiten
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Transparente Preisgestaltung
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Persönlicher Ansprechpartner
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Kostenloser Versand ab 500€
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Erinnerung an Rekalibrierung
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Digitale Zertifikatsverwaltung
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit für die Kalibrierung?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Fordern Sie jetzt ein kostenloses Angebot an oder lassen Sie sich beraten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Angebot anfragen
            </Link>
            <Link
              href="/vor-ort-kalibrierung"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Vor-Ort-Service ansehen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
