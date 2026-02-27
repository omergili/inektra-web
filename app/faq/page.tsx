import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Häufige Fragen zur Kalibrierung (FAQ)',
  description: 'Antworten auf häufige Fragen zur Werkskalibrierung: Was kostet eine Kalibrierung? Wie lange dauert es? Welche Normen gelten? Alles zu Ablauf, Kosten und ISO-Standards.',
  keywords: ['kalibrierung faq', 'kalibrierung kosten', 'kalibrierung dauer', 'was kostet kalibrierung', 'iso kalibrierung', 'werkskalibrierung ablauf'],
  alternates: {
    canonical: 'https://kalibrierservice.com/faq',
  },
  openGraph: {
    title: 'Häufige Fragen zur Kalibrierung (FAQ) | inektra GmbH',
    description: 'Antworten auf häufige Fragen zur Werkskalibrierung: Kosten, Dauer, Ablauf und ISO-Normen.',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Was kostet eine Kalibrierung?',
    answer: 'Die Kosten variieren je nach Gerätetyp und Umfang der Kalibrierung. Für ein individuelles Angebot kontaktieren Sie uns bitte mit Ihrer Geräteliste. Wir erstellen Ihnen ein transparentes, verbindliches Angebot. Rückversand: 15 € netto zzgl. MwSt.',
  },
  {
    question: 'Wie lange dauert eine Kalibrierung?',
    answer: 'Die Bearbeitungszeit beträgt in der Regel 5-10 Werktage ab Eingang Ihrer Geräte. Express-Service ist auf Anfrage möglich. Sie erhalten einen Kalibrierschein mit allen Messergebnissen.',
  },
  {
    question: 'Welche Geräte können Sie kalibrieren?',
    answer: 'Unser Portfolio umfasst über 3.200 kalibrierbare Gerätetypen: Elektrische Messtechnik (Multimeter, Oszilloskope, Stromzangen), Temperaturmesstechnik, Druckmesstechnik, Dimensionsmesstechnik (Messschieber, Messschrauben), Waagen und viele mehr.',
  },
  {
    question: 'Was ist der Unterschied zwischen Werkskalibrierung und akkreditierter Kalibrierung?',
    answer: 'Werkskalibrierung ist eine Kalibrierung nach ISO-Normen ohne offizielle Akkreditierung. Sie ist kostengünstiger und für viele industrielle Anwendungen ausreichend. Akkreditierte Kalibrierung ist formal anerkannt und wird von unabhängigen Stellen zertifiziert – meist nur für spezielle Anforderungen nötig.',
  },
  {
    question: 'Bekomme ich ein Kalibrierschein-Zertifikat?',
    answer: 'Ja, jedes kalibrierte Gerät erhält einen rückverfolgbaren Kalibrierschein mit allen Messwerten, Abweichungen und Prüfmittelnummern. Optional auch digital verfügbar.',
  },
  {
    question: 'Wie läuft der Kalibrierungsprozess ab?',
    answer: '1. Anfrage & Angebot: Senden Sie uns Ihre Geräteliste. 2. Versand: Senden Sie Ihre Geräte an unser Labor in Nordhorn. 3. Kalibrierung: Wir prüfen und kalibrieren nach ISO-Normen. 4. Rücksendung: Sie erhalten Ihre Geräte mit Kalibrierschein zurück.',
  },
  {
    question: 'Wie oft sollte ich meine Messgeräte kalibrieren lassen?',
    answer: 'Empfohlen wird eine jährliche Kalibrierung. Je nach Nutzungshäufigkeit und Genauigkeitsanforderungen kann das Intervall kürzer (halbjährlich) oder länger (alle 2 Jahre) sein. Wir bieten einen Erinnerungsservice an.',
  },
  {
    question: 'Liefern Sie auch vor Ort?',
    answer: 'Aktuell erfolgt die Kalibrierung in unserem Labor in Nordhorn. Für größere Projekte oder immobile Messgeräte sprechen Sie uns bitte direkt an – wir finden eine Lösung.',
  },
  {
    question: 'Welche Rückversandkosten fallen an?',
    answer: 'Der Rückversand Ihrer kalibrierten Geräte beträgt pauschal 15 € netto (zzgl. MwSt.) pro Sendung. Versicherter Versand ist inklusive. Die Einsendung Ihrer Geräte an unser Labor erfolgt auf Ihre Kosten.',
  },
  {
    question: 'Kann ich eine Sammelrechnung für mehrere Geräte erhalten?',
    answer: 'Ja, selbstverständlich. Alle Geräte eines Auftrags werden auf einer Rechnung zusammengefasst. Für Geschäftskunden bieten wir auch Rahmenverträge an.',
  },
];

export default function FAQPage() {
  // JSON-LD strukturierte Daten für Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 min-h-[500px] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Häufig gestellte <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Fragen</span>
          </h1>
          <p className="text-xl text-slate-300">
            Alles Wichtige rund um Werkskalibrierung, Kosten und Ablauf
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-accent-300 hover:shadow-lg transition-all duration-300"
              >
                <summary className="cursor-pointer font-bold text-lg text-slate-900 flex justify-between items-center">
                  {faq.question}
                  <svg
                    className="w-6 h-6 text-accent-600 transform group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-accent-50 to-slate-50 rounded-xl border border-accent-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ihre Frage nicht dabei?</h2>
            <p className="text-slate-700 mb-6">
              Kontaktieren Sie uns direkt – wir beraten Sie gerne persönlich!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-colors"
              >
                Kontaktformular
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent-500 text-accent-700 font-semibold rounded-xl hover:bg-accent-50 transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
