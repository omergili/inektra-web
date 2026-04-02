/**
 * Attribution-Tracking für inektra.de
 *
 * Beim ersten Besuch: GCLID, UTM-Parameter, Referrer und Landing Page
 * in einem First-Party-Cookie speichern. Beim Formular-Submit werden
 * die Daten als Hidden Fields mitgeschickt.
 *
 * DSGVO: Eigenes JS, nur First-Party-Cookie, keine Drittanbieter.
 */

const COOKIE_NAME = '_inektra_attrib';
const COOKIE_DAYS = 90;

export interface AttributionData {
  gclid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  referrer: string;
  landing_page: string;
  domain: string;
  first_visit: string;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Beim ersten Seitenaufruf aufrufen.
 * Speichert Attribution-Daten nur beim ERSTEN Besuch (First-Touch).
 */
export function initTracking(): void {
  // Nur im Browser
  if (typeof window === 'undefined') return;

  // Wenn schon ein Cookie existiert → nichts tun (First-Touch bleibt)
  if (getCookie(COOKIE_NAME)) return;

  const params = new URLSearchParams(window.location.search);

  const data: AttributionData = {
    gclid: params.get('gclid') || '',
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    referrer: document.referrer || '',
    landing_page: window.location.pathname,
    domain: window.location.hostname,
    first_visit: new Date().toISOString(),
  };

  // Source ableiten wenn keine UTM-Parameter gesetzt
  if (!data.utm_source) {
    if (data.gclid) {
      data.utm_source = 'google';
      data.utm_medium = 'cpc';
    } else if (data.referrer) {
      try {
        const ref = new URL(data.referrer);
        if (ref.hostname.includes('google')) {
          data.utm_source = 'google';
          data.utm_medium = 'organic';
        } else if (ref.hostname.includes('bing')) {
          data.utm_source = 'bing';
          data.utm_medium = 'organic';
        } else {
          data.utm_source = ref.hostname;
          data.utm_medium = 'referral';
        }
      } catch {
        data.utm_source = 'unknown';
        data.utm_medium = 'referral';
      }
    } else {
      data.utm_source = 'direct';
      data.utm_medium = 'none';
    }
  }

  setCookie(COOKIE_NAME, JSON.stringify(data), COOKIE_DAYS);
}

/**
 * Attribution-Daten aus Cookie lesen.
 * Wird beim Formular-Submit aufgerufen.
 */
export function getAttribution(): AttributionData | null {
  if (typeof window === 'undefined') return null;

  const raw = getCookie(COOKIE_NAME);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
