'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/lib/config';
import { hasMarketingConsent } from '@/lib/consent';

/**
 * Google Ads Global Site Tag (gtag.js) mit Consent Mode v2.
 *
 * gtag.js wird IMMER geladen (mit consent denied als Default).
 * So kann Google Consent Mode v2 anonymisierte/modellierte Conversions
 * erfassen — auch ohne expliziten Marketing-Consent.
 *
 * Bei Marketing-Consent: consent update auf granted → volle Daten.
 * Ohne Marketing-Consent: Google modelliert Conversions aus anonymisierten Pings.
 */
export default function GoogleAdsTag() {
  const { conversionId } = siteConfig.googleAds;

  useEffect(() => {
    // Consent-Update wenn Marketing-Consent bereits erteilt
    if (hasMarketingConsent() && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted',
      });
    }

    // Auf Consent-Aenderungen reagieren (vom CookieConsent-Banner)
    const handleConsentUpdate = () => {
      if (hasMarketingConsent() && typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted',
        });
      }
    };
    window.addEventListener('consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('consent-updated', handleConsentUpdate);
  }, []);

  if (!conversionId) return null;

  return (
    <>
      {/* Consent Mode v2 Default + gtag.js — IMMER laden */}
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
          });
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}');
        `}
      </Script>
    </>
  );
}

/**
 * Conversion-Event an Google Ads senden.
 * Feuert IMMER — Google Consent Mode v2 regelt den Datenschutz:
 * - Mit Consent: volle Conversion-Daten
 * - Ohne Consent: anonymisiertes Signal → Google modelliert die Conversion
 */
export function trackConversion() {
  const { conversionId, conversionLabel } = siteConfig.googleAds;

  if (!conversionId || !conversionLabel) {
    console.log('[Google Ads] Conversion-Label nicht konfiguriert');
    return;
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
    });
    console.log('[Google Ads] Conversion getrackt (Consent Mode v2 aktiv)');
  }
}

/**
 * Click-to-Call Conversion-Event an Google Ads senden.
 * Feuert IMMER — Google Consent Mode v2 regelt den Datenschutz.
 */
export function trackPhoneConversion() {
  const { conversionId, phoneConversionLabel } = siteConfig.googleAds;

  if (!conversionId || !phoneConversionLabel) {
    console.log('[Google Ads] Phone-Conversion-Label nicht konfiguriert');
    return;
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${phoneConversionLabel}`,
    });
    console.log('[Google Ads] Phone-Conversion getrackt (Consent Mode v2 aktiv)');
  }
}
