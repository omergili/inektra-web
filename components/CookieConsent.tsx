'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getConsent, setConsent, clearConsent } from '@/lib/consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  useEffect(() => {
    // Consent-Status client-seitig pruefen
    const consent = getConsent();
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setConsent(true);
    setIsVisible(false);
    window.dispatchEvent(new Event('consent-updated'));
  };

  const handleEssentialOnly = () => {
    setConsent(false);
    setIsVisible(false);
    window.dispatchEvent(new Event('consent-updated'));
  };

  const handleSaveSettings = () => {
    setConsent(marketingChecked);
    setIsVisible(false);
    window.dispatchEvent(new Event('consent-updated'));
  };

  // SSR-sicher: Nichts rendern bis useEffect gelaufen ist
  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-describedby="cookie-description"
      className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-neutral-200 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Text */}
          <div id="cookie-description">
            <h3 className="text-base font-bold text-neutral-900 mb-1">
              Diese Website verwendet Cookies
            </h3>
            <p className="text-sm text-neutral-600">
              Wir nutzen essenzielle Cookies fuer den Betrieb der Website und optionale Marketing-Cookies
              fuer Google Ads Conversion-Tracking. Marketing-Cookies werden nur mit Ihrer Einwilligung gesetzt.{' '}
              <Link href="/datenschutz" className="text-accent-600 hover:underline font-medium">
                Datenschutzerklaerung
              </Link>
            </p>
          </div>

          {/* Einstellungen (aufklappbar) */}
          {showSettings && (
            <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
              {/* Essenzielle Cookies */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-essential"
                  checked={true}
                  disabled
                  className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded"
                />
                <label htmlFor="consent-essential" className="text-sm">
                  <span className="font-medium text-neutral-900">Essenzielle Cookies</span>
                  <span className="block text-neutral-500 text-xs mt-0.5">
                    Notwendig fuer den Betrieb der Website. Koennen nicht deaktiviert werden.
                  </span>
                </label>
              </div>
              {/* Marketing-Cookies */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-marketing"
                  checked={marketingChecked}
                  onChange={(e) => setMarketingChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="consent-marketing" className="text-sm">
                  <span className="font-medium text-neutral-900">Marketing-Cookies (Google Ads)</span>
                  <span className="block text-neutral-500 text-xs mt-0.5">
                    Ermoeglicht die Messung der Wirksamkeit unserer Google Ads Anzeigen durch Conversion-Tracking.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
            {!showSettings ? (
              <button
                onClick={() => setShowSettings(true)}
                className="text-sm text-neutral-500 hover:text-neutral-700 underline transition-colors order-3 sm:order-1 sm:mr-auto"
              >
                Einstellungen
              </button>
            ) : (
              <button
                onClick={handleSaveSettings}
                className="text-sm text-neutral-500 hover:text-neutral-700 underline transition-colors order-3 sm:order-1 sm:mr-auto"
              >
                Auswahl speichern
              </button>
            )}
            <button
              onClick={handleEssentialOnly}
              className="border-2 border-neutral-300 text-neutral-700 px-6 py-3 rounded-xl font-medium hover:border-neutral-400 hover:bg-neutral-50 transition-all text-sm order-2"
            >
              Nur essenzielle
            </button>
            <button
              onClick={handleAcceptAll}
              className="bg-accent-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl text-sm order-1 sm:order-3"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Button fuer den Footer – oeffnet die Cookie-Einstellungen erneut.
 * Wird als Client-Komponente in den Server-Component Footer importiert.
 */
export function CookieSettingsButton() {
  return (
    <button
      onClick={() => {
        clearConsent();
        window.location.reload();
      }}
      className="hover:text-white transition-colors text-left"
    >
      Cookie-Einstellungen
    </button>
  );
}
