/**
 * Central site configuration
 * All environment variables and constants in one place
 */

export const siteConfig = {
  // Domain & Branding
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'kalibrierservice.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kalibrierservice.com',
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || 'inektra GmbH',
  
  // Site Metadata
  name: 'Kalibrierservice | Professionelle Messgeräte-Kalibrierung',
  description: 'Präzise Kalibrierung für Industrie & Labor. Vor-Ort-Service deutschlandweit. ISO 9001 zertifiziert. Schnell, zuverlässig, akkreditiert.',
  keywords: [
    'kalibrierservice',
    'messgeräte kalibrieren',
    'kalibrierung dienstleister',
    'vor ort kalibrierung',
    'mobile kalibrierung',
    'kalibrierlabor',
    'messmittel kalibrierung',
  ],
  
  // Contact
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || '+49 5921 72 31 00',
    email: process.env.NEXT_PUBLIC_EMAIL || 'info@inektra.com',
    address: {
      street: process.env.NEXT_PUBLIC_ADDRESS_STREET || 'Zum Jadebusen 73',
      city: process.env.NEXT_PUBLIC_ADDRESS_CITY || '26316 Varel',
      country: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY || 'Deutschland',
    },
  },
  
  // Legal
  legal: {
    company: process.env.NEXT_PUBLIC_COMPANY_LEGAL || 'inektra GmbH',
    ceo: process.env.NEXT_PUBLIC_COMPANY_CEO || 'Arthur Barasch',
    register: process.env.NEXT_PUBLIC_COMPANY_REGISTER || 'HRB 200998 B',
    registerCourt: process.env.NEXT_PUBLIC_COMPANY_REGISTER_COURT || 'Amtsgericht Charlottenburg',
    vatId: process.env.NEXT_PUBLIC_VAT_ID || 'DE320727155',
  },
  
  // Navigation
  navigation: [
    { name: 'Kalibrierservice', href: '/kalibrierservice' },
    { name: 'Messgeräte', href: '/messgeraete-kalibrieren' },
    { name: 'Vor-Ort-Service', href: '/vor-ort-kalibrierung' },
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  
  // SEO
  seo: {
    ogImage: '/og-image.jpg',
    twitterHandle: '@inektra', // später anpassen
  },
} as const;

export type SiteConfig = typeof siteConfig;
