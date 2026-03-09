# Changelog – inektra-web

**Projekt:** Webseite der inektra GmbH (Kalibrierservice)
**Domain:** inektra.de
**Stack:** Next.js 16, TypeScript, Tailwind CSS 4, React 19
**Deployment:** Vercel (Auto-Deploy auf main)

---

## [1.4.0] – 2026-03-09

### DSGVO: Cookie-Consent-Banner
- **Cookie-Banner:** Neue Komponente `components/CookieConsent.tsx` – fixed bottom, z-[60], "Alle akzeptieren" / "Nur essenzielle" / aufklappbare granulare Einstellungen
- **Consent-Utility:** Neues Modul `lib/consent.ts` – localStorage + Cookie, 13 Monate Ablauf, Version 1.0
- **Google Consent Mode v2:** `GoogleAdsTag.tsx` komplett umgebaut – Consent Default (denied) immer gesetzt, gtag.js nur bei Marketing-Consent geladen
- **trackConversion():** Prueft `hasMarketingConsent()` vor dem Feuern
- **Footer:** "Cookie-Einstellungen" Link via `CookieSettingsButton` (loescht Consent + Reload)
- **Custom Event:** `consent-updated` verbindet Banner mit GoogleAdsTag fuer dynamisches Nachladen
- **TypeScript:** `types/gtag.d.ts` um Consent Mode v2 Typen erweitert

### Datenschutzerklaerung erweitert
- **Hosting:** Vercel Inc. mit Adresse, Rechtsgrundlage, EU-Standardvertragsklauseln
- **Cookies:** Essenzielle (localStorage, TTDSG §25 Abs. 2) + Marketing (Google Ads, nur nach Einwilligung)
- **Google Ads Conversion-Tracking:** Anbieter, Zweck, Consent Mode v2, Datentransfer USA
- **Widerruf:** Cookie-Einstellungen im Footer, 13 Monate Ablauf
- **E-Mail-Verarbeitung:** Resend Inc. mit Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO

### Tests
- **8 neue Playwright-Tests** (35 total): Banner-Erscheinen, Akzeptieren, Ablehnen, Consent-Persistenz, Consent Mode v2 Default, Datenschutz-Link, Footer-Link, Einstellungen-Panel
- Bestehende Tests angepasst (exakte Locatoren fuer "Alle"-Button)

---

## [1.3.0] – 2026-03-09

### Google Ads Conversion-Tracking
- **Neues Google Ads Konto:** 981-989-9245 (inektra GmbH, eigenständig)
- **gtag.js:** Neue Komponente `components/GoogleAdsTag.tsx` – lädt Google Tag (AW-18003383640) auf allen Seiten
- **Conversion-Tracking:** `trackConversion()` feuert bei erfolgreichem Kontaktformular-Submit
- **Conversion-Aktion:** „Kontaktformular_gesendet" (Lead-Formular senden, 50 EUR Wert, primäre Aktion)
- **Konfiguration:** `siteConfig.googleAds` in `lib/config.ts` (conversionId + conversionLabel)
- **TypeScript:** Neue Deklarationen `types/gtag.d.ts` für `window.gtag` und `window.dataLayer`
- **Integration:** `ContactSidebar.tsx` ruft `trackConversion()` auf, `layout.tsx` bindet `<GoogleAdsTag />` ein

---

## [1.2.0] – 2026-03-07

### SEO-Optimierung
- **Structured Data (JSON-LD):** LocalBusiness im Root Layout, Service + OfferCatalog auf /kalibrierservice, FAQPage automatisch auf 5 Seiten via PageFAQ-Komponente
- **OG-Image:** Dynamischer Generator (`app/opengraph-image.tsx`, 1200×630 PNG, Edge Runtime)
- **Breadcrumbs:** Neue Komponente (`components/Breadcrumbs.tsx`) mit sichtbarer Navigation + BreadcrumbList JSON-LD auf 6 Unterseiten
- **Sitemap:** Dynamische XML-Sitemap (`app/sitemap.ts`, 7 Seiten mit Prioritäten)
- **Interne Verlinkung:** Homepage um 3. Service-Karte (Kalibrierkosten) und FAQ-Teaser erweitert, Footer-Links ergänzt (Kalibrierkosten, FAQ)
- **Accessibility:** Skip-to-Content Link im Root Layout, `id="main-content"` auf `<main>`
- **Config bereinigt:** `ogImage`/`twitterHandle` Placeholder aus `lib/config.ts` entfernt

---

## [1.1.0] – 2026-03-07

### SEO & Indexierung
- Indexierung aktiviert: `robots: index/follow`, `robots.txt: Allow /`
- Domain von kalibrierservice.com auf **inektra.de** umgestellt
- Canonical-URLs auf allen 7 Seiten korrigiert
- Googlebot-Direktiven: max-video-preview, max-image-preview, max-snippet

### Infrastruktur
- Supabase/PostgreSQL-Anbindung komplett entfernt (Code, Dependencies, Vercel-Integration)
- Entfernte Dateien: `lib/supabase.ts`, `lib/db.ts`, `app/api/category/[slug]/route.ts`, `app/api/test-db/route.ts`, `database/schema.sql`
- Entfernte Dependencies: `@supabase/supabase-js`, `pg`, `@vercel/blob`, `nodemailer`, `@types/pg`, `@types/nodemailer`
- Vercel Supabase-Integration deinstalliert (beide Datenbanken geloescht)

---

## [1.0.0] – 2026-02-21 bis 2026-03-06

### Seiten
- Homepage mit Hero, USPs, Services, CTA
- Kalibrierservice (Prozess, Vorteile, FAQs)
- Messgeraete-Kalibrieren (6 Geraetekategorien)
- Kalibrierkosten (durchsuchbarer Katalog, 3.200+ Eintraege)
- Kontakt, Ueber uns, FAQ (10 FAQs mit JSON-LD)
- Impressum, Datenschutz (noindex)

### Komponenten
- Header (sticky, Mobile-Hamburger-Menue)
- Footer (dark, 4-Spalten-Grid)
- ContactSidebar (Schnellanfrage auf allen Seiten, Datei-Upload)
- EmailLink (mailto + Copy-to-Clipboard)
- PageFAQ (wiederverwendbares Akkordeon)

### API-Routes
- `/api/contact` – Kontaktformular via Resend API
- `/api/toolboxx/items` – Produktkatalog mit Suche, Filter, Kategorien

### Design
- Orange-Akzentfarbe aus Logo (#ea580c)
- Gradient-Hero-Sections (Slate)
- WCAG-konforme Kontraste
- Accessibility: Focus-visible, Screen-Reader, Skip-Links

### Infrastruktur
- Vercel Deployment mit Auto-Deploy
- Security Headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- toolboxx.biz Prebuild-Script fuer Produktdaten
- 27 Playwright E2E-Tests

### Korrekturen
- Falsche Akkreditierungs-Claims entfernt (nur Werkskalibrierung)
- Versandkosten korrigiert (Einsendung auf Kundenkosten)
- SMTP auf Resend API umgestellt
- Kontaktformular E-Mail auf info@inektra.de

---

**Letzte Aktualisierung:** 09.03.2026 (v1.4.0)
