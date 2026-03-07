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
├── layout.tsx             # Root Layout (Header, Footer, ContactSidebar)
├── page.tsx               # Homepage (Hero, USPs, Services, CTA)
├── globals.css            # Tailwind + Custom CSS (Accessibility)
├── robots.ts              # SEO robots.txt (Allow /, Disallow /api/)
├── api/
│   ├── contact/route.ts   # POST: Kontaktformular → Resend E-Mail
│   └── toolboxx/items/route.ts  # GET: Kalibrier-Katalog (Suche, Filter, Kategorien)
├── kalibrierservice/      # Leistungsseite (Prozess, Vorteile, FAQs)
├── messgeraete-kalibrieren/ # Messgeräte-Kalibrierung (6 Gerätekategorien)
├── kalibrierkosten/       # Preisübersicht mit Suche (Client Component, 300ms Debounce)
├── kontakt/               # Kontaktseite
├── ueber-uns/             # Über uns (Geschichte, Werte)
├── faq/                   # FAQ-Seite (10 FAQs, JSON-LD Schema)
├── impressum/             # Impressum (noindex, follow)
└── datenschutz/           # Datenschutzerklärung (noindex, follow)

components/
├── Header.tsx             # Sticky Header mit Mobile-Hamburger-Menü ('use client')
├── Footer.tsx             # Footer mit Kontaktinfos (Server Component)
├── ContactSidebar.tsx     # Rechte Sidebar mit Schnellanfrage-Formular ('use client')
├── EmailLink.tsx          # E-Mail-Link mit Copy-to-Clipboard ('use client')
├── PageFAQ.tsx            # FAQ-Akkordeon für Unterseiten ('use client')
└── dashboard/             # Dashboard-Komponenten (interne Nutzung)

lib/
└── config.ts              # Zentrale Konfiguration (siteConfig)

scripts/
└── fetch-toolboxx.mjs     # Prebuild: Holt Produktdaten von toolboxx.biz API

tests/
└── features.test.ts       # 27 Regression-Tests (Playwright)

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
- **Meta-Tags:** OpenGraph (de_DE), Twitter Card pro Seite
- **Googlebot:** index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1
- **Structured Data:** JSON-LD FAQPage Schema auf /faq
- **Keywords:** kalibrierservice, werkskalibrierung, messgeräte kalibrieren, kalibrierung dienstleister, kalibrierlabor, messmittel kalibrierung, iso kalibrierung, kalibrierung nordhorn

## Tests

27 Playwright E2E-Regressionstests in `tests/features.test.ts`:
- Homepage-Rendering, Navigation, Contact-Sidebar auf allen Seiten
- Kontaktformular-Pflichtfelder und Datenschutz-Checkbox
- Keine verbotenen Akkreditierungs-Claims
- Kalibrierkosten: Suche, Kategorien, gefilterte Ergebnisse
- API-Endpoints: Items, Kategorien, Suche
- Footer: Copyright, E-Mail, keine USt-IdNr
- Performance: Keine Console-Errors, alle internen Links erreichbar

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
- [x] 27 Playwright E2E-Tests
- [x] SEO-Indexierung aktiviert (07.03.2026)
- [x] Domain auf inektra.de umgestellt
- [x] Canonical-URLs korrigiert
- [x] Supabase/PostgreSQL komplett entfernt
- [x] Vercel Auto-Deployment konfiguriert

## Offene Punkte

### Wichtig
- [ ] Google Search Console einrichten (Sitemap einreichen)
- [ ] Resend Custom Domain konfigurieren (E-Mails von @inektra.de)
- [ ] Erste Kategorie-Landingpages (`/kalibrierung/multimeter`)

### Nice-to-Have
- [ ] Structured Data erweitern: Organization, LocalBusiness, Service Schema
- [ ] Admin-Dashboard für Lead-Management
- [ ] Automatische Content-Optimierung
