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
└── fetch-toolboxx.mjs     # Prebuild: Holt Produktdaten von toolboxx.biz API

tests/
└── features.test.ts       # 35 Regression-Tests (Playwright)

public/                    # Statische Assets (Logo, Favicon, Icons)
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

## Content-Ausbauplan

### Strategische Lage (Stand 07.03.2026)
- **kalibrieren-direkt.de** (Elektro Struss GmbH) ist wegen Insolvenz unsicher – Domain-Zukunft unklar
- **inektra.de** muss eigenständig aufgebaut werden und langfristig alle Kalibrierungs-Inhalte tragen
- Solange kalibrieren-direkt.de noch läuft: **keine konkurrierenden Geräte-/Marken-Seiten** bauen
- Stattdessen: Ratgeber-Content (informational) + Längenlabor-Expertise (inektras USP)
- **Entscheidung über Geräte-/Marken-Landingpages nach Klärung der kalibrieren-direkt.de Situation**
- Falls kalibrieren-direkt.de Domain behalten werden kann: 301-Redirect auf inektra.de (SEO-Juice-Transfer)

### URL-Schema (beschlossen)
- **Flache URLs**, keyword-orientiert (bewährt durch Wettbewerbsanalyse: meta-m.de, quality-tools-shop.de, sourcetronic.com)
- Geräte-Seiten (später): `/multimeter-kalibrieren`, `/messschieber-kalibrieren` etc.
- Marken-Seiten (später): `/fluke-kalibrierung`, `/benning-kalibrierung` etc.
- Ratgeber: `/kalibrierkosten-ratgeber`, `/werkskalibrierung-vs-dakks`, `/kalibrierintervalle`
- Expertise: `/laengenlabor`
- Kein `/kalibrierung/` oder `/hersteller/` Verzeichnis

### Datengrundlage
- **GSC-Export kalibrieren-direkt.de:** 500+ Keywords, 90 Tage (06.12.2025–06.03.2026)
- **Mega-Keyword:** "kalibrieren" = 14.747 Impressionen/90T, Position 10.5
- **Top-Kategorien nach Impressionen:** Drehmomentschlüssel (1.245), Messschieber (1.215), Multimeter (1.170), Manometer (1.351)
- **Top-Marken nach Impressionen:** Fluke (2.150+), Benning (1.768+), Voltcraft (~500)
- **Wettbewerbsanalyse:** Große Labore (Perschmann, Testo TIS, ESZ) haben keine Geräte-/Marken-SEO-Seiten → Long-Tail-Keywords sind offen
- **Analysedokumente:** `/Users/olafmergili/CLAUDE-PROJEKTE/kalibrieren-direkt/docs/`

### Woche 1 – Ratgeber + Längenlabor (keine Konkurrenz zu kd.de)

**Ratgeber-Artikel (informational – kd.de hat keinen Ratgeber-Content):**

| Seite | Ziel-Keywords | Suchvolumen |
|-------|--------------|-------------|
| `/kalibrierkosten-ratgeber` | kalibrierung kosten, kalibrieren kosten | 2.000+/Monat |
| `/werkskalibrierung-vs-dakks` | werkskalibrierung, akkreditierte kalibrierung, dakks unterschied | 1.500+/Monat |
| `/kalibrierintervalle` | kalibrierintervall, wie oft kalibrieren, kalibrierung intervall | 1.000+/Monat |

**Jeder Ratgeber enthält:**
- 800–1.200 Wörter Fachtext
- 3 FAQs am Ende (+ FAQPage JSON-LD)
- CTA-Box mit Schnellanfrage
- Interne Links zu `/kalibrierkosten` und `/kalibrierservice`
- Breadcrumbs: Startseite → [Ratgeber-Titel]
- Metadata: Title, Description, Keywords, Canonical URL

**Längenlabor-Seite (inektras Alleinstellungsmerkmal):**

| Seite | Ziel-Keywords | Impressionen (kd.de) |
|-------|--------------|---------------------|
| `/laengenlabor` | messschieber kalibrieren, endmaß kalibrierung, bügelmessschraube kalibrieren | 1.215 + 840+ |

**Inhalt:**
- inektras Stärke in der Dimensionsmesstechnik
- Alle kalibrierbaren Messgrößen: Messschieber, Bügelmessschrauben, Endmaße, Messuhren, Lehrdorne, Gewindelehrringe, Rauheitsmessgeräte, Schichtdickenmessgeräte
- Gefilterter Katalog (Toolboxx-Kategorie "Längenmesstechnik")
- Genauigkeitsangaben und Messbereiche
- 3 FAQs zur dimensionellen Kalibrierung (+ JSON-LD)
- Service JSON-LD
- Verlinkung von `/messgeraete-kalibrieren` und `/kalibrierservice`

**Technisch (Freitag):**
- Sitemap erweitern (7 → 11 Seiten)
- Bestehende Seiten verknüpfen (interne Links auf neue Seiten)
- Build + Deploy

### Nach Klärung kalibrieren-direkt.de – Geräte- und Marken-Seiten

**Szenario A: Domain bleibt verfügbar → 301-Redirect + alles auf inektra.de:**

Geräte-Landingpages (flache URLs):

| Seite | Ziel-Keyword | Impressionen (kd.de) |
|-------|-------------|---------------------|
| `/multimeter-kalibrieren` | multimeter kalibrieren | 1.170 |
| `/drehmomentschluessel-kalibrieren` | drehmomentschlüssel kalibrieren | 1.245 |
| `/messschieber-kalibrieren` | messschieber kalibrieren | 1.215 |
| `/manometer-kalibrierung` | manometer kalibrieren | 1.351 |
| `/thermometer-kalibrierung` | thermometer kalibrieren | ~500 |
| + 11 weitere Kategorien | | |

Marken-Landingpages (flache URLs):

| Seite | Ziel-Keywords | Impressionen (kd.de) |
|-------|--------------|---------------------|
| `/fluke-kalibrierung` | fluke kalibrierung | 2.150+ |
| `/benning-kalibrierung` | benning kalibrierung | 1.768+ |
| `/voltcraft-kalibrierung` | voltcraft kalibrierung | ~500 |
| + 6 weitere Marken | | |

**Szenario B: Domain fällt weg → gleiche Seiten, aber ohne Redirect-Bonus:**
- Gleicher Content-Plan, Rankings bauen sich langsamer auf (3–6 Monate statt 2–4 Wochen)

### Erwartete Ergebnisse

| Zeitpunkt | Seiten | Geschätzter org. Traffic |
|-----------|--------|------------------------|
| Heute | 9 | 0 (seit 07.03.2026 indexiert) |
| Nach Woche 1 | 13 | Indexierung läuft |
| Nach 3 Monaten (mit Redirect) | ~42 | 1.000–3.000 Besucher/Monat |
| Nach 3 Monaten (ohne Redirect) | ~42 | 300–1.000 Besucher/Monat |
| Nach 6 Monaten | ~42+ | 2.000–5.000 Besucher/Monat |

## Offene Punkte

### Dringend
- [ ] Klären: Kann Domain kalibrieren-direkt.de behalten werden? (Insolvenz Elektro Struss GmbH)
- [ ] GSC-Tool: Service-Account-Datei in gsc-tool/ kopieren (Pfad im Script anpassen)
- [ ] Google Ads: Zahlungsmittel hinterlegen (ohne Zahlungsmittel läuft keine Kampagne)
- [ ] Google Ads: Erste Search-Kampagne anlegen (Keywords, Anzeigen, Budget 15-20 EUR/Tag)

### Wichtig
- [x] Resend Custom Domain konfiguriert (inektra.de verifiziert, Region eu-west-1, E-Mails von info@inektra.de)
- [ ] Nach kd.de-Klärung: Geräte-Landingpages (16 Seiten, flache URLs)
- [ ] Nach kd.de-Klärung: Marken-Landingpages (9 Seiten, flache URLs)
- [ ] Toolboxx-Daten: Hersteller-Feld befüllen (Mapping-Script)

### Nice-to-Have
- [ ] Admin-Dashboard für Lead-Management
- [ ] Product JSON-LD auf Kalibrierkosten-Seite
