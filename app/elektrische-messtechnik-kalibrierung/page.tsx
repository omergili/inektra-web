import { Metadata } from 'next';
import Link from 'next/link';
import PageFAQ from '@/components/PageFAQ';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Elektrische Messtechnik kalibrieren – Multimeter, Oszilloskope & Prüfgeräte',
  description: 'Kalibrierung elektrischer Messgeräte: Multimeter, Oszilloskope, Stromzangen, VDE-Prüfgeräte, Netzgeräte. Über 1.200 Gerätetypen. Labor in Nordhorn. Ab 29,97 € netto.',
  keywords: ['elektrische messtechnik kalibrierung', 'multimeter kalibrieren', 'oszilloskop kalibrierung', 'VDE prüfgerät kalibrieren', 'stromzange kalibrierung', 'netzgerät kalibrierung'],
  alternates: {
    canonical: 'https://inektra.de/elektrische-messtechnik-kalibrierung',
  },
  openGraph: {
    title: 'Elektrische Messtechnik kalibrieren – Multimeter, Oszilloskope & Prüfgeräte | inektra GmbH',
    description: 'Elektrische Messgeräte kalibrieren: 1.200+ Gerätetypen, Gerätetester, Installationstester, Multimeter, Oszilloskope. Eigenes Labor in Nordhorn.',
    type: 'article',
  },
};

const geraetetypen = [
  {
    name: 'Gerätetester (VDE 0701/0702)',
    norm: 'DIN VDE 0701-0702',
    richtlinie: 'herstellerspez.',
    preisAb: '80,79',
    beispiele: 'Metrawatt Metratester 5, Benning ST 720, Beha-Amprobe GT-400/GT-900, Fluke 6500-2, Chauvin Arnoux C.A 6103',
    detail: 'Prüfung ortsveränderlicher elektrischer Geräte: Schutzleiterwiderstand, Isolationswiderstand, Ableitstrom, Berührungsstrom und Funktionsprüfung. Kalibrierung aller prüfrelevanten Messfunktionen.',
  },
  {
    name: 'Installationstester (VDE 0100)',
    norm: 'DIN VDE 0100',
    richtlinie: 'herstellerspez.',
    preisAb: '99,36',
    beispiele: 'Metrawatt Profitest, Benning IT 110, Amprobe ProInstall 100/200, Metrel Eurotest, HT Instruments',
    detail: 'Prüfung ortsfester elektrischer Anlagen: Schleifenimpedanz, RCD-Auslösezeit, Isolationswiderstand, Erdungswiderstand und Drehfeldrichtung. Kalibrierung aller Prüffunktionen nach Herstellervorgaben.',
  },
  {
    name: 'Multimeter',
    norm: '—',
    richtlinie: 'herstellerspez.',
    preisAb: '29,97',
    beispiele: 'Digitalmultimeter, Analogmultimeter, Tischmultimeter (Fluke, Benning, Metrawatt, Voltcraft, Amprobe)',
    detail: 'Kalibrierung der Messfunktionen DC-Spannung, AC-Spannung, DC-Strom, AC-Strom, Widerstand, Frequenz und Kapazität in verschiedenen Messbereichen. Vergleich mit rückverfolgbarem Referenznormal.',
  },
  {
    name: 'Oszilloskope',
    norm: '—',
    richtlinie: 'herstellerspez.',
    preisAb: '93,82',
    beispiele: 'Analog-, Digital- und Mixed-Signal-Oszilloskope (Tektronix, Keysight/Agilent, Hameg/Rohde & Schwarz, Rigol)',
    detail: 'Prüfung von Bandbreite, Anstiegszeit, Abtastrate, Zeitbasis und vertikaler Genauigkeit. Tastköpfe bis 300 MHz separat kalibrierbar (ab 19,54 €).',
  },
  {
    name: 'Stromzangen',
    norm: '—',
    richtlinie: 'herstellerspez.',
    preisAb: '29,97',
    beispiele: 'AC-Stromzangen, AC/DC-Stromzangen, Flex-Stromzangen, Clamp-Multimeter (Fluke, Chauvin Arnoux, Benning, Amprobe)',
    detail: 'Kalibrierung der AC- und DC-Strommessung in den relevanten Messbereichen. True-RMS-Geräte werden mit definiertem Oberwellengehalt geprüft.',
  },
  {
    name: 'Netzgeräte & Kalibratoren',
    norm: '—',
    richtlinie: 'herstellerspez.',
    preisAb: '59,94',
    beispiele: 'Labornetzgeräte, Prozesskalibratoren, Multifunktionskalibratoren (EA, Fluke, Voltcraft, Beamex)',
    detail: 'Prüfung von DC-Spannungsausgang, DC-Stromausgang, Stabilität und Restwelligkeit. Bei Kalibratoren wird die Ausgabegenauigkeit aller Funktionen verifiziert.',
  },
  {
    name: 'Isolations- & Spezialgeräte',
    norm: '—',
    richtlinie: 'herstellerspez.',
    preisAb: '59,94',
    beispiele: 'Isolationstester, Erdungsmessgeräte, Leistungsanalysatoren, Widerstandsmessgeräte (Beha, Metrawatt, Benning, Chauvin Arnoux)',
    detail: 'Kalibrierung von Isolationswiderstandsmessung (verschiedene Prüfspannungen), Erdungswiderstand, Leistungsmessung und Präzisions-Widerstandsmessung.',
  },
];

const pruefschritte = [
  {
    schritt: 'Sichtprüfung & Funktionstest',
    text: 'Jedes elektrische Messgerät wird bei Wareneingang auf äußere Beschädigungen, korrekte Anschlussbuchsen und grundlegende Funktionsfähigkeit geprüft. Defekte oder offensichtlich beschädigte Geräte werden vor der Kalibrierung gemeldet.',
  },
  {
    schritt: 'DC-Kalibrierung (Gleichgrößen)',
    text: 'Die Gleichspannungs- und Gleichstrommessbereiche werden mit einem rückverfolgbaren Referenznormal verglichen. Dabei werden mehrere Messpunkte über den gesamten Messbereich angefahren und die Abweichungen dokumentiert.',
  },
  {
    schritt: 'AC-Kalibrierung (Wechselgrößen)',
    text: 'Anschließend folgt die Prüfung der Wechselspannungs- und Wechselstrombereiche sowie ggf. der Frequenzmessung. Bei VDE-Prüfgeräten werden zusätzlich Isolations- und Schleifenimpedanzmessung kalibriert.',
  },
  {
    schritt: 'Dokumentation & Kalibrierschein',
    text: 'Alle Messwerte, Abweichungen und die berechnete Messunsicherheit werden dokumentiert. Sie erhalten einen rückverfolgbaren Kalibrierschein mit Angabe der verwendeten Referenznormale und der Umgebungsbedingungen.',
  },
];

const normen = [
  {
    name: 'DIN VDE 0701-0702',
    text: 'Regelt die wiederkehrende Prüfung ortsveränderlicher elektrischer Geräte. Definiert die Prüfverfahren für Schutzleiterwiderstand, Isolationswiderstand, Ableitstrom und Berührungsstrom. Die Kalibrierung der Gerätetester stellt sicher, dass diese Prüfungen verlässliche Ergebnisse liefern.',
  },
  {
    name: 'DIN VDE 0100 (Teile 410, 600)',
    text: 'Die Normenreihe für die Errichtung und Prüfung elektrischer Niederspannungsanlagen. Teil 600 beschreibt die Erstprüfung und wiederkehrende Prüfung – Installationstester müssen regelmäßig kalibriert werden, damit Schleifenimpedanz-, RCD- und Isolationsmessungen korrekte Ergebnisse liefern.',
  },
  {
    name: 'IEC 61010 / DIN EN 61557',
    text: 'IEC 61010 definiert die Sicherheitsanforderungen an elektrische Mess-, Steuer- und Laborgeräte. DIN EN 61557 beschreibt die Prüfverfahren für Schutzmaßnahmen in Niederspannungsanlagen und legt die Genauigkeitsanforderungen an die Prüfgeräte fest.',
  },
];

const faqs = [
  {
    question: 'Welche Messfunktionen werden bei der Kalibrierung geprüft?',
    answer: 'Bei einem Multimeter kalibrieren wir in der Regel die Funktionen DC-Spannung, AC-Spannung, DC-Strom, AC-Strom, Widerstand und – je nach Geräteausstattung – Frequenz und Kapazität. Jede Funktion wird in mehreren Messpunkten über den gesamten Messbereich geprüft. Bei VDE-Prüfgeräten kalibrieren wir alle prüfrelevanten Funktionen wie Schutzleiterwiderstand, Isolationswiderstand und Ableitstrom.',
  },
  {
    question: 'Wie läuft eine Multimeter-Kalibrierung ab?',
    answer: 'Das Messgerät wird in jedem Messbereich mit einem hochgenauen Referenznormal verglichen. Der Kalibriertechniker legt definierte Sollwerte an und dokumentiert die Abweichung zwischen Soll- und Istwert. Die Messpunkte werden so gewählt, dass sie den gesamten Messbereich abdecken – typischerweise bei 10 %, 50 % und 90 % des Messbereichsendwerts. Aus den Ergebnissen wird die Messunsicherheit berechnet.',
  },
  {
    question: 'Was kostet die Kalibrierung elektrischer Messgeräte?',
    answer: 'Die Kosten hängen vom Gerätetyp und Funktionsumfang ab. Einfache Multimeter und Stromzangen starten ab 29,97 € netto. VDE-Gerätetester (0701/0702) ab 80,79 €, Installationstester (0100) ab 99,36 €, Oszilloskope ab 93,82 €. Der Mindestauftragswert beträgt 40 € netto. Eine vollständige Preisübersicht finden Sie auf unserer Kalibrierkosten-Seite.',
  },
];

export default function ElektrischeMesstechnikPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Elektrische Messtechnik kalibrieren' }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-16 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Elektrische Messtechnik</span> kalibrieren
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Über 1.200 Gerätetypen: Multimeter, Oszilloskope, Stromzangen, VDE-Prüfgeräte und mehr. Eigenes Labor in Nordhorn.
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
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Elektrische Messtechnik kalibrieren – über 1.200 Gerätetypen</h2>
            <p className="text-lg text-slate-600 mb-6">
              Die regelmäßige Kalibrierung elektrischer Messgeräte ist unverzichtbar für zuverlässige Messergebnisse in Industrie, Handwerk und Labor. Ob Digitalmultimeter in der Fertigung, Gerätetester für die wiederkehrende VDE-Prüfung oder Oszilloskop in der Entwicklung – nur kalibrierte Messgeräte liefern rückverfolgbare und belastbare Ergebnisse.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              In unserem Kalibrierlabor in Nordhorn kalibrieren wir über 1.200 verschiedene Gerätetypen aus dem Bereich der elektrischen Messtechnik. Besonders häufig kalibrieren wir Gerätetester nach VDE 0701/0702 und Installationstester nach VDE 0100 – zwei Gerätekategorien, die bei unseren Kunden besonders stark nachgefragt werden. Informationen zu den empfohlenen{' '}
              <Link href="/kalibrierintervalle" className="text-accent-600 font-semibold hover:underline">Kalibrierintervallen</Link> und den{' '}
              <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Kalibrierkosten</Link>{' '}
              finden Sie auf unseren Ratgeber-Seiten.
            </p>
          </div>
        </div>
      </section>

      {/* Gerätetypen */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Kalibrierbare Gerätetypen</h2>
            <p className="text-xl text-slate-600">Prüfverfahren, Normen und Preise auf einen Blick</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {geraetetypen.map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.norm !== '—' && (
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">{item.norm}</span>
                  )}
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
              <strong className="text-slate-900">Ihr Messgerät nicht dabei?</strong> Neben den hier aufgeführten Gerätetypen kalibrieren wir auch Spannungsprüfer, Voltmeter, Wattmeter, Leistungsanalysatoren, Funktionsgeneratoren, Zähler und viele weitere elektrische Messgeräte. <Link href="/kalibrierkosten" className="text-accent-600 font-semibold hover:underline">Alle Geräte und Preise nachschlagen →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Prüfverfahren */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">So läuft eine Kalibrierung elektrischer Messgeräte ab</h2>
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
              Die Kalibrierung elektrischer Messgeräte orientiert sich an anerkannten nationalen und internationalen Normen:
            </p>

            <div className="space-y-6">
              {normen.map((norm) => (
                <div key={norm.name} className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{norm.name}</h3>
                  <p className="text-slate-600">{norm.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                href="/messgeraete-kalibrieren"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Alle Messverfahren
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/laengenkalibrierung"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Längenkalibrierung
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/druckkalibrierung"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Druckkalibrierung
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/drehmoment-kalibrierung"
                className="inline-flex items-center text-accent-600 font-semibold hover:translate-x-2 transition-transform"
              >
                Drehmomentkalibrierung
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
      <PageFAQ faqs={faqs} title="Häufige Fragen zur Kalibrierung elektrischer Messgeräte" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 text-center">
          <h2 className="text-4xl font-bold mb-6">Elektrische Messgeräte kalibrieren lassen</h2>
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
