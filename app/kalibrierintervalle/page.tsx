import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Kalibrierintervalle – Wie oft sollten Sie kalibrieren? | inektra',
  description: 'Optimale Kalibrierintervalle für Messgeräte: Empfehlungen nach Gerätetyp, Einflussfaktoren und Normen. Praxisorientierter Ratgeber für Industrie und Labor.',
  keywords: ['kalibrierintervall', 'wie oft kalibrieren', 'kalibrierungshäufigkeit', 'kalibrierung intervall', 'rekalibrierung', 'kalibrierzyklus'],
  alternates: {
    canonical: 'https://inektra.de/kalibrierintervalle',
  },
};

const intervalle = [
  {
    kategorie: 'Elektrische Messgeräte',
    beispiele: 'Multimeter, Oszilloskope, Stromzangen, Isolationsmessgeräte',
    intervall: '12 Monate',
    hinweis: 'Bei täglichem Einsatz auf Baustellen ggf. 6 Monate',
  },
  {
    kategorie: 'Drehmomentschlüssel',
    beispiele: 'Drehmomentschlüssel, Drehmomentprüfgeräte',
    intervall: '12 Monate oder 5.000 Betätigungen',
    hinweis: 'Gemäß DIN EN ISO 6789 – das zuerst Erreichte gilt',
  },
  {
    kategorie: 'Längenmesstechnik',
    beispiele: 'Messschieber, Messschrauben, Endmaße, Messuhren',
    intervall: '12–24 Monate',
    hinweis: 'Bei geringer Nutzung in kontrollierter Umgebung bis 24 Monate',
  },
  {
    kategorie: 'Druckmesstechnik',
    beispiele: 'Manometer, Drucksensoren, Transmitter',
    intervall: '12 Monate',
    hinweis: 'Prozessdruckmessgeräte in kritischen Anlagen ggf. 6 Monate',
  },
  {
    kategorie: 'Temperaturmesstechnik',
    beispiele: 'Thermometer, IR-Thermometer, Thermoelemente',
    intervall: '12 Monate',
    hinweis: 'Lebensmittel- und Pharmabranche: häufig 6 Monate',
  },
  {
    kategorie: 'Waagen',
    beispiele: 'Analysenwaagen, Präzisionswaagen, Industriewaagen',
    intervall: '12 Monate',
    hinweis: 'Eichpflichtige Waagen unterliegen zusätzlich dem Eichgesetz',
  },
];

const einflussfaktoren = [
  {
    titel: 'Nutzungshäufigkeit',
    text: 'Je häufiger ein Messgerät eingesetzt wird, desto schneller kann es driften. Geräte im Dauereinsatz sollten kürzere Intervalle haben als Geräte, die nur gelegentlich genutzt werden.',
  },
  {
    titel: 'Umgebungsbedingungen',
    text: 'Extreme Temperaturen, hohe Luftfeuchtigkeit, Staub oder Vibrationen beschleunigen den Verschleiß. Geräte in rauen Industrieumgebungen oder auf Baustellen benötigen kürzere Intervalle.',
  },
  {
    titel: 'Genauigkeitsanforderungen',
    text: 'Je enger die geforderte Messtoleranz, desto häufiger sollte kalibriert werden. In der Qualitätssicherung oder bei sicherheitsrelevanten Messungen ist ein kürzeres Intervall sinnvoll.',
  },
  {
    titel: 'Branchenvorschriften',
    text: 'Bestimmte Branchen schreiben feste Intervalle vor. In der Automobilindustrie, Medizintechnik oder Luftfahrt gelten oft strengere Anforderungen als die allgemeinen Empfehlungen.',
  },
];

const faqs = [
  {
    question: 'Was passiert, wenn ich das Kalibrierintervall überschreite?',
    answer: 'Überschrittene Kalibrierintervalle bedeuten, dass Messergebnisse nicht mehr als rückverfolgbar gelten. In der Qualitätssicherung kann das zu Beanstandungen bei Audits führen. Bei sicherheitsrelevanten Messungen (z. B. Prüfungen nach DGUV Vorschrift 3) drohen im Schadensfall Haftungsprobleme. Zudem können bereits durchgeführte Messungen nachträglich angezweifelt werden.',
  },
  {
    question: 'Gibt es gesetzliche Vorgaben für Kalibrierintervalle?',
    answer: 'Für die meisten Messgeräte gibt es keine festen gesetzlichen Vorgaben – die Verantwortung liegt beim Betreiber. Ausnahmen sind eichpflichtige Messgeräte (Eichgesetz) und Prüfmittel im Rahmen der Betriebssicherheitsverordnung (BetrSichV). Branchenstandards wie VDI/VDE/DGQ 2618 und ISO-Normen geben Empfehlungen, die in der Praxis als Stand der Technik gelten.',
  },
  {
    question: 'Kann ich das Kalibrierintervall selbst festlegen?',
    answer: 'Ja, der Betreiber legt das Kalibrierintervall eigenverantwortlich fest. Die Entscheidung sollte dokumentiert und nachvollziehbar sein. Grundlage ist eine Risikobetrachtung: Wie kritisch ist die Messung? Wie stabil ist das Gerät erfahrungsgemäß? Wurde bei der letzten Kalibrierung eine Drift festgestellt? Eine bewährte Methode ist, mit 12 Monaten zu starten und das Intervall anhand der Kalibrierhistorie anzupassen.',
  },
];

export default function KalibrierintervallePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Kalibrierintervalle' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20 min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Kalibrierintervalle</span> – Wie oft sollten Sie kalibrieren?
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Empfohlene Kalibrierzyklen nach Gerätetyp, Einflussfaktoren für die richtige Intervallfestlegung und relevante Normen – praxisnah erklärt.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
            >
              Kalibrierung beauftragen
            </Link>
          </div>
        </div>
      </section>

      {/* Einleitung */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Warum regelmäßig kalibrieren?</h2>
            <p className="text-lg text-slate-600 mb-6">
              Jedes Messgerät unterliegt einer natürlichen Alterung. Mechanische Bauteile verschleißen, elektronische Komponenten driften, und Umgebungseinflüsse hinterlassen Spuren. Die Folge: Messwerte weichen schleichend vom tatsächlichen Wert ab – oft ohne dass es dem Anwender auffällt.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              Regelmäßige Kalibrierung stellt sicher, dass Ihre Messgeräte innerhalb der geforderten Toleranzen arbeiten. Das schützt vor fehlerhaften Produkten, Reklamationen und im schlimmsten Fall vor Haftungsansprüchen. In vielen Branchen ist eine nachweisliche Kalibrierung zudem Voraussetzung für Audits und Zertifizierungen.
            </p>
            <p className="text-lg text-slate-600">
              Das richtige Kalibrierintervall ist dabei ein Kompromiss: Zu häufig kostet unnötig Geld und Ausfallzeit, zu selten gefährdet die Messqualität. Die folgenden Empfehlungen helfen Ihnen, das optimale Intervall für Ihre Geräte zu finden.
            </p>
          </div>
        </div>
      </section>

      {/* Empfohlene Intervalle */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Empfohlene Kalibrierintervalle</h2>
            <p className="text-xl text-slate-600">Richtwerte nach Gerätetyp – als Ausgangspunkt für Ihre individuelle Festlegung</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {intervalle.map((item) => (
              <div key={item.kategorie} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.kategorie}</h3>
                <p className="text-sm text-slate-500 mb-4">{item.beispiele}</p>
                <div className="flex items-center mb-3">
                  <div className="bg-accent-50 text-accent-700 font-bold px-4 py-2 rounded-lg text-lg">
                    {item.intervall}
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">{item.hinweis}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-slate-600">
              <strong className="text-slate-900">Wichtig:</strong> Diese Intervalle sind Richtwerte. Das tatsächliche Intervall sollte individuell festgelegt werden – basierend auf Nutzung, Umgebung und Anforderungen. Starten Sie mit den empfohlenen Werten und passen Sie anhand der Kalibrierhistorie an.
            </p>
          </div>
        </div>
      </section>

      {/* Einflussfaktoren */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Was beeinflusst das Kalibrierintervall?</h2>
            <p className="text-xl text-slate-600">Vier Faktoren bestimmen, ob Sie häufiger oder seltener kalibrieren sollten</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {einflussfaktoren.map((faktor, index) => (
              <div key={faktor.titel} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{faktor.titel}</h3>
                  <p className="text-slate-600">{faktor.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Normen und Richtlinien */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Normen und Richtlinien</h2>
            <p className="text-lg text-slate-600 mb-6">
              Verschiedene Regelwerke geben Empfehlungen und Anforderungen zur Festlegung von Kalibrierintervallen:
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">VDI/VDE/DGQ 2618</h3>
                <p className="text-slate-600">
                  Die zentrale Richtlinienreihe für die Prüfmittelüberwachung in Deutschland. Sie beschreibt Verfahren zur Festlegung und Anpassung von Kalibrierintervallen und gibt gerätespezifische Empfehlungen für verschiedene Messmittelkategorien.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Betriebssicherheitsverordnung (BetrSichV)</h3>
                <p className="text-slate-600">
                  Schreibt vor, dass Arbeitsmittel – einschließlich Prüf- und Messmittel – in ordnungsgemäßem Zustand gehalten werden müssen. Für überwachungsbedürftige Anlagen gelten zusätzliche Prüfpflichten mit festgelegten Fristen.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">DIN EN ISO 6789</h3>
                <p className="text-slate-600">
                  Spezifisch für Drehmomentschlüssel: Definiert Prüfverfahren und empfiehlt eine Kalibrierung alle 12 Monate oder nach 5.000 Betätigungen – je nachdem, was zuerst eintritt.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">DGUV Vorschrift 3</h3>
                <p className="text-slate-600">
                  Für elektrische Prüfgeräte relevant: Geräte zur Prüfung elektrischer Anlagen müssen regelmäßig auf ihre Funktionstüchtigkeit geprüft werden. Eine aktuelle Kalibrierung stellt sicher, dass Prüfergebnisse belastbar sind.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/kalibrierservice"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Unser Kalibrierservice
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/kalibrierkosten"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Kalibrierkosten nachschlagen
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen zu Kalibrierintervallen" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Kalibrierung fällig?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Senden Sie uns Ihre Geräteliste – wir erstellen Ihnen ein transparentes Angebot.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
          >
            Jetzt Angebot anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
