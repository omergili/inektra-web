'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface Device {
  id: number;
  article_number: string;
  name: string;
  device_standard: string | null;
  device_type: string | null;
  price_euro: number;
  calibration_type: string;
  category?: string;
}

interface Category {
  name: string;
  slug: string;
  deviceCount: number;
  priceRange: {
    min: number;
    max: number;
    avg: number;
  };
}

export default function PreisePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Kategorien laden
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  // Suche durchführen
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.length >= 2 || selectedCategory) {
        performSearch();
      } else {
        setDevices([]);
        setTotal(0);
      }
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

      const res = await fetch(`/api/search?${params}`);
      const data = await res.json();
      
      setDevices(data.devices || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden min-h-[280px] flex items-center">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kalibrierpreise <span className="text-accent-500">durchsuchen</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Über 3.200 Gerätetypen • Transparente Preise • Sofortige Auskunft
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
              placeholder="Gerät suchen (z.B. Multimeter, Oszilloskop, Messschieber...)"
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none transition-all"
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-slate-600">
              {loading ? 'Suche läuft...' : `${total} Geräte gefunden`}
            </p>
          )}
        </div>

        {/* Kategorien-Filter */}
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
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-accent-500 text-white shadow-lg'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-accent-500'
                }`}
              >
                {cat.name}
                <span className="ml-2 text-sm opacity-75">({cat.deviceCount})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ergebnisse */}
        {devices.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Gerät</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Norm/Standard</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Typ/Bereich</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Kategorie</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Preis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {devices.map((device) => (
                    <tr key={device.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{device.name}</div>
                        <div className="text-sm text-slate-500">Art.-Nr. {device.article_number}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {device.device_standard || '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {device.device_type || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                          {device.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-bold text-accent-600">
                          {formatPrice(device.price_euro)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : searchQuery.length >= 2 || selectedCategory ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-slate-600">
              {loading ? 'Suche läuft...' : 'Keine Geräte gefunden'}
            </p>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <MagnifyingGlassIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">
              Geben Sie mindestens 2 Zeichen ein oder wählen Sie eine Kategorie
            </p>
          </div>
        )}

        {/* Info-Box */}
        <div className="mt-8 bg-accent-50 border border-accent-200 rounded-xl p-6">
          <h3 className="font-semibold text-accent-900 mb-2">💡 Hinweise zur Preissuche</h3>
          <ul className="space-y-1 text-sm text-accent-800">
            <li>• Alle Preise verstehen sich netto zzgl. MwSt.</li>
            <li>• Versandkosten: 15 € netto (Palettenversand nach Aufwand)</li>
            <li>• Werkskalibrierung nach ISO-Normen (nicht akkreditiert)</li>
            <li>• Lieferzeit: i.d.R. 5-10 Werktage</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
