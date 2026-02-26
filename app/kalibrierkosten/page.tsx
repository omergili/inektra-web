'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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

export default function KalibrierKostenPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ToolboxxItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [fetchedAt, setFetchedAt] = useState('');

  // Suche durchführen
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performSearch();
      } else {
        // Lade erste 50 Items
        performSearch();
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
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
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-96 py-16 w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kalibrierkosten <span className="text-accent-500">Übersicht</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Über {total > 0 ? total.toLocaleString('de-DE') : '3.600'} Kalibrierleistungen • Transparente Preise • Werkskalibrierung
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
          <h3 className="font-semibold text-accent-900 mb-2">💡 Hinweise zu den Kalibrierkosten</h3>
          <ul className="space-y-1 text-sm text-accent-800">
            <li>• Alle Preise verstehen sich netto zzgl. MwSt.</li>
            <li>• Versandkosten: 15 € netto (Palettenversand nach Aufwand)</li>
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
    </div>
  );
}
