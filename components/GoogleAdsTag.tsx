'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/lib/config';
import { hasMarketingConsent } from '@/lib/consent';

/**
 * Google Ads Global Site Tag (gtag.js) mit Consent Mode v2.
 *
 * - Consent Mode v2 Default wird IMMER gesetzt (denied).
 * - gtag.js und Config werden NUR geladen wenn Marketing-Consent erteilt.
 * - Lauscht auf 'consent-updated' Event vom CookieConsent-Banner.
 */
export default function GoogleAdsTag() {
  const { conversionId } = siteConfig.googleAds;
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Initialen Consent-Status pruefen
    setConsentGranted(hasMarketingConsent());

    // Auf Consent-Aenderungen reagieren (vom CookieConsent-Banner)
    const handleConsentUpdate = () => {
      setConsentGranted(hasMarketingConsent());
    };
    window.addEventListener('consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('consent-updated', handleConsentUpdate);
  }, []);

  if (!conversionId) return null;

  return (
    <>
      {/* Google Consent Mode v2 – IMMER rendern (Default: alles denied) */}
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

      {/* gtag.js + Config NUR bei Marketing-Consent */}
      {consentGranted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
              });
              gtag('js', new Date());
              gtag('config', '${conversionId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

/**
 * Conversion-Event an Google Ads senden.
 * Prueft Marketing-Consent vor dem Feuern.
 * Aufruf nach erfolgreichem Kontaktformular-Submit.
 */
export function trackConversion() {
  const { conversionId, conversionLabel } = siteConfig.googleAds;

  if (!conversionId || !conversionLabel) {
    console.log('[Google Ads] Conversion-Label nicht konfiguriert');
    return;
  }

  if (!hasMarketingConsent()) {
    console.log('[Google Ads] Marketing-Consent nicht erteilt, Conversion nicht getrackt');
    return;
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
    });
    console.log('[Google Ads] Conversion getrackt');
  }
}

/**
 * Click-to-Call Conversion-Event an Google Ads senden.
 * Prueft Marketing-Consent vor dem Feuern.
 * Aufruf bei Klick auf tel:-Links.
 */
export function trackPhoneConversion() {
  const { conversionId, phoneConversionLabel } = siteConfig.googleAds;

  if (!conversionId || !phoneConversionLabel) {
    console.log('[Google Ads] Phone-Conversion-Label nicht konfiguriert');
    return;
  }

  if (!hasMarketingConsent()) {
    console.log('[Google Ads] Marketing-Consent nicht erteilt, Phone-Conversion nicht getrackt');
    return;
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${phoneConversionLabel}`,
    });
    console.log('[Google Ads] Phone-Conversion getrackt');
  }
}
