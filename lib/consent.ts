/**
 * Cookie-Consent Utility
 *
 * Zentrale Logik fuer DSGVO-konforme Einwilligungsverwaltung.
 * Speichert Consent in localStorage + Cookie (fuer ggf. serverseitige Erkennung).
 * Ablauf: 13 Monate (DSGVO-Standard).
 */

export type ConsentCategory = 'essential' | 'marketing';

export interface ConsentState {
  essential: boolean;    // Immer true (kann nicht abgelehnt werden)
  marketing: boolean;    // Google Ads, gtag.js
  timestamp: number;     // Date.now() bei Consent-Erteilung
  version: string;       // Fuer zukuenftige Migrationen
}

const STORAGE_KEY = 'cookie-consent';
const COOKIE_NAME = 'cookie-consent';
const CONSENT_VERSION = '1.0';
const EXPIRY_MONTHS = 13;

// 13 Monate in Millisekunden
const EXPIRY_MS = EXPIRY_MONTHS * 30 * 24 * 60 * 60 * 1000;
// 13 Monate in Sekunden (fuer Cookie max-age)
const EXPIRY_SECONDS = EXPIRY_MONTHS * 30 * 24 * 60 * 60;

/**
 * Consent aus localStorage lesen.
 * Gibt null zurueck wenn kein Consent vorhanden oder abgelaufen.
 */
export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const state: ConsentState = JSON.parse(stored);

    // Ablauf pruefen (13 Monate)
    if (Date.now() - state.timestamp > EXPIRY_MS) {
      clearConsent();
      return null;
    }

    return state;
  } catch {
    return null;
  }
}

/**
 * Consent setzen und speichern.
 * Essential ist immer true, Marketing wird per Parameter gesteuert.
 */
export function setConsent(marketing: boolean): ConsentState {
  const state: ConsentState = {
    essential: true,
    marketing,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  // localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    // Cookie setzen (fuer ggf. serverseitige Erkennung)
    const value = marketing ? 'all' : 'essential';
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${EXPIRY_SECONDS}; SameSite=Lax; Secure`;
  }

  return state;
}

/**
 * Kurzform: Wurde Marketing-Consent erteilt?
 */
export function hasMarketingConsent(): boolean {
  return getConsent()?.marketing === true;
}

/**
 * Consent widerrufen (localStorage + Cookie loeschen).
 * Banner erscheint nach Reload erneut.
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEY);
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax; Secure`;
}
