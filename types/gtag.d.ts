// Google Ads gtag.js + Consent Mode v2 Type Declarations

interface Window {
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
}

// Consent Mode v2 Typen
type GtagConsentAction = 'default' | 'update';
type GtagConsentValue = 'granted' | 'denied';

interface GtagConsentParams {
  ad_storage?: GtagConsentValue;
  ad_user_data?: GtagConsentValue;
  ad_personalization?: GtagConsentValue;
  analytics_storage?: GtagConsentValue;
  wait_for_update?: number;
}

// gtag() Overloads
declare function gtag(command: 'consent', action: GtagConsentAction, params: GtagConsentParams): void;
declare function gtag(command: 'js', date: Date): void;
declare function gtag(command: 'config', targetId: string, config?: Record<string, unknown>): void;
declare function gtag(command: 'event', eventName: string, eventParams?: Record<string, unknown>): void;
