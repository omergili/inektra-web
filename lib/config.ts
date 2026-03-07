/**
 * Central site configuration
 * All environment variables and constants in one place
 */

export const siteConfig = {
  // Domain & Branding
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'inektra.de',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://inektra.de',
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || 'inektra GmbH',
  
  // Site Metadata (Default-Title wird im Layout als Fallback genutzt)
  name: 'Kalibrierservice – Professionelle Werkskalibrierung',
  description: 'Professionelle Werkskalibrierung nach ISO-Normen. Über 3.200 kalibrierbare Gerätetypen. Labor in Nordhorn. Schnelle Bearbeitung, faire Preise, deutschlandweit.',
  keywords: [
    'kalibrierservice',
    'werkskalibrierung',
    'messgeräte kalibrieren',
    'kalibrierung dienstleister',
    'kalibrierlabor',
    'messmittel kalibrierung',
    'iso kalibrierung',
    'kalibrierung nordhorn',
  ],
  
  // Contact
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || '+49 5921 72 31 00',
    email: process.env.NEXT_PUBLIC_EMAIL || 'info@inektra.de',
    address: {
      // Labor-Adresse (Nordhorn)
      street: 'Losserstr. 4',
      city: '48527 Nordhorn',
      country: 'Deutschland',
      // Ehemals
      subtitle: 'ehemals Calpro Hagels/Theußing GmbH & Co. KG',
    },
    // Firmensitz (für Impressum)
    legal_address: {
      street: 'Zum Jadebusen 73',
      city: '26316 Varel',
      country: 'Deutschland',
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
    { name: 'Kalibrierkosten', href: '/kalibrierkosten' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  
  // SEO (OG-Image wird via app/opengraph-image.tsx generiert)
  seo: {},
};

export type SiteConfig = typeof siteConfig;
