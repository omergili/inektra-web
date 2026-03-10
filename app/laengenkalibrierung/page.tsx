import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Längenkalibrierung – Messschieber, Endmaße & Lehren kalibrieren',
  description: 'Längenkalibrierung für über 67 Gerätetypen: Messschieber, Endmaße, Messschrauben, Lehrdorne, Messuhren. Eigenes Längenlabor in Nordhorn. Ab 3,90 € netto.',
  keywords: ['längenkalibrierung', 'messschieber kalibrieren', 'endmaße kalibrieren', 'lehrdorn kalibrierung', 'messschrauben kalibrierung', 'dimensionale messtechnik'],
  alternates: {
    canonical: 'https://inektra.de/laengenkalibrierung',
  },
  openGraph: {
    title: 'Längenkalibrierung – Messschieber, Endmaße & Lehren kalibrieren | inektra GmbH',
    description: 'Dimensionale Messtechnik kalibrieren: 67+ Gerätetypen, eigenes Längenlabor in Nordhorn, Prüfung nach DKD-R und VDI/VDE/DGQ 2618.',
    type: 'article',
  },
};

const geraetetypen = [
  {
    name: 'Endmaße',
    norm: 'DIN EN ISO 3650',
    richtlinie: 'DKD-R 4-3 Bl. 3.1',
    preisAb: '3,90',
    beispiele: 'Einzelendmaße, Endmaßsätze (0,5–1.000 mm), Stufenendmaße',
    detail: 'Drei Prüfumfänge: A (Anschiebbarkeit + Mittenabweichung + Abweichungsspanne), B (Mittenabweichung + Abweichungsspanne) und C (nur Mittenabweichung).',
  },
  {
    name: 'Messschieber',
    norm: 'DIN 862',
    richtlinie: 'VDI/VDE/DGQ 2618 Bl. 8Ü + 9Ü',
    preisAb: '7,81',
    beispiele: 'Messschieber, Tiefenmessschieber, Höhenmessschieber, Anreißmessschieber',
    detail: 'Analog und digital. Messbereiche von 150 bis 2.500 mm. Aufpreis für Haken an Tiefenmessschieber: 3,90 €.',
  },
  {
    name: 'Messschrauben',
    norm: 'DIN 863',
    richtlinie: 'DKD-R 4.3 Bl. 10.1',
    preisAb: '13,02',
    beispiele: 'Bügelmessschrauben, Innenmessschrauben, Tiefenmessschrauben, Dreipunktmessschrauben',
    detail: 'Messbereiche von 25 bis 2.000 mm. Feinzeigerprüfung bei Feinzeigerbügelmessschrauben im Preis enthalten.',
  },
  {
    name: 'Messuhren',
    norm: 'DIN 878',
    richtlinie: 'DKD-R 4-3 Bl. 11.1',
    preisAb: '7,81',
    beispiele: 'Messuhren (analog + digital), Feinzeiger, Fühlhebelmessgeräte',
    detail: 'Messbereiche von 1 bis 100 mm. Preis gilt für analoge und digitale Ausführungen gleichermaßen.',
  },
  {
    name: 'Lehrdorne & Lehrringe',
    norm: 'DIN 7164 / DIN 2250',
    richtlinie: 'VDI/VDE/DGQ 2618 Bl. 2Ü + 4Ü',
    preisAb: '5,21',
    beispiele: 'Einstelldorne, Grenzlehrdorne, Gut-/Ausschusslehrringe, Einstellringe',
    detail: 'Lehrringe mit bis zu vier Prüfumfängen (D, C, B, A) – von Durchmesserprüfung bis Rauheitsmessung der Messfläche.',
  },
  {
    name: 'Gewindelehren',
    norm: 'DIN 13 / DIN 103',
    richtlinie: 'DKD-R 4-3 Bl. 4.8 / 4.9',
    preisAb: '18,23',
    beispiele: 'Gewindelehrdorne, Gewindelehrringe, Gewinderachenlehren, Gewindemessdrähte',
    detail: 'Für metrische Regel- und Feingewinde (M), Unified-Standard (UNC/UN), Rohr- (G, R) und Trapezgewinde (Tr).',
  },
];

const pruefschritte = [
  {
    schritt: 'Reinigung & Entmagnetisierung',
    text: 'Alle Prüflinge werden gereinigt und entmagnetisiert, um Verschmutzungen und magnetische Anhaftungen als Fehlerquelle auszuschließen.',
  },
  {
    schritt: 'Klimatisierung',
    text: 'Vor der Messung werden die Prüflinge auf die Bezugstemperatur von 20 °C klimatisiert – die international genormte Referenztemperatur für Längenmaße (DIN EN ISO 1).',
  },
  {
    schritt: 'Kalibrierung nach Richtlinie',
    text: 'Die Messung erfolgt nach der jeweils zutreffenden Prüfungsrichtlinie (DKD-R oder VDI/VDE/DGQ). Je nach Gerätetyp werden Messpunkte in definierten Abständen angefahren.',
  },
  {
    schritt: 'Dokumentation & Kalibrierschein',
    text: 'Alle Messwerte, Abweichungen und die berechnete Messunsicherheit werden dokumentiert. Sie erhalten einen rückverfolgbaren Kalibrierschein mit Prüfentscheid.',
  },
];

const normen = [
  {
    name: 'DKD-R 4-3 (diverse Blätter)',
    text: 'Die zentrale Richtlinienreihe für die Kalibrierung dimensionaler Messgeräte. Blatt 3.1 (Endmaße), 10.1 (Bügelmessschrauben), 10.7/10.8 (Innen-/Dreilinienmessschrauben), 11.1 (Messuhren), 4.8/4.9 (Gewindelehren) und weitere definieren die Prüfverfahren und Messunsicherheitsberechnungen.',
  },
  {
    name: 'VDI/VDE/DGQ 2618',
    text: 'Die Richtlinienreihe für Prüfmittelüberwachung. Für die Längenkalibrierung relevant: Blatt 2Ü (Lehrdorne), 4Ü (Lehrringe), 5Ü/6Ü (Messschrauben), 8Ü + 9Ü (Messschieber), 14Ü (Schnabel-/Innenmessschrauben), 16Ü (Höhenmessschrauben).',
  },
  {
    name: 'DIN EN ISO 14253-1',
    text: 'Legt fest, wie Toleranzen und Messunsicherheiten bei der Prüfung geometrischer Produktspezifikationen zu berücksichtigen sind. Grundlage für den Prüfentscheid bei Kalibrierungen.',
  },
  {
    name: 'DIN 862 / 863 / 878',
    text: 'Die gerätespezifischen Genauigkeitsnormen: DIN 862 für Messschieber, DIN 863 (Teile 1–4) für Messschrauben und DIN 878 für Messuhren. Sie definieren die zulässigen Fehlergrenzen je Messbereich.',
  },
];

const faqs = [
  {
    question: 'Welche Prüfumfänge bieten Sie bei Endmaßen an?',
    answer: 'Wir kalibrieren Endmaße in drei Prüfumfängen nach DKD-R 4-3 Blatt 3.1: Prüfumfang A umfasst Anschiebbarkeit mittels Planglasplatte, Mittenabweichung zum Nennmaß und Abweichungsspanne. Prüfumfang B prüft Mittenabweichung und Abweichungsspanne. Prüfumfang C dokumentiert nur die Mittenabweichung. Standardmäßig führen wir Prüfumfang B durch – bitte geben Sie auf dem Lieferschein den gewünschten Genauigkeitsgrad an.',
  },
  {
    question: 'Wie lange dauert eine Längenkalibrierung?',
    answer: 'Bei Aufträgen mit 10 bis 50 mechanischen Messgeräten beträgt die Bearbeitungszeit etwa 10 bis 15 Werktage. Für eilige Aufträge bieten wir Express-Kalibrierung an – sprechen Sie uns bei der Auftragserteilung darauf an. Einzelgeräte oder kleine Stückzahlen können oft schneller bearbeitet werden.',
  },
  {
    question: 'Warum wird bei genau 20 °C kalibriert?',
    answer: 'Die Bezugstemperatur 20 °C ist in DIN EN ISO 1 festgelegt und gilt weltweit als Referenz für dimensionale Messungen. Bereits 1 °C Abweichung verursacht bei einem Stahlendmaß von 100 mm eine Längenänderung von etwa 1,15 µm – bei Aluminium sogar rund 2,3 µm. Deshalb werden alle Prüflinge vor der Messung in unserer klimatisierten Messumgebung temperiert, bis ein stabiles thermisches Gleichgewicht erreicht ist.',
  },
];

export default function LaengenkalibrierungPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Längenkalibrierung' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Längenkalibrierung</span> – Messschieber, Endmaße & Lehren
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Über 67 Gerätetypen nach DKD-R und VDI/VDE/DGQ-Richtlinien. Eigenes Labor in Nordhorn.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 text-lg font-bold bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors shadow-lg"
            >
              Kalibrierung anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* Einleitung */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Längenkalibrierung aus eigenem Labor</h2>
            <p className="text-lg text-slate-600 mb-6">
              Die Längenkalibrierung bildet das Fundament der industriellen Messtechnik. Ob Messschieber in der Fertigung, Endmaße im Prüflabor oder Lehrdorne in der Qualitätssicherung – ohne regelmäßige Kalibrierung verlieren dimensionale Messgeräte ihre Rückverfolgbarkeit und damit ihre Aussagekraft.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              In unserem klimatisierten Längenlabor in Nordhorn kalibrieren wir über 67 verschiedene Gerätetypen aus den Bereichen Maßverkörperungen und anzeigende Längenmessgeräte. Die Prüfungen erfolgen nach anerkannten Richtlinien – von DKD-R 4-3 für Endmaße bis VDI/VDE/DGQ 2618 für Messschieber und Lehren.
            </p>
            <p className="text-lg text-slate-600">
              Kurze Durchlaufzeiten und transparente Preise sind unser Anspruch.
            </p>
          </div>
        </div>
      </section>

      {/* Gerätetypen */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Kalibrierbare Gerätetypen</h2>
            <p className="text-xl text-slate-600">Prüfungsrichtlinien, Normen und Preise auf einen Blick</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {geraetetypen.map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">{item.norm}</span>
                  <span className="text-xs font-medium bg-accent-50 text-accent-700 px-2 py-1 rounded">{item.richtlinie}</span>
                </div>
                <p className="text-sm text-slate-500 mb-3">{item.beispiele}</p>
                <p className="text-sm text-slate-600 mb-4">{item.detail}</p>
                <div className="bg-accent-50 text-accent-700 font-bold px-4 py-2 rounded-lg text-lg inline-block">
                  ab {item.preisAb} € netto
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-slate-600">
              <strong className="text-slate-900">Ihr Gerät nicht dabei?</strong> Neben den hier aufgeführten Gerätetypen kalibrieren wir auch Feinzeiger, Innenmessgeräte, Schnelltaster, Rollbandmaße, Schichtdickenmessgeräte, Profilprojektoren und viele weitere dimensionale Messgeräte. <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Alle Geräte und Preise nachschlagen →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Prüfverfahren */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So läuft eine Längenkalibrierung ab</h2>
            <p className="text-xl text-slate-600">Vom Wareneingang bis zum Kalibrierschein – vier Schritte im Überblick</p>
          </div>

          <div className="space-y-8">
            {pruefschritte.map((item, index) => (
              <div key={item.schritt} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.schritt}</h3>
                  <p className="text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Normen */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Normen und Prüfungsrichtlinien</h2>
            <p className="text-lg text-slate-600 mb-6">
              Unsere Längenkalibrierungen basieren auf anerkannten nationalen und internationalen Richtlinien:
            </p>

            <div className="space-y-6">
              {normen.map((norm) => (
                <div key={norm.name} className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{norm.name}</h3>
                  <p className="text-slate-600">{norm.text}</p>
                </div>
              ))}
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
              <Link
                href="/kalibrierintervalle"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Kalibrierintervalle
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <PageFAQ faqs={faqs} title="Häufige Fragen zur Längenkalibrierung" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Längenkalibrierung beauftragen</h2>
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
