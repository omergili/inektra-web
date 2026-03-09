# CLAUDE.md – inektra Kalibrierservice Webseite

## Projekt-Überblick

Unternehmenswebseite der **inektra GmbH** – ein Kalibrierdienstleister mit Labor in Nordhorn (ehemals Calpro Hagels/Theußing GmbH & Co. KG). Die Webseite dient der Lead-Generierung für Werkskalibrierungen und zeigt einen durchsuchbaren Katalog mit über 3.200 kalibrierbaren Gerätetypen.

**Domain:** inektra.de
**Sprache:** Deutsch (de_DE)
**Deployment:** Vercel (Auto-Deploy bei Push/Merge auf main)
**Status:** Live, Indexierung aktiviert (robots: index/follow, robots.txt: Allow /)
**Repository:** github.com/omergili/inektra-web (private)

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Sprache:** TypeScript 5 (strict mode)
- **UI:** React 19.2.3, Tailwind CSS 4 (PostCSS-Plugin)
- **E-Mail:** Resend 6.9.2 (Kontaktformular → info@inektra.de)
- **Produktdaten:** toolboxx.biz API (prebuild-Script → `data/toolboxx-items.json`)
- **Icons:** @heroicons/react 2.2.0
- **Tests:** Playwright 1.58.2 (E2E-Tests gegen localhost:3000)
- **Linting:** ESLint 9 mit eslint-config-next

## Befehle

```bash
npm run dev          # Next.js Dev-Server (Port 3000)
npm run build        # Build (führt vorher fetch-toolboxx aus)
npm run lint         # ESLint
npm test             # Playwright E2E-Tests
npm run test:ui      # Playwright mit UI
npm run test:report  # Playwright Report anzeigen
```

**Dev-Server für Claude Preview:** Port 3001 (konfiguriert in `.claude/launch.json`)

## Projektstruktur

```
app/                       # Next.js App Router Seiten
├── layout.tsx             # Root Layout (Header, Footer, ContactSidebar, LocalBusiness JSON-LD)
├── page.tsx               # Homepage (Hero, USPs, 3 Services, FAQ-Teaser, CTA)
├── globals.css            # Tailwind + Custom CSS (Accessibility)
├── robots.ts              # SEO robots.txt (Allow /, Disallow /api/)
├── sitemap.ts             # Dynamische XML-Sitemap (7 Seiten)
├── opengraph-image.tsx    # Dynamischer OG-Image Generator (1200×630, Edge Runtime)
├── api/
│   ├── contact/route.ts   # POST: Kontaktformular → Resend E-Mail
│   └── toolboxx/items/route.ts  # GET: Kalibrier-Katalog (Suche, Filter, Kategorien)
├── kalibrierservice/      # Leistungsseite (Prozess, Vorteile, FAQs, Service JSON-LD)
├── messgeraete-kalibrieren/ # Messgeräte-Kalibrierung (6 Gerätekategorien)
├── kalibrierkosten/       # Preisübersicht mit Suche (Client Component, 300ms Debounce)
├── kontakt/               # Kontaktseite
├── ueber-uns/             # Über uns (Geschichte, Werte)
├── faq/                   # FAQ-Seite (10 FAQs, JSON-LD Schema)
├── impressum/             # Impressum (noindex, follow)
└── datenschutz/           # Datenschutzerklärung (noindex, follow)

components/
├── Header.tsx             # Sticky Header mit Mobile-Hamburger-Menü ('use client')
├── Footer.tsx             # Footer mit Kontaktinfos und internen Links (Server Component)
├── ContactSidebar.tsx     # Rechte Sidebar mit Schnellanfrage-Formular ('use client')
├── GoogleAdsTag.tsx       # Google Ads gtag.js + Consent Mode v2 + trackConversion() ('use client')
├── CookieConsent.tsx      # Cookie-Consent-Banner + CookieSettingsButton ('use client')
├── Breadcrumbs.tsx        # Breadcrumb-Navigation + BreadcrumbList JSON-LD (Server Component)
├── EmailLink.tsx          # E-Mail-Link mit Copy-to-Clipboard ('use client')
├── PageFAQ.tsx            # FAQ-Akkordeon mit FAQPage JSON-LD ('use client')
└── dashboard/             # Dashboard-Komponenten (interne Nutzung)

types/
└── gtag.d.ts              # TypeScript-Deklarationen für window.gtag/dataLayer + Consent Mode v2

lib/
├── config.ts              # Zentrale Konfiguration (siteConfig)
└── consent.ts             # Cookie-Consent-Utility (localStorage + Cookie, 13 Monate Ablauf)

scripts/
├── fetch-toolboxx.mjs     # Prebuild: Holt Produktdaten von toolboxx.biz API
└── generate-favicons.py   # Generiert Favicon-Set (Pillow, alle Groessen + SVG + ICO)

tests/
└── features.test.ts       # 35 Regression-Tests (Playwright)

docs/
├── google-ads-kampagne.md # Google Ads Kampagnen-Dokumentation + Aenderungshistorie
└── sistrix-keywords.md    # 50 SISTRIX-Tracking-Keywords (9 Kategorien)

public/                    # Statische Assets (Logo, Favicon, Icons)
├── favicon.ico            # Multi-Size ICO (16+32+48)
├── icon.svg               # SVG-Favicon (Hero Dark + i)
├── favicon-16x16.png      # Pixel-perfektes 16px Favicon
├── favicon-32x32.png      # 32px Favicon (Google SERP)
├── favicon-48x48.png      # 48px Favicon
├── icon-192x192.png       # PWA-Icon 192px
├── icon-512x512.png       # PWA-Icon 512px
├── apple-touch-icon.png   # Apple Touch Icon (180x180)
└── site.webmanifest       # Web App Manifest (Theme: #0f172a)

data/
└── toolboxx-items.json    # Gecachte Produktdaten (gitignored, wird beim Build erzeugt)
```

## Architektur-Muster

### Layout-System
- Root Layout: `<Header />` + `<main>` + `<Footer />` + `<ContactSidebar />`
- Die ContactSidebar ist auf **allen Seiten** rechts fixiert (Desktop: immer sichtbar, Mobile: Toggle-Button)
- Content-Bereiche nutzen `lg:pr-96` um Platz für die Sidebar zu lassen (384px)
- Header bleibt full-width (kein padding-right)

### Konfiguration
- **Alle** Seitenkonfigurationen zentral in `lib/config.ts` (`siteConfig`)
- Navigation, Kontaktdaten, Firmeninfos, SEO-Keywords – alles an einer Stelle
- Environment-Variablen mit Fallback-Defaults

### Datenfluss Kalibrierkosten
1. `scripts/fetch-toolboxx.mjs` wird vor dem Build ausgeführt (prebuild)
2. Daten werden in `data/toolboxx-items.json` gespeichert (gitignored)
3. API-Route `app/api/toolboxx/items/route.ts` liest und cached die JSON-Datei
4. Kategorisierung erfolgt serverseitig über Keyword-Matching (16 Kategorien)
5. Client-Seite `app/kalibrierkosten/page.tsx` nutzt Suche mit 300ms Debounce

### Kontaktformular
- FormData (multipart) → `/api/contact` → Resend API → E-Mail an info@inektra.de
- Unterstützt Dateianhänge (Excel, PDF, CSV)
- HTML-Escaping gegen XSS
- Pflichtfelder: Name, E-Mail, Datenschutz-Checkbox
- Lead-Logging in stdout mit Timestamp
- **Google Ads Conversion-Tracking:** Bei erfolgreichem Submit wird `trackConversion()` aufgerufen

### Google Ads Conversion-Tracking
- **Konto:** 981-989-9245 (inektra GmbH, eigenständig, nicht im OMTEC MCC)
- **Google Tag ID:** AW-18003383640 (≠ Konto-ID!)
- **Conversion-Label:** cadjCIy0pIUcENiq14hD
- **Conversion-Aktion:** „Kontaktformular_gesendet" (Kategorie: Lead-Formular senden, Wert: 50 EUR, Zählung: Eine, Primäre Aktion)
- **Implementierung:**
  - `components/GoogleAdsTag.tsx` – Google Consent Mode v2 + bedingtes Laden von gtag.js
  - `components/GoogleAdsTag.tsx` → `trackConversion()` – Feuert Conversion nur bei Marketing-Consent
  - `components/ContactSidebar.tsx` – Ruft `trackConversion()` bei `data.success` auf
  - `app/layout.tsx` – `<GoogleAdsTag />` im `<body>` vor allen anderen Inhalten
  - `lib/config.ts` → `siteConfig.googleAds` – conversionId + conversionLabel zentral konfiguriert
  - `types/gtag.d.ts` – TypeScript-Deklarationen für `window.gtag`, `window.dataLayer` + Consent Mode v2
- **Google Consent Mode v2:**
  - Default: `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` = `denied`
  - Nach Consent: Update auf `granted` + gtag.js laden
  - Ohne Consent: Kein gtag.js, keine Marketing-Cookies, anonymisierte Signale (Consent Mode Modeling)
- **Wichtig:** Google Tag ID (AW-18003383640) ist NICHT identisch mit der Google Ads Konto-ID (981-989-9245). Die Tag-ID wird beim Erstellen der Conversion-Aktion vergeben.

### Google Ads Kampagne "Kalibrierservice – Hochintent"
- **Status:** Angelegt (09.03.2026), wartet auf Zahlungsmittel
- **Typ:** Search (Suchnetzwerk), manueller CPC
- **Budget:** 15 EUR/Tag
- **Standort:** Deutschland, Sprache Deutsch
- **Werbenetzwerk:** Nur Google-Suche (kein Display, keine Suchpartner)
- **Geraete:** Nur Desktop (Mobile -100%, Tablet -100%)
- **Werbezeitplaner:** Mo–Fr 05:00–16:00
- **Anzeigengruppen:**
  1. **Kalibrierservice** – 7 Keywords (Exact+Phrase), Zielseite /kalibrierservice, 2 RSAs
  2. **Messgeraete kalibrieren** – 6 Keywords (Exact+Phrase), Zielseite /messgeraete-kalibrieren, 1 RSA
  3. **Kalibrierkosten** – 6 Keywords (Exact+Phrase), Zielseite /kalibrierkosten, 1 RSA
- **Negative Keywords (Kampagnenebene):** akkreditiert, dakks, iso 17025, selber, anleitung, jobs, software, kostenlos, gebraucht, reparatur u.a.
- **Sitelink-Erweiterungen:** Kalibrierkosten, Messgeraete, Ueber uns, FAQ
- **Lessons learned von kalibrieren-direkt.de:** Kein Broad Match, hoeheres Budget, thematische Anzeigengruppen, keyword-passende Zielseiten, negative Keywords von Anfang an
- **Detaillierte Dokumentation:** `docs/google-ads-kampagne.md`

### Vercel Web Analytics + Speed Insights
- **Packages:** `@vercel/analytics` + `@vercel/speed-insights`
- **Komponenten:** `<Analytics />` + `<SpeedInsights />` in `app/layout.tsx` (nach `<CookieConsent />`)
- **Imports:**
  - `import { Analytics } from '@vercel/analytics/next'`
  - `import { SpeedInsights } from '@vercel/speed-insights/next'`
- **Web Analytics:** Seitenaufrufe, Besucher, Referrer, Laender, Browser
- **Speed Insights:** Core Web Vitals (LCP, FID, CLS), Real Experience Score
- **Datenschutz:** Kein Consent noetig – sammelt keine PII, setzt keine Cookies
- **Dashboard:** Vercel → inektra-web → Analytics / Speed Insights
- **Aktiviert:** 09.03.2026

### Cookie-Consent (DSGVO)
- **Komponenten:**
  - `lib/consent.ts` – Consent-Utility: `getConsent()`, `setConsent()`, `hasMarketingConsent()`, `clearConsent()`
  - `components/CookieConsent.tsx` – Banner-UI (`'use client'`, fixed bottom, z-[60])
  - `components/CookieConsent.tsx` → `CookieSettingsButton` – Export fuer Footer (Consent widerrufen)
- **Speicherung:** localStorage Key `cookie-consent` + Cookie `cookie-consent` (Wert: `all`/`essential`)
- **Ablauf:** 13 Monate (DSGVO-Standard), danach Banner erneut
- **Consent-Version:** `1.0` (fuer zukuenftige Migrationen)
- **Banner-Features:**
  - "Alle akzeptieren" (orange) / "Nur essenzielle" (outline) / "Einstellungen" (aufklappbar)
  - Granulare Einstellungen: Essenzielle (immer an, disabled) + Marketing (togglebar)
  - Link zu /datenschutz
  - SSR-sicher: Rendert `null` serverseitig, `useEffect` prueft localStorage
  - Custom Event `consent-updated` verbindet Banner mit GoogleAdsTag
- **Footer:** "Cookie-Einstellungen" Link (loescht Consent + Reload → Banner erscheint erneut)
- **Datenschutzerklaerung (/datenschutz):** Abschnitte 5-7 (Cookies, Google Ads, Consent Mode v2, Widerruf, Resend, Vercel)

## Wichtige Geschäftsregeln

1. **KEINE Akkreditierungs-Claims:** Die Seite darf NICHT "DIN EN ISO/IEC 17025", "ISO 9001" oder "akkreditiert" enthalten. Es handelt sich um **Werkskalibrierung** (nicht akkreditiert). Korrekte Formulierung: "ISO-Normen" oder "Werkskalibrierung".

2. **Keine Markennamen auf der Homepage:** Markennamen (Fluke, Tektronix, etc.) nur auf der Kalibrierkosten-Seite, nicht auf der Homepage.

3. **Versandkosten:** Einsendung auf Kundenkosten. Rückversand: 15 EUR netto zzgl. MwSt. Palettenversand nach Aufwand.

4. **Firmendaten:**
   - Labor: Losserstr. 4, 48527 Nordhorn (ehemals Calpro Hagels/Theußing GmbH & Co. KG)
   - Firmensitz (Impressum): Zum Jadebusen 73, 26316 Varel
   - CEO: Arthur Barasch
   - USt-IdNr: DE320727155 (nur im Impressum, NICHT im Footer)

5. **Toolboxx-Daten:** Einträge mit Präfix "Werkskalibrierung" oder "Akkreditierte Kalibrierung" werden aus dem Katalog gefiltert.

## Design-System

### Farben
- **Primary (Blau):** `primary-600: #0284c7` (Hauptmarkenfarbe)
- **Accent (Orange):** `accent-500: #ea580c` (Logo-Farbe, CTAs, Buttons) – WCAG-konform angepasst
- **Neutral (Grau):** Warme Grautöne (fafaf9 bis 0c0a09)
- **Kein Dark Mode** – nur Light Mode

### Typografie
- Schrift: Inter (Google Fonts, display: swap)
- Font-Gewichte: 300, 400, 500, 600, 700

### Layout-Muster
- Hero-Sections: `bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900` mit Grid-Overlay
- Content-Sections: Wechsel zwischen `bg-white` und `bg-slate-50`
- CTAs: Orange (`bg-accent-500`) mit Hover-Effekt und Shadow
- Max-Breite: `max-w-7xl` mit `px-4 sm:px-6 lg:px-8 lg:pr-96`

### Favicon
- **Design:** Hero Dark (#0f172a) Hintergrund, weisses "i" (Strich + Rechteck-Punkt)
- **i-Punkt:** Kurzes Rechteck (KEIN Kreis!) – exakt wie im inektra-Logo
- **i-Strich:** Weisser vertikaler Balken, serifenlos
- **Punkt-Farbe:** Accent Orange (#ea580c)
- **Generierung:** `python3 scripts/generate-favicons.py` (benoetigt Pillow)
- **Ausgabe:** Komplett-Set in `public/` (ICO, SVG, PNG 16–512px, Apple Touch, Manifest)
- **Kleine Groessen:** Pixel-perfekt handgesetzt (16px: 2px breit, 32px: 4px, 48px: 7px)
- **Metadata:** Konfiguriert in `app/layout.tsx` (icons + manifest)
- **Google SERP:** Nutzt primaer favicon-32x32.png und icon.svg

### Accessibility
- Focus-visible Outlines auf allen interaktiven Elementen (2px solid orange)
- Screen-reader-only Klassen (`.sr-only`)
- Skip-to-content Link für Tastaturnavigation
- Korrekte Formular-Labels mit `htmlFor`
- WCAG-konforme Kontrastverhältnisse

## Umgebungsvariablen

```
# Public (Browser-sichtbar)
NEXT_PUBLIC_DOMAIN          # Default: 'inektra.de'
NEXT_PUBLIC_SITE_URL        # Default: 'https://inektra.de'
NEXT_PUBLIC_BRAND_NAME      # Default: 'inektra GmbH'
NEXT_PUBLIC_PHONE           # Default: '+49 5921 72 31 00'
NEXT_PUBLIC_EMAIL           # Default: 'info@inektra.de'

# Server-Only
RESEND_API_KEY              # Erforderlich für Kontaktformular E-Mail-Versand
TOOLBOXX_API_KEY            # Erforderlich für Produktdaten-Fetch (prebuild)
```

## SEO

- **Indexierung:** Aktiv (index: true, follow: true) seit 07.03.2026
- **Canonical URLs:** inektra.de – pro Seite gesetzt
- **robots.txt:** Allow: /, Disallow: /api/, Sitemap: https://inektra.de/sitemap.xml
- **Sitemap:** Dynamisch generiert via `app/sitemap.ts` (7 Seiten, Prioritäten 1.0–0.6)
- **Meta-Tags:** OpenGraph (de_DE), Twitter Card pro Seite
- **OG-Image:** Dynamisch generiert via `app/opengraph-image.tsx` (1200×630 PNG, Edge Runtime)
- **Googlebot:** index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1
- **Breadcrumbs:** Sichtbar + BreadcrumbList JSON-LD auf allen 6 Unterseiten (nicht Homepage)
- **Structured Data (JSON-LD):**
  - `LocalBusiness` – Root Layout (jede Seite): Firmenname, Adresse Nordhorn, Telefon, E-Mail, Öffnungszeiten, Geo-Koordinaten
  - `Service` + `OfferCatalog` – /kalibrierservice: 5 Kategorien (Elektrische Messtechnik, Temperatur, Druck, Dimension, Waagen)
  - `FAQPage` – Automatisch auf 5 Seiten via PageFAQ-Komponente (kalibrierservice, messgeraete, faq, kontakt, ueber-uns)
  - `BreadcrumbList` – Automatisch auf allen 6 Unterseiten via Breadcrumbs-Komponente
- **Interne Verlinkung:** Homepage → 3 Service-Karten + FAQ-Teaser, Footer → 6 Links (Leistungen + Unternehmen)
- **Skip-to-Content:** Tastaturnavigation-Link im Root Layout
- **Keywords:** kalibrierservice, werkskalibrierung, messgeräte kalibrieren, kalibrierung dienstleister, kalibrierlabor, messmittel kalibrierung, iso kalibrierung, kalibrierung nordhorn
- **Favicon:** Komplettes Set (ICO, SVG, PNG, Apple Touch, Manifest) – seit 09.03.2026
- **301-Redirects:**
  - **calpro.de → inektra.de** (seit Anfang Maerz 2026) – Alte Domain der Vorgaengerfirma Calpro Hagels/Theussing GmbH & Co. KG. Backlink-Profil minimal (49 Links, fast nur Spam/Scraper, einzig relevanter Link: messraum.net SI 0,020). Kein nennenswerter SEO-Boost, inektra.de muss Autoritaet selbst aufbauen.
  - **kalibrieren-direkt.de → inektra.de** – Noch offen (Insolvenz Elektro Struss GmbH, Domain-Zukunft unklar)
- **SISTRIX-Tracking:** 50 Keywords in 9 Kategorien (docs/sistrix-keywords.md)
  - Erste Rankings (09.03.2026): "kalibrierkosten" Position 1, "inektra" Position 4
  - 52 Keywords getrackt, 10 mit Rankings

## Tests

35 Playwright E2E-Regressionstests in `tests/features.test.ts`:

**Critical Features Check (12 Tests):**
- Homepage-Rendering, Navigation, Contact-Sidebar auf allen Seiten
- Kontaktformular-Pflichtfelder und Datenschutz-Checkbox
- Keine verbotenen Akkreditierungs-Claims, korrekte Terminologie
- Nordhorn-Adresse, keine Markennamen auf Homepage, Logo-Groesse
- Submit-Button enabled/disabled, Premium-Design auf Unterseiten

**Kalibrierkosten-Seite (5 Tests):**
- Hero + Suchfeld, Kategorie-Filter, Suche liefert Ergebnisse
- Kategorie-Filter funktioniert, Werkskalibrierung ausgeschlossen

**Kalibrierkosten API (5 Tests):**
- Items-Endpoint, Kategorien-Endpoint, Kategorie-Filter, Suche, Werkskalibrierung-Ausschluss

**Footer (3 Tests):**
- Keine USt-IdNr, Copyright-Text, E-Mail-Link

**Cookie Consent Banner (8 Tests):**
- Banner erscheint bei erstem Besuch, verschwindet nach Akzeptieren/Ablehnen
- Banner erscheint nicht wenn Consent gespeichert
- Consent Mode v2 Default-Script immer vorhanden
- Datenschutz-Link im Banner, Cookie-Einstellungen im Footer
- Einstellungen-Panel oeffnet sich mit granularen Optionen

**Performance & Accessibility (2 Tests):**
- Keine kritischen Console-Errors auf Homepage
- Alle internen Links sind erreichbar

Tests laufen gegen `http://localhost:3000` (Dev-Server wird automatisch gestartet).

## Vercel Deployment

### Konfiguration
- **Platform:** Vercel (Auto-Deploy bei Push auf main)
- **Framework:** Next.js (automatisch erkannt)
- **Build Command:** `npm run build` (inkl. prebuild fetch-toolboxx)
- **Domain:** inektra.de (Custom Domain)

### Security Headers (vercel.json)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Deployment-Workflow
```bash
# 1. Änderungen committen
git add <dateien>
git commit -m "Beschreibung"

# 2. Push → automatisches Deployment
git push origin main

# 3. Status prüfen
# Vercel Dashboard: https://vercel.com/omergilis-projects/inektra-web
```

## Git-Historie (relevante Commits)

```
5cddddd Fix: Kalibrierkosten-Preistabelle mit echten Katalogpreisen (09.03.2026)
fa6273a SEO: Kalibrierkosten-Seite um Ratgeber-Content + FAQ erweitern (09.03.2026)
97bcfc1 Dokumentation: Vercel Speed Insights ergaenzen (09.03.2026)
590c65b Vercel Speed Insights einrichten (09.03.2026)
83034e3 Vercel Web Analytics einrichten (09.03.2026)
30d2b6d Favicon-Set erstellen + SISTRIX Keywords + Google Ads Doku (09.03.2026)
dbdb20a Dokumentation: Cookie-Consent-Banner + Tests (v1.4.0) (09.03.2026)
2724727 DSGVO: Cookie-Consent-Banner + Datenschutzerklaerung erweitern (09.03.2026)
20c1513 Google Ads Conversion-Tracking einrichten (AW-18003383640) (09.03.2026)
a3b3d32 SEO-Optimierung: Structured Data, OG-Image, Breadcrumbs, interne Verlinkung (07.03.2026)
7829550 Sitemap hinzufügen und Dokumentation aktualisieren (07.03.2026)
1a14793 Supabase/PostgreSQL-Anbindung komplett entfernen (07.03.2026)
730a927 SEO: Indexierung aktivieren – noindex/nofollow auf index/follow umstellen
5bc6d0d SEO: Domain auf inektra.de umstellen, Canonical-URLs korrigieren
0c49ee1 Switch contact form from SMTP to Resend API
fe0fefc Update regression tests: 27 tests covering all critical features
59c8b06 Improve text readability and add mobile hamburger menu
2f7d8da Korrektur Versandkosten: Einsendung auf Kundenkosten, nur Rückversand bepreist
```

## Erledigte Meilensteine

- [x] Next.js App mit allen Seiten aufgesetzt
- [x] Design-System mit Tailwind CSS (Orange-Akzent)
- [x] ContactSidebar auf allen Seiten (Lead-Generierung)
- [x] Kontaktformular via Resend API
- [x] Produktkatalog via toolboxx.biz API (3.200+ Geräte)
- [x] FAQ-System mit JSON-LD Structured Data
- [x] Playwright E2E-Tests eingerichtet
- [x] SEO-Indexierung aktiviert (07.03.2026)
- [x] Domain auf inektra.de umgestellt
- [x] Canonical-URLs korrigiert
- [x] Supabase/PostgreSQL komplett entfernt
- [x] Vercel Auto-Deployment konfiguriert
- [x] XML-Sitemap (dynamisch, 7 Seiten)
- [x] Structured Data: LocalBusiness, Service, FAQPage (5 Seiten), BreadcrumbList (6 Seiten)
- [x] OG-Image Generator (dynamisch, Edge Runtime)
- [x] Breadcrumbs auf allen Unterseiten (sichtbar + JSON-LD)
- [x] Interne Verlinkung optimiert (Homepage 3 Service-Karten + FAQ-Teaser, Footer ergänzt)
- [x] Skip-to-Content Link (Accessibility)
- [x] Google Search Console eingerichtet, Seiten zur Indexierung eingereicht (07.03.2026)
- [x] Google Ads Konto eingerichtet (981-989-9245, 09.03.2026)
- [x] Google Ads Conversion-Tracking implementiert (gtag.js + trackConversion(), 09.03.2026)
- [x] Cookie-Consent-Banner (DSGVO-konform, Consent Mode v2, 09.03.2026)
- [x] Datenschutzerklaerung erweitert: Cookies, Google Ads, Vercel, Resend (09.03.2026)
- [x] 35 Playwright E2E-Tests (8 neue Cookie-Banner-Tests, 09.03.2026)
- [x] Favicon-Set erstellt: ICO, SVG, PNG (16-512px), Apple Touch, Manifest (09.03.2026)
- [x] SISTRIX-Keyword-Tracking eingerichtet: 50 Keywords, 9 Kategorien (09.03.2026)
- [x] Google Ads Kampagne "Kalibrierservice – Hochintent" angelegt: 3 Anzeigengruppen, Exact+Phrase Match, 15 EUR/Tag (09.03.2026)
- [x] Vercel Web Analytics + Speed Insights eingerichtet (09.03.2026)
- [x] /kalibrierkosten Ratgeber-Content + Preistabelle + 2 FAQs integriert (09.03.2026)
- [x] Content-Strategie: Messverfahren-Seiten + Onlinebeauftragung-Konzept dokumentiert (09.03.2026)

## Content-Ausbauplan

### Strategische Lage (Stand 09.03.2026)
- **calpro.de → inektra.de:** 301-Redirect seit Anfang Maerz 2026 aktiv. Backlink-Profil jedoch minimal (49 Links, fast nur Spam) – kein nennenswerter SEO-Boost. inektra.de muss Autoritaet durch eigenen Content aufbauen.
- **kalibrieren-direkt.de** (Elektro Struss GmbH) ist wegen Insolvenz unsicher – Domain-Zukunft unklar
- **inektra.de** muss eigenstaendig aufgebaut werden und langfristig alle Kalibrierungs-Inhalte tragen
- **Messverfahren-Seiten** ersetzen die urspruenglich geplanten 16+ Einzelgeraete-Seiten (weniger Aufwand, bessere Struktur)
- Ratgeber-Content + Messverfahren-Seiten sind Informationsseiten → keine Konkurrenz zu kd.de Produktseiten
- Marken-Landingpages weiterhin erst nach Klaerung der kd.de-Situation
- Falls kalibrieren-direkt.de Domain behalten werden kann: 301-Redirect auf inektra.de (SEO-Juice-Transfer)
- **Langfristziel:** Onlinebeauftragung (Kalibrierauftrag-System) auf Basis der Messverfahren-Seiten

### Kalibrierpreisliste (Datenquelle)
- **Datei:** `preis2026 (3).pdf` – inektra Kalibrierpreisliste 2026
- **Kapitel und Messverfahren:**
  - Kap. 2: **Dimensionale Groessen** (22 Seiten, ~67 Geraetetypen: Endmasse, Messschieber, Lehren, Messuhren, Messschrauben...)
  - Kap. 3: **Planimetrie** (5 Seiten, ~15 Geraetetypen: Lineale, Pruefplatten, Winkel, Wasserwaagen)
  - Kap. 4: **Physikalische Groessen** (8 Seiten, ~30 Geraetetypen: Druck, Drehmoment, Temperatur, Feuchte, Haerte, Schallpegel, Kraft, Masse)
  - Kap. 5: **Rauheit** (1 Seite, 3 Geraetetypen)
  - Kap. 8: **Elektrische Messgeraete** (44 Seiten, 100+ Geraetetypen)
- **Enthaltene Daten pro Geraetetyp:** Pruefungsrichtlinie (DKD-R, VDI/VDE/DGQ, etc.), Genauigkeitsanforderung (DIN, ISO), Preismatrix nach Messbereich, Artikel-Nr., Sonderhinweise
- **Referenzierte Normen:** DKD-R 4-3, DKD-R 6-1, VDI/VDE/DGQ 2618, DIN 862, DIN 863, DIN EN ISO 3650, DIN ISO 6789, DIN EN ISO 14253-1, u.v.m.
- **Experten:** Theodor Hagels (Elektrisch, Physikalisch, Rauheit), Martin Theussing (Dimensional)

### URL-Schema (aktualisiert 09.03.2026)
- **Flache URLs**, keyword-orientiert
- **Messverfahren-Seiten:** `/laengenkalibrierung`, `/druckkalibrierung`, `/temperaturkalibrierung`, `/drehmoment-kalibrierung`, `/elektrische-messtechnik-kalibrierung`
- **Ratgeber:** `/werkskalibrierung-vs-dakks`, `/kalibrierintervalle`
- **Kalibrierkosten:** `/kalibrierkosten` (mit integriertem Ratgeber-Content, erledigt 09.03.2026)
- **Onlinebeauftragung (spaeter):** `/kalibrierauftrag`
- **Marken-Seiten (nach kd.de-Klaerung):** `/fluke-kalibrierung`, `/benning-kalibrierung` etc.
- Kein `/kalibrierung/` oder `/hersteller/` Verzeichnis
- **Gestrichen:** `/kalibrierkosten-ratgeber` (Content jetzt auf /kalibrierkosten), 16+ Einzelgeraete-Seiten (ersetzt durch 5 Messverfahren-Seiten)

### Datengrundlage
- **GSC-Export kalibrieren-direkt.de:** 500+ Keywords, 90 Tage (06.12.2025–06.03.2026)
- **Mega-Keyword:** "kalibrieren" = 14.747 Impressionen/90T, Position 10.5
- **Top-Kategorien nach Impressionen:** Drehmomentschluessel (1.245), Messschieber (1.215), Multimeter (1.170), Manometer (1.351)
- **Top-Marken nach Impressionen:** Fluke (2.150+), Benning (1.768+), Voltcraft (~500)
- **Wettbewerbsanalyse:** Grosse Labore (Perschmann, Testo TIS, ESZ) haben keine Messverfahren-SEO-Seiten mit technischer Tiefe → Alleinstellungsmerkmal
- **Kalibrierpreisliste 2026:** Einzigartige Fachdaten (Pruefungsrichtlinien, Genauigkeitsklassen, Messbereiche) die kein Wettbewerber online hat
- **Analysedokumente:** `/Users/olafmergili/CLAUDE-PROJEKTE/kalibrieren-direkt/docs/`

### Phase 1 – Ratgeber-Seiten (sofort umsetzbar)

| Seite | Ziel-Keywords | Suchvolumen |
|-------|--------------|-------------|
| `/werkskalibrierung-vs-dakks` | werkskalibrierung, akkreditierte kalibrierung, dakks unterschied | 1.500+/Monat |
| `/kalibrierintervalle` | kalibrierintervall, wie oft kalibrieren, kalibrierung intervall | 1.000+/Monat |

**Jeder Ratgeber enthaelt:**
- 800–1.200 Woerter Fachtext
- 3 FAQs am Ende (+ FAQPage JSON-LD)
- CTA-Box mit Schnellanfrage
- Interne Links zu `/kalibrierkosten` und `/kalibrierservice`
- Breadcrumbs: Startseite → [Ratgeber-Titel]
- Metadata: Title, Description, Keywords, Canonical URL

### Phase 2 – Messverfahren-Seiten (Kern der Content-Strategie)

**Konzept:** Statt 16+ Einzelgeraete-Seiten decken 5 Messverfahren-Seiten alle Kalibrierverfahren ab. Jede Seite kombiniert Fachinhalte (Normen, Verfahren, Genauigkeiten) mit gefiltertem Toolboxx-Katalog. Spaeter wird der Katalog um einen "Zum Kalibrierauftrag hinzufuegen"-Button erweitert.

| Seite | Messverfahren | Aus Preisliste | Geraetetypen |
|-------|---------------|----------------|--------------|
| `/laengenkalibrierung` | Dimensionale Groessen + Planimetrie + Rauheit | Kap. 2 + 3 + 5 | Messschieber, Endmasse, Lehrdorne, Messuhren, Messschrauben, Lineale, Pruefplatten, Rauheitsmessgeraete |
| `/druckkalibrierung` | Druck | Kap. 4.3 | Manometer, Drucksensoren, Transmitter, Pruefpumpen, Reifendruckpruefer |
| `/temperaturkalibrierung` | Temperatur + Feuchte | Kap. 4.7 + 4.8 | Thermometer, IR-Thermometer, Klimaschraenke, Hygrometer, Holzfeuchtemessgeraete |
| `/drehmoment-kalibrierung` | Drehmoment | Kap. 4.2 | Drehmomentschluessel, Drehmomentpruefgeraete |
| `/elektrische-messtechnik-kalibrierung` | Elektrische Messgeraete | Kap. 8 | Multimeter, Oszilloskope, Stromzangen, Pruefgeraete, Netzgeraete, Kalibratoren (100+ Typen) |

**Aufbau pro Messverfahren-Seite:**
1. **H1** – z.B. "Druckkalibrierung – Manometer & Drucksensoren kalibrieren"
2. **Einleitung** – Wann und warum kalibrieren, welche Normen (z.B. DKD-R 6-1)
3. **Pruefverfahren erklaert** – Was wird gemessen, wie viele Messpunkte, steigend/fallend
4. **Geraete-Uebersicht** – Tabelle mit Geraetetypen, Genauigkeitsklassen, Preisspannen (aus Preisliste)
5. **Gefilterter Toolboxx-Katalog** – Live-Suche nur fuer diese Kategorie (wiederverwendbare Komponente)
6. **3–4 FAQs** (+ FAQPage JSON-LD)
7. **CTA** → Kontaktformular / Anfrage (spaeter: Kalibrierauftrag)
8. **Interne Links** zu `/kalibrierkosten`, `/kalibrierservice`, verwandte Messverfahren-Seiten

**Technische Vorbereitung:**
- Katalog-Komponente als wiederverwendbare React-Komponente (spaeter um Hinzufuegen-Button erweiterbar)
- Sitemap erweitern (7 → 14 Seiten)
- Bestehende Seiten verknuepfen (interne Links auf Messverfahren-Seiten)
- Toolboxx-API-Kategorien fuer Filterung nutzen (16 Kategorien bereits definiert)

### Phase 3 – Onlinebeauftragung (Kalibrierauftrag-System)

**Konzept:** Kein Webshop mit Warenkorb/Checkout/Zahlung, sondern ein B2B-Kalibrierauftrag-System. Kunde stellt Auftrag online zusammen, Bezahlung per Rechnung.

**User Flow:**
```
Messverfahren-Seite (z.B. /druckkalibrierung)
→ Liest ueber Pruefverfahren, Normen, Genauigkeiten
→ Scrollt zum gefilterten Katalog
→ Findet "Manometer ±2,5%, bis 16 bar" → Klickt [+ Hinzufuegen]
→ Header zeigt "1 Geraet im Auftrag"
→ Kann weitere Geraete von anderen Seiten hinzufuegen
→ Klickt auf "Auftrag abschliessen"
→ /kalibrierauftrag: Firmendaten + Geraete-Seriennummern
→ Bestaetigt → Auftragsbestaetigung per E-Mail (Resend)
```

**Seitenarchitektur mit Onlinebeauftragung:**
```
/                                           ← Homepage (Lead-Gen + Einstieg)
├── /kalibrierservice                       ← Uebersicht Leistungen
├── /kalibrierkosten                        ← Gesamtkatalog (Suche + Filter + [Hinzufuegen])
├── /laengenkalibrierung                           ← Messverfahren: Dimensional
├── /druckkalibrierung                      ← Messverfahren: Druck
├── /temperaturkalibrierung                 ← Messverfahren: Temperatur
├── /drehmoment-kalibrierung                ← Messverfahren: Drehmoment
├── /elektrische-messtechnik-kalibrierung   ← Messverfahren: Elektrisch
│   └── Jede Seite: Info + gefilterter Katalog + [Hinzufuegen]
├── /werkskalibrierung-vs-dakks             ← Ratgeber
├── /kalibrierintervalle                    ← Ratgeber
├── /kalibrierauftrag                       ← NEU: Auftrags-Zusammenstellung + Formular
├── /kontakt                                ← Fuer individuelle Anfragen
├── /ueber-uns / /faq / /impressum / /datenschutz
```

**Technische Komponenten:**
- **Auftrags-Context:** React Context + localStorage (persistent ueber Seitennavigation, kein Account noetig)
- **Katalog-Komponente:** Erweiterung um [+ Hinzufuegen]-Button (nur ein Prop-Wechsel)
- **Header-Badge:** Warenkorb-Icon mit Anzahl-Badge
- **`/kalibrierauftrag`-Seite:** Firmendaten, Geraete-Details (Seriennummer, Hersteller, Modell), Wunschtermin, Versandart, AGB-Checkbox
- **E-Mail-Bestaetigung:** Via Resend API (bereits integriert), optional PDF-Anhang
- **Kein Zahlungs-Gateway:** B2B = Rechnung (kein Widerrufsrecht, keine Versandkosten-Berechnung noetig, Pauschale 15 EUR bekannt)

**Conversion-Funnel-Verbesserung:**
| Schritt | Ohne Beauftragung (Phase 1–2) | Mit Beauftragung (Phase 3) |
|---------|-------------------------------|----------------------------|
| Informieren | Fachinhalte lesen | Fachinhalte lesen |
| Finden | Geraet im Katalog finden | Geraet im Katalog finden |
| Handeln | Kontaktformular (Bruch) | Direkt hinzufuegen (nahtlos) |
| Beauftragen | Manuelle Anfrage per E-Mail | Strukturierter Auftrag |

**Vergleich mit kalibrieren-direkt.de:**
| | kalibrieren-direkt.de | inektra.de (Ziel) |
|---|---|---|
| Plattform | WooCommerce | Next.js (custom) |
| Produkte | 394 (manuell) | 3.200+ (Toolboxx API, automatisch) |
| Fachinhalte | Keine | Messverfahren, Normen, Genauigkeiten |
| Bestellung | Warenkorb → Checkout → Zahlung | Kalibrierauftrag → Rechnung |
| SEO | Produktseiten ohne Content | Messverfahren-Seiten mit Content + Katalog |

### Phase 4 – Marken-Landingpages (nach kd.de-Klaerung)

| Seite | Ziel-Keywords | Impressionen (kd.de) |
|-------|--------------|---------------------|
| `/fluke-kalibrierung` | fluke kalibrierung | 2.150+ |
| `/benning-kalibrierung` | benning kalibrierung | 1.768+ |
| `/voltcraft-kalibrierung` | voltcraft kalibrierung | ~500 |
| + 6 weitere Marken | | |

Falls kd.de-Domain verfuegbar: 301-Redirect → inektra.de (SEO-Juice-Transfer, Rankings in 2–4 Wochen)
Falls kd.de-Domain wegfaellt: Gleicher Plan, Rankings bauen sich langsamer auf (3–6 Monate)

### Umsetzungsreihenfolge

| Phase | Zeitraum | Seiten | Inhalt |
|-------|----------|--------|--------|
| **1** | Woche 1–2 | 2 | Ratgeber: `/werkskalibrierung-vs-dakks`, `/kalibrierintervalle` |
| **2a** | Woche 3 | 1 | Messverfahren: `/laengenkalibrierung` (inektras USP, erste Messverfahren-Seite) |
| **2b** | Woche 4–5 | 2 | Messverfahren: `/druckkalibrierung`, `/elektrische-messtechnik-kalibrierung` |
| **2c** | Woche 6–7 | 2 | Messverfahren: `/temperaturkalibrierung`, `/drehmoment-kalibrierung` |
| **3** | Monat 3–4 | 1 | Onlinebeauftragung: `/kalibrierauftrag` + Katalog-Erweiterung |
| **4** | Nach kd.de | 9+ | Marken-Landingpages |

### Erwartete Ergebnisse

| Zeitpunkt | Seiten | Geschaetzter org. Traffic |
|-----------|--------|--------------------------|
| Heute (09.03.2026) | 9 | ~0 (seit 07.03.2026 indexiert) |
| Nach Phase 1 | 11 | Indexierung laeuft |
| Nach Phase 2 | 16 | 500–1.500 Besucher/Monat |
| Nach Phase 3 | 17 | 1.000–3.000 Besucher/Monat + direkte Auftraege |
| Nach Phase 4 (mit kd.de Redirect) | 26+ | 3.000–5.000 Besucher/Monat |
| Nach Phase 4 (ohne kd.de Redirect) | 26+ | 1.500–3.000 Besucher/Monat |

## Offene Punkte

### Dringend
- [ ] Klaeren: Kann Domain kalibrieren-direkt.de behalten werden? (Insolvenz Elektro Struss GmbH)
- [ ] GSC-Tool: Service-Account-Datei in gsc-tool/ kopieren (Pfad im Script anpassen)
- [ ] Google Ads: Zahlungsmittel hinterlegen (ohne Zahlungsmittel laeuft keine Kampagne)
- [x] Google Ads: Kampagne "Kalibrierservice – Hochintent" angelegt (3 Anzeigengruppen, 09.03.2026)
- [ ] Google Ads: Sitelink-Erweiterungen hinzufuegen (geplant, noch nicht im UI erstellt)
- [ ] Google Ads: Negative Keywords auf Kampagnenebene hinzufuegen (geplant, noch nicht im UI erstellt)

### Content-Ausbau
- [ ] Phase 1: `/werkskalibrierung-vs-dakks` (Ratgeber)
- [ ] Phase 1: `/kalibrierintervalle` (Ratgeber)
- [ ] Phase 2a: `/laengenkalibrierung` (Messverfahren, inektras USP)
- [ ] Phase 2b: `/druckkalibrierung` + `/elektrische-messtechnik-kalibrierung`
- [ ] Phase 2c: `/temperaturkalibrierung` + `/drehmoment-kalibrierung`
- [ ] Phase 3: `/kalibrierauftrag` (Onlinebeauftragung)
- [ ] Phase 4: Marken-Landingpages (nach kd.de-Klaerung)
- [x] `/kalibrierkosten` Ratgeber-Content + FAQ integriert (09.03.2026)

### Technisch
- [x] Resend Custom Domain konfiguriert (inektra.de verifiziert, Region eu-west-1, E-Mails von info@inektra.de)
- [ ] Wiederverwendbare Katalog-Komponente bauen (fuer Messverfahren-Seiten + spaeter Hinzufuegen-Button)
- [ ] Toolboxx-Daten: Hersteller-Feld befuellen (Mapping-Script)
- [ ] Sitemap erweitern bei jeder neuen Seite

### Nice-to-Have
- [ ] Admin-Dashboard fuer Lead-Management
- [ ] Product JSON-LD auf Kalibrierkosten-Seite
