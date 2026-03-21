'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import PageFAQ from '@/components/PageFAQ';

interface ToolboxxItem {
  id: number;
  articleNumber: string;
  name: string;
  description: string;
  priceNet: number | null;
  vat: number | null;
  category: string | null;
  manufacturer: string | null;
}

interface Category {
  name: string;
  count: number;
}

export default function KalibrierKostenPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ToolboxxItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [fetchedAt, setFetchedAt] = useState('');

  // Kategorien laden
  useEffect(() => {
    fetch('/api/toolboxx/items?categories=true')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  // Suche durchführen
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, selectedCategory]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      params.append('limit', '100');

      const res = await fetch(`/api/toolboxx/items?${params}`);
      const data = await res.json();

      setItems(data.items || []);
      setTotal(data.total || 0);
      setFetchedAt(data.fetchedAt || '');
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (priceNet: number | null) => {
    if (!priceNet) return '—';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(priceNet / 100);
  };

  const formatDate = (iso: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleString('de-DE', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Berlin',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden min-h-[280px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 py-16 w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kalibrierkosten <span className="text-accent-500">Übersicht</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Über {total > 0 ? total.toLocaleString('de-DE') : '3.200'} Kalibrierleistungen • Transparente Preise • Werkskalibrierung
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pr-96">
        {/* Suchfeld */}
        <div className="mb-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kalibrierung suchen (z.B. Fluke, Multimeter, Benning...)"
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none transition-all"
            />
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {loading ? 'Suche läuft...' : `${total.toLocaleString('de-DE')} Kalibrierleistungen verfügbar`}
          </p>
        </div>

        {/* Kategorien-Filter */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FunnelIcon className="h-5 w-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">Nach Kategorie filtern</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-accent-500 text-white shadow-lg'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-accent-500'
                }`}
              >
                Alle
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-accent-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-accent-500'
                  }`}
                >
                  {cat.name}
                  <span className="ml-2 text-sm opacity-75">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ergebnisse */}
        {items.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Kalibrierleistung
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 hidden md:table-cell">
                      Art.-Nr.
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                      Preis (netto)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{item.name}</div>
                        {item.manufacturer && (
                          <span className="text-sm text-slate-500">
                            {item.manufacturer}
                          </span>
                        )}
                        <span className="md:hidden block text-xs text-slate-400 mt-1">
                          Art.-Nr. {item.articleNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm hidden md:table-cell">
                        {item.articleNumber}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-bold text-accent-600">
                          {formatPrice(item.priceNet)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {total > items.length && (
              <div className="text-center py-4 bg-slate-50 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  {items.length} von {total.toLocaleString('de-DE')} Ergebnissen angezeigt.
                  Verfeinern Sie Ihre Suche für spezifischere Ergebnisse.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <MagnifyingGlassIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">
              {loading ? 'Daten werden geladen...' : 'Keine Ergebnisse gefunden'}
            </p>
          </div>
        )}

        {/* Info-Box */}
        <div className="mt-8 bg-accent-50 border border-accent-200 rounded-xl p-6">
          <h3 className="font-semibold text-accent-900 mb-2">Hinweise zu den Kalibrierkosten</h3>
          <ul className="space-y-1 text-sm text-accent-800">
            <li>• Alle Preise verstehen sich netto zzgl. MwSt.</li>
            <li>• Rückversand: 15 € netto (Palettenversand nach Aufwand)</li>
            <li>• Werkskalibrierung nach ISO-Normen (nicht akkreditiert)</li>
            <li>• Lieferzeit: i.d.R. 5-10 Werktage</li>
            <li>• Individuelle Angebote für größere Stückzahlen auf Anfrage</li>
          </ul>
        </div>

        {/* Datenstand */}
        {fetchedAt && (
          <p className="mt-4 text-xs text-slate-400 text-right">
            Datenstand: {formatDate(fetchedAt)}
          </p>
        )}
      </div>

      {/* Ratgeber: Was kostet eine Kalibrierung? */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Was kostet eine Kalibrierung?
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              Die Kosten einer Werkskalibrierung richten sich nach drei Faktoren: dem Gerätetyp,
              dem Messbereich und der Anzahl der Kalibrierpunkte. Einfache Handmessgeräte wie
              Messschieber beginnen ab ca. 8 EUR netto, während komplexe Mehrkanal-Messgeräte
              mit erweitertem Messbereich über 200 EUR kosten können.
            </p>
            <p className="text-slate-600 mb-8">
              Die folgende Tabelle zeigt typische Preisspannen für häufig kalibrierte
              Gerätekategorien. Die exakten Preise für Ihr Gerät finden Sie im Katalog oben.
            </p>
          </div>

          {/* Preistabelle */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Gerätekategorie
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                    Preisspanne (netto)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Multimeter</td>
                  <td className="px-6 py-4 text-right text-accent-600 font-semibold">ab 29,97 EUR</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Stromzangen</td>
                  <td className="px-6 py-4 text-right text-accent-600 font-semibold">ab 29,97 EUR</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Drehmomentschlüssel</td>
                  <td className="px-6 py-4 text-right text-accent-600 font-semibold">ab 24,76 EUR</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Messschieber</td>
                  <td className="px-6 py-4 text-right text-accent-600 font-semibold">ab 7,81 EUR</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Manometer / Druckmessgeräte</td>
                  <td className="px-6 py-4 text-right text-accent-600 font-semibold">ab 20,85 EUR</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-slate-500 mb-8">
            Alle Preise verstehen sich netto zzgl. MwSt. Für Geräte, die nicht im Katalog
            gelistet sind, erstellen wir Ihnen gerne ein individuelles Angebot.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">
            Welche Faktoren beeinflussen die Kalibrierkosten?
          </h2>
          <p className="text-slate-600 mb-6">
            Die Kosten einer Kalibrierung hängen von mehreren Faktoren ab. Wenn Sie verstehen,
            wie sich der Preis zusammensetzt, können Sie Ihr Budget besser planen:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">1. Gerätetyp &amp; Komplexität</h3>
              <p className="text-sm text-slate-600">
                Ein einfacher Messschieber (ab 7,81 EUR) hat einen Messpunkt. Ein Multimeter mit
                AC/DC-Spannung, Strom und Widerstand hat dutzende Messpunkte — entsprechend höher
                ist der Aufwand und der Preis.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">2. Anzahl der Kalibrierpunkte</h3>
              <p className="text-sm text-slate-600">
                Mehr Messpunkte = mehr Aufwand = höhere Kosten. Ein Manometer mit 3 Kalibrierpunkten
                kostet weniger als eines mit 10 Punkten über den gesamten Messbereich.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">3. Messbereich</h3>
              <p className="text-sm text-slate-600">
                Je größer der Messbereich, desto aufwändiger die Kalibrierung. Ein Druckmessgerät
                bis 16 bar ist günstiger als eines bis 1.000 bar, weil unterschiedliche Referenznormale
                benötigt werden.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">4. Stückzahl</h3>
              <p className="text-sm text-slate-600">
                Bei größeren Stückzahlen bieten wir Mengenrabatte an. Sprechen Sie uns an —
                ab 10 Geräten desselben Typs erstellen wir ein individuelles Angebot.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">
            Werkskalibrierung vs. DAkkS: Was kostet mehr?
          </h2>
          <p className="text-slate-600 mb-4">
            inektra bietet Werkskalibrierungen nach ISO-Normen an. Diese sind deutlich
            günstiger als akkreditierte DAkkS-Kalibrierungen, die von akkreditierten Laboren
            durchgeführt werden:
          </p>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Kriterium</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Werkskalibrierung</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">DAkkS-Kalibrierung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-700">Kosten (typisch)</td>
                  <td className="px-6 py-3 font-semibold text-accent-600">8–200 EUR</td>
                  <td className="px-6 py-3 text-slate-700">50–500+ EUR</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-700">Bearbeitungszeit</td>
                  <td className="px-6 py-3 font-semibold text-accent-600">5–10 Werktage</td>
                  <td className="px-6 py-3 text-slate-700">2–6 Wochen</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-700">Rückführbarkeit</td>
                  <td className="px-6 py-3 text-slate-700">Nationale Normale</td>
                  <td className="px-6 py-3 text-slate-700">Nationale Normale</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-700">Audit-tauglich</td>
                  <td className="px-6 py-3 text-slate-700">Für die meisten Anwendungen</td>
                  <td className="px-6 py-3 text-slate-700">Pflicht bei behördlichen Auflagen</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-accent-50 border border-accent-200 rounded-xl p-6 mb-8">
            <p className="text-sm text-accent-800">
              <strong>Tipp:</strong> Für die meisten Unternehmen reicht eine Werkskalibrierung aus.
              Eine DAkkS-Kalibrierung ist nur nötig, wenn behördliche Auflagen es explizit verlangen
              (z.B. Eichpflicht, Pharma, Luftfahrt).{' '}
              <a href="/werkskalibrierung-vs-dakks" className="text-accent-600 underline hover:text-accent-700">
                Mehr zum Unterschied →
              </a>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">
            Zusatzkosten im Überblick
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Position</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Kosten (netto)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-700">Rückversand (Paket)</td>
                  <td className="px-6 py-3 text-right font-semibold">15,00 EUR</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-700">Rückversand (Palette)</td>
                  <td className="px-6 py-3 text-right font-semibold">nach Aufwand</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-700">Einsendung</td>
                  <td className="px-6 py-3 text-right font-semibold">auf Ihre Kosten</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-700">Mindestauftragswert</td>
                  <td className="px-6 py-3 text-right font-semibold">40,00 EUR</td>
                </tr>
              </tbody>
            </table>
          </div>

          <a
            href="/kalibrierservice"
            className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium transition-colors"
          >
            Mehr zu unserem Kalibrierservice
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <PageFAQ
        faqs={[
          {
            question: 'Wie setzen sich die Kalibrierkosten zusammen?',
            answer: 'Die Kalibrierkosten ergeben sich aus dem Gerätetyp, dem zu kalibrierenden Messbereich und der Anzahl der Kalibrierpunkte. Einfache Einkanal-Geräte sind günstiger als Mehrkanal-Geräte mit erweitertem Messbereich. Zusätzlich fällt eine Rückversandpauschale von 15 EUR netto an.',
          },
          {
            question: 'Sind Versandkosten in den Kalibrierpreisen enthalten?',
            answer: 'Die Einsendung Ihrer Geräte erfolgt auf Ihre Kosten. Der Rückversand nach der Kalibrierung beträgt pauschal 15 EUR netto zzgl. MwSt. Bei Palettenversand werden die Kosten nach Aufwand berechnet.',
          },
          {
            question: 'Gibt es Mengenrabatte bei der Kalibrierung?',
            answer: 'Ja, ab 10 Geräten desselben Typs erstellen wir Ihnen ein individuelles Angebot mit Mengenrabatt. Kontaktieren Sie uns mit Ihrer Geräteliste — wir kalkulieren innerhalb von 24 Stunden.',
          },
          {
            question: 'Was ist der Unterschied zwischen Werkskalibrierung und DAkkS-Kalibrierung?',
            answer: 'Eine Werkskalibrierung nach ISO-Normen kostet typischerweise 8–200 EUR und dauert 5–10 Werktage. Eine akkreditierte DAkkS-Kalibrierung kostet 50–500+ EUR und dauert 2–6 Wochen. Für die meisten Industrieanwendungen reicht die Werkskalibrierung aus. Eine DAkkS-Kalibrierung ist nur bei behördlichen Auflagen (z.B. Eichpflicht, Pharma) erforderlich.',
          },
          {
            question: 'Gibt es einen Mindestauftragswert?',
            answer: 'Ja, der Mindestauftragswert beträgt 40 EUR netto. Dies entspricht z.B. der Kalibrierung eines Multimeters oder zweier Messschieber. Versandkosten werden separat berechnet.',
          },
        ]}
      />
    </div>
  );
}
