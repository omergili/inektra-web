import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Werkskalibrierung vs. DAkkS – Unterschiede, Kosten & wann Sie was brauchen',
  description: 'Werkskalibrierung oder DAkkS-Kalibrierung? Vergleich der Unterschiede bei Kosten, Bearbeitungszeit, Rückverfolgbarkeit und Audit-Akzeptanz. Praxisorientierter Ratgeber für Industrie und Labor.',
  keywords: ['werkskalibrierung', 'akkreditierte kalibrierung', 'dakks unterschied', 'werkskalibrierung vs dakks', 'kalibrierung unterschied'],
  alternates: {
    canonical: 'https://inektra.de/werkskalibrierung-vs-dakks',
  },
  openGraph: {
    title: 'Werkskalibrierung vs. DAkkS – Unterschiede, Kosten & wann Sie was brauchen | inektra GmbH',
    description: 'Werkskalibrierung oder akkreditierte Kalibrierung? Objektiver Vergleich mit Entscheidungshilfe für Industrie und Qualitätssicherung.',
    type: 'article',
  },
};

const faqs = [
  {
    question: 'Ist eine Werkskalibrierung rückverfolgbar?',
    answer: 'Ja. Eine Werkskalibrierung ist rückverfolgbar auf nationale Normale – genau wie eine DAkkS-Kalibrierung. Der Unterschied liegt nicht in der Rückverfolgbarkeit, sondern in der Überwachung des Kalibrierlabors: Bei einer DAkkS-Kalibrierung wird das Labor regelmäßig durch die Akkreditierungsstelle überprüft, bei einer Werkskalibrierung arbeitet das Labor eigenverantwortlich nach anerkannten Normen und Verfahren. In beiden Fällen erhalten Sie einen Kalibrierschein mit Angabe der verwendeten Referenznormale und der Messunsicherheit.',
  },
  {
    question: 'Wird eine Werkskalibrierung bei ISO-9001-Audits akzeptiert?',
    answer: 'Ja, in den allermeisten Fällen. Die ISO 9001 fordert, dass Messmittel rückverfolgbar kalibriert werden – sie schreibt aber nicht vor, dass dies durch ein akkreditiertes Labor erfolgen muss. Entscheidend ist, dass die Kalibrierung dokumentiert, rückverfolgbar und nach anerkannten Verfahren durchgeführt wird. Werkskalibrierungen mit rückverfolgbarem Kalibrierschein erfüllen diese Anforderung. Nur in Ausnahmefällen – etwa bei expliziten Kundenvorgaben oder behördlichen Auflagen – kann eine DAkkS-Kalibrierung gefordert sein.',
  },
  {
    question: 'Was kostet eine Werkskalibrierung im Vergleich zur DAkkS?',
    answer: 'Eine Werkskalibrierung ist in der Regel 30–50 % günstiger als eine vergleichbare DAkkS-Kalibrierung. Der Preisunterschied ergibt sich aus dem geringeren Dokumentationsaufwand und den niedrigeren Overhead-Kosten (keine Akkreditierungsgebühren, keine regelmäßigen Begutachtungen). Bei inektra starten Werkskalibrierungen je nach Gerätetyp ab etwa 15 € netto. Eine vollständige Preisübersicht finden Sie auf unserer Kalibrierkosten-Seite.',
  },
  {
    question: 'Kann ich von DAkkS auf Werkskalibrierung umsteigen?',
    answer: 'Ja, in vielen Fällen ist das möglich und sinnvoll. Prüfen Sie zunächst, ob Ihre Branche, Ihr Kunde oder Ihre interne QM-Dokumentation explizit eine akkreditierte Kalibrierung vorschreibt. Falls nicht, können Sie auf Werkskalibrierung umsteigen und dabei erheblich Kosten sparen. Der Umstieg sollte in Ihrer Prüfmittelüberwachung dokumentiert werden. Sprechen Sie uns an – wir beraten Sie ehrlich, ob eine Werkskalibrierung für Ihre Anwendung ausreicht.',
  },
  {
    question: 'Bietet inektra auch DAkkS-Kalibrierungen an?',
    answer: 'Nein, inektra bietet ausschließlich Werkskalibrierungen an. Wir sind kein akkreditiertes Kalibrierlabor und erheben diesen Anspruch auch nicht. Unsere Werkskalibrierungen sind rückverfolgbar, normgerecht und für die große Mehrheit industrieller Anwendungen vollkommen ausreichend. Sollten Sie für bestimmte Geräte tatsächlich eine DAkkS-Kalibrierung benötigen, empfehlen wir Ihnen gerne einen geeigneten Dienstleister.',
  },
];

export default function WerkskalibrierungVsDakksPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Werkskalibrierung vs. DAkkS' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Werkskalibrierung vs. DAkkS</span> – Unterschiede auf einen Blick
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Welche Kalibrierung brauchen Sie wirklich? Ein praxisorientierter Ratgeber zu Kosten, Rückverfolgbarkeit und Audit-Akzeptanz – damit Sie die richtige Entscheidung treffen.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
            >
              Werkskalibrierung anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* Einleitung */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Werkskalibrierung oder akkreditierte Kalibrierung?</h2>
            <p className="text-lg text-slate-600 mb-6">
              Die <strong>Werkskalibrierung</strong> ist die in der Industrie am häufigsten eingesetzte Form der Kalibrierung. Sie bietet rückverfolgbare Messergebnisse zu fairen Kosten und wird von den meisten Qualitätsmanagementsystemen anerkannt. Dennoch herrscht bei vielen Unternehmen Unsicherheit: Reicht eine Werkskalibrierung aus, oder muss es eine akkreditierte DAkkS-Kalibrierung sein?
            </p>
            <p className="text-lg text-slate-600 mb-6">
              In Deutschland gibt es zwei grundlegende Formen der Kalibrierung: die Werkskalibrierung (auch Fabrik- oder Hauskalibrierung genannt) und die akkreditierte Kalibrierung durch ein von der Deutschen Akkreditierungsstelle (DAkkS) zugelassenes Labor. Beide liefern rückverfolgbare Ergebnisse – der Unterschied liegt in der Überwachung des Labors, im Dokumentationsumfang und letztlich in den Kosten.
            </p>
            <p className="text-lg text-slate-600">
              Dieser Ratgeber erklärt die wesentlichen Unterschiede objektiv und hilft Ihnen einzuschätzen, welche Kalibrierung für Ihre Anwendung die richtige ist. Ergänzende Informationen finden Sie in unseren Ratgebern zu{' '}
              <Link href="/kalibrierintervalle" className="text-accent-600 font-semibold hover:underline">Kalibrierintervallen</Link> und{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Vergleichstabelle */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Vergleich: Werkskalibrierung vs. DAkkS-Kalibrierung</h2>
            <p className="text-xl text-slate-600">Die wichtigsten Unterschiede auf einen Blick</p>
          </div>

          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
              <thead>
                <tr>
                  <th style={{ background: '#1a1a2e', color: '#fff', padding: '12px 15px', textAlign: 'left' }}>Kriterium</th>
                  <th style={{ background: '#1a1a2e', color: '#fff', padding: '12px 15px', textAlign: 'left' }}>Werkskalibrierung</th>
                  <th style={{ background: '#1a1a2e', color: '#fff', padding: '12px 15px', textAlign: 'left' }}>DAkkS-Kalibrierung</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Rückverfolgbarkeit</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Ja – auf nationale Normale rückverfolgbar</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Ja – auf nationale Normale rückverfolgbar</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Normenbasis</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>ISO-Normen, VDI/VDE-Richtlinien, DIN-Normen</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>DIN EN ISO/IEC 17025 (Akkreditierungsnorm)</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Kalibrierschein</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Werkskalibrierzertifikat mit Messwerten und Referenznormalen</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>DAkkS-Kalibrierschein mit Akkreditierungssymbol</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Laborüberwachung</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Eigenverantwortlich nach anerkannten Verfahren</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Regelmäßige Begutachtung durch die DAkkS</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Kosten</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Günstiger (ca. 30–50 % weniger)</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Höher durch Akkreditierungsaufwand</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Bearbeitungszeit</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Kürzer (typisch 3–5 Werktage)</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Länger (typisch 5–15 Werktage)</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Anerkannt bei Audits</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Ja – bei ISO 9001, internen Audits, den meisten Kundenaudits</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Ja – zusätzlich bei behördlichen Prüfungen und Eichungen</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Typischer Einsatz</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Produktion, QS, Instandhaltung, Werksprüfungen</td>
                  <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>Eichpflichtige Geräte, behördliche Prüfungen, Referenznormale</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-slate-600">
              <strong className="text-slate-900">Wichtig:</strong> Beide Kalibrierarten liefern rückverfolgbare Ergebnisse. Der Hauptunterschied liegt in der externen Überwachung des Labors und dem daraus resultierenden Dokumentationsaufwand – nicht in der Qualität der Messung selbst.
            </p>
          </div>
        </div>
      </section>

      {/* Wann reicht Werkskalibrierung */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Wann reicht eine Werkskalibrierung?</h2>
            <p className="text-lg text-slate-600 mb-6">
              Die kurze Antwort: In den meisten Fällen. Schätzungsweise 80–90 % aller Unternehmen in Deutschland kommen mit einer Werkskalibrierung vollständig aus. Eine akkreditierte DAkkS-Kalibrierung ist nur dort erforderlich, wo gesetzliche Vorschriften oder spezifische Kundenvorgaben sie explizit verlangen.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              Eine Werkskalibrierung ist die richtige Wahl, wenn Sie Messgeräte in folgenden Bereichen einsetzen:
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">ISO-9001-Qualitätsmanagementsysteme</h3>
                  <p className="text-slate-600">Die ISO 9001 fordert rückverfolgbare Kalibrierung – aber nicht zwingend durch ein akkreditiertes Labor. Ein Werkskalibrierzertifikat mit dokumentierter Rückverfolgbarkeit erfüllt die Anforderung in der Regel vollständig.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Interne Qualitätssicherung</h3>
                  <p className="text-slate-600">Für die betriebsinterne Prüfmittelüberwachung – etwa die regelmäßige Überprüfung von Messschiebern, Multimetern oder Drehmomentschlüsseln in der Produktion – ist eine Werkskalibrierung der Standard.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Produktionsüberwachung</h3>
                  <p className="text-slate-600">Messgeräte, die in der laufenden Produktion zur Prozesssteuerung und Fertigungskontrolle eingesetzt werden, werden in der Praxis fast ausnahmslos werkskalibriert.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Werksprüfungen und Wareneingangskontrollen</h3>
                  <p className="text-slate-600">Ob Maßprüfung, elektrische Prüfung oder Drehmomentprüfung: Für innerbetriebliche Prüfungen genügt eine Werkskalibrierung. Wichtig ist die Dokumentation im Prüfmittelmanagement.</p>
                </div>
              </div>
            </div>

            <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
              <p className="text-slate-700">
                <strong className="text-slate-900">Praxis-Tipp:</strong> Wenn Ihr Unternehmen nicht explizit von einer Behörde, einem Kunden oder einer Branchennorm zur akkreditierten Kalibrierung verpflichtet wird, ist die Werkskalibrierung die wirtschaftlich sinnvolle Wahl. Sie sparen Kosten und Bearbeitungszeit – ohne Abstriche bei der Rückverfolgbarkeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wann DAkkS nötig */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Wann brauchen Sie eine DAkkS-Kalibrierung?</h2>
            <p className="text-lg text-slate-600 mb-6">
              In bestimmten Fällen ist eine akkreditierte Kalibrierung tatsächlich notwendig oder sogar gesetzlich vorgeschrieben. Typische Szenarien sind:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Eichpflichtige Messgeräte</h3>
                <p className="text-slate-600">Waagen im geschäftlichen Verkehr, Zapfsäulen oder Messgeräte im Rahmen des Eichgesetzes unterliegen besonderen Anforderungen, die über eine Werkskalibrierung hinausgehen.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Gesetzlich vorgeschriebene Prüfungen</h3>
                <p className="text-slate-600">In bestimmten Bereichen – etwa der Medizintechnik, der Pharmabranche oder der Lebensmittelüberwachung – können Gesetze oder Verordnungen eine akkreditierte Kalibrierung explizit verlangen.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Behördliche Auflagen</h3>
                <p className="text-slate-600">Wenn Aufsichtsbehörden (z. B. Eichbehörden, Gewerbeaufsicht) für bestimmte Messgeräte einen akkreditierten Kalibrierschein verlangen, kommen Sie um eine DAkkS-Kalibrierung nicht herum.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Referenznormale für eigene Kalibrierlabore</h3>
                <p className="text-slate-600">Betreiben Sie selbst ein Kalibrierlabor, müssen Ihre Referenznormale in der Regel akkreditiert kalibriert werden, um die Rückverfolgbarkeitskette lückenlos nachzuweisen.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <p className="text-slate-600">
                <strong className="text-slate-900">Ehrliche Einschätzung:</strong> inektra bietet keine DAkkS-Kalibrierungen an – wir sind ein Werkskalibrierungslabor. Sollten Sie für einzelne Geräte tatsächlich eine akkreditierte Kalibrierung benötigen, beraten wir Sie gerne ehrlich und empfehlen Ihnen einen passenden Dienstleister. Für alle übrigen Geräte übernehmen wir die Werkskalibrierung – zuverlässig, rückverfolgbar und zu fairen Preisen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Werkskalibrierung bei inektra */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Werkskalibrierung bei inektra</h2>
            <p className="text-lg text-slate-600 mb-6">
              In unserem eigenen Kalibrierlabor in Nordhorn führen wir Werkskalibrierungen für über 3.200 Gerätetypen durch – von Messschiebern und Multimetern über Drehmomentschlüssel bis hin zu Drucksensoren und Temperaturmessgeräten. Jede Kalibrierung erfolgt nach anerkannten ISO-Normen und VDI/VDE-Richtlinien.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              Sie erhalten einen rückverfolgbaren Kalibrierschein mit vollständiger Dokumentation: Ist-Werte, Soll-Werte, Abweichungen, Messunsicherheit und Angabe der verwendeten Referenznormale. Damit sind Sie für ISO-9001-Audits und die interne Prüfmittelüberwachung bestens aufgestellt.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-accent-600 mb-1">3.200+</div>
                <div className="text-sm text-slate-600">kalibrierbare Gerätetypen</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-accent-600 mb-1">Eigenes Labor</div>
                <div className="text-sm text-slate-600">in Nordhorn (Niedersachsen)</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-accent-600 mb-1">Faire Preise</div>
                <div className="text-sm text-slate-600">transparent und kalkulierbar</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="text-2xl font-bold text-accent-600 mb-1">Schnell</div>
                <div className="text-sm text-slate-600">typisch 3–5 Werktage Bearbeitung</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
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

      {/* Cross-Links */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Weiterführende Informationen</h2>
            <p className="text-lg text-slate-600 mb-8">
              Vertiefen Sie Ihr Wissen rund um Kalibrierung – oder beauftragen Sie direkt Ihre Werkskalibrierung:
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
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
                href="/messgeraete-kalibrieren"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Messgeräte kalibrieren
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
              <Link
                href="/kalibrierintervalle"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Kalibrierintervalle
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Kontakt & Anfrage
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen: Werkskalibrierung vs. DAkkS" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Werkskalibrierung beauftragen</h2>
          <p className="text-xl text-slate-300 mb-8">
            Senden Sie uns Ihre Geräteliste – wir erstellen Ihnen ein transparentes Angebot mit konkreten Preisen und Bearbeitungszeiten.
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
