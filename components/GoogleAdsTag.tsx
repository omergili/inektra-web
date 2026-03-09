'use client';

import Script from 'next/script';
import { siteConfig } from '@/lib/config';

/**
 * Google Ads Global Site Tag (gtag.js)
 * Laedt auf allen Seiten fuer Conversion-Tracking und Remarketing.
 */
export default function GoogleAdsTag() {
  const { conversionId } = siteConfig.googleAds;

  if (!conversionId) return null;

  return (
    <>
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
 * Aufruf nach erfolgreichem Kontaktformular-Submit.
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
    console.log('[Google Ads] Conversion getrackt');
  }
}
