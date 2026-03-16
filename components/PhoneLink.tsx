'use client';

import { siteConfig } from '@/lib/config';
import { trackPhoneConversion } from './GoogleAdsTag';

interface PhoneLinkProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Telefon-Link mit Google Ads Click-to-Call Conversion-Tracking.
 * Ersetzt alle manuellen tel:-Links im Projekt.
 *
 * Rendert die Telefonnummer aus siteConfig.contact.phone.
 * Bei Klick wird trackPhoneConversion() aufgerufen (consent-aware).
 */
export default function PhoneLink({ className, children }: PhoneLinkProps) {
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;

  return (
    <a
      href={phoneHref}
      className={className}
      onClick={() => trackPhoneConversion()}
    >
      {children ?? siteConfig.contact.phone}
    </a>
  );
}
