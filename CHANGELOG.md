# Changelog – inektra-web

**Projekt:** Webseite der inektra GmbH (Kalibrierservice)
**Domain:** inektra.de
**Stack:** Next.js 16, TypeScript, Tailwind CSS 4, React 19
**Deployment:** Vercel (Auto-Deploy auf main)

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

**Letzte Aktualisierung:** 09.03.2026 (v1.3.0)
