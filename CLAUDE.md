# CLAUDE.md – inektra Kalibrierservice Webseite

## Projekt-Überblick

Unternehmenswebseite der **inektra GmbH** – ein Kalibrierdienstleister mit Labor in Nordhorn (ehemals Calpro Hagels/Theußing GmbH & Co. KG). Die Webseite dient der Lead-Generierung für Werkskalibrierungen und zeigt einen durchsuchbaren Katalog mit über 3.200 kalibrierbaren Gerätetypen.

**Domain:** inektra.de
**Sprache:** Deutsch (de_DE)
**Deployment:** Vercel (Auto-Deploy bei Push/Merge auf main)
**Status:** Live, Indexierung aktiviert (robots: index/follow, robots.txt: Allow /)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Sprache:** TypeScript (strict mode)
- **UI:** React 19, Tailwind CSS 4 (PostCSS-Plugin)
- **Datenbank:** PostgreSQL via `pg` Pool + Supabase Client
- **E-Mail:** Resend API (Kontaktformular)
- **Produktdaten:** toolboxx.biz API (prebuild-Script fetcht Daten → `data/toolboxx-items.json`)
- **Tests:** Playwright (E2E-Tests gegen localhost:3000)
- **Linting:** ESLint 9 mit eslint-config-next
- **Icons:** @heroicons/react

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
├── robots.ts              # SEO robots.txt
├── api/
│   ├── contact/route.ts   # POST: Kontaktformular → Resend E-Mail
│   ├── toolboxx/items/route.ts  # GET: Kalibrier-Katalog (Suche, Filter, Kategorien)
│   ├── category/[slug]/route.ts # Kategorie-API
│   └── test-db/route.ts   # DB-Verbindungstest
├── kalibrierservice/      # Leistungsseite
├── messgeraete-kalibrieren/ # Messgeräte-Kalibrierung
├── kalibrierkosten/       # Preisübersicht mit Suche (Client Component)
├── kontakt/               # Kontaktseite
├── ueber-uns/             # Über uns
├── faq/                   # FAQ-Seite
├── impressum/             # Impressum
└── datenschutz/           # Datenschutzerklärung

components/
├── Header.tsx             # Sticky Header mit Mobile-Hamburger-Menü ('use client')
├── Footer.tsx             # Footer mit Kontaktinfos (Server Component)
├── ContactSidebar.tsx     # Rechte Sidebar mit Schnellanfrage-Formular ('use client')
├── EmailLink.tsx          # E-Mail-Link Komponente
├── PageFAQ.tsx            # FAQ-Akkordeon für Unterseiten
└── dashboard/             # Dashboard-Komponenten (interne Nutzung)

lib/
├── config.ts              # Zentrale Konfiguration (siteConfig)
├── db.ts                  # PostgreSQL Pool + Query-Helper
└── supabase.ts            # Supabase Client

scripts/
└── fetch-toolboxx.mjs     # Prebuild: Holt Produktdaten von toolboxx.biz API

database/
└── schema.sql             # SEO-Optimierung DB-Schema (Page Versions, A/B Tests, Rankings)

tests/
└── features.test.ts       # 27 Regression-Tests (Playwright)
```

## Architektur-Muster

### Layout-System
- Root Layout: `<Header />` + `<main>` + `<Footer />` + `<ContactSidebar />`
- Die ContactSidebar ist auf **allen Seiten** rechts fixiert (Desktop: immer sichtbar, Mobile: Toggle-Button)
- Content-Bereiche nutzen `lg:pr-96` um Platz für die Sidebar zu lassen (384px)

### Konfiguration
- **Alle** Seitenkonfigurationen zentral in `lib/config.ts` (`siteConfig`)
- Navigation, Kontaktdaten, Firmeninfos, SEO-Keywords – alles an einer Stelle
- Environment-Variablen mit Fallback-Defaults

### Datenfluss Kalibrierkosten
1. `scripts/fetch-toolboxx.mjs` wird vor dem Build ausgeführt (prebuild)
2. Daten werden in `data/toolboxx-items.json` gespeichert (gitignored)
3. API-Route `app/api/toolboxx/items/route.ts` liest und cached die JSON-Datei
4. Kategorisierung erfolgt serverseitig über Keyword-Matching
5. Client-Seite `app/kalibrierkosten/page.tsx` nutzt Suche mit 300ms Debounce

### Kontaktformular
- FormData (multipart) → `/api/contact` → Resend API → E-Mail an info@inektra.de
- Unterstützt Dateianhänge (Excel, PDF, CSV)
- HTML-Escaping gegen XSS

## Wichtige Geschäftsregeln

1. **KEINE Akkreditierungs-Claims:** Die Seite darf NICHT "DIN EN ISO/IEC 17025", "ISO 9001" oder "akkreditiert" enthalten. Es handelt sich um **Werkskalibrierung** (nicht akkreditiert). Korrekte Formulierung: "ISO-Normen" oder "Werkskalibrierung".

2. **Keine Markennamen auf der Homepage:** Markennamen (Fluke, Tektronix, etc.) nur auf der Kalibrierkosten-Seite, nicht auf der Homepage.

3. **Versandkosten:** Einsendung auf Kundenkosten. Rückversand: 15 EUR netto zzgl. MwSt. Palettenversand nach Aufwand.

4. **Firmendaten:**
   - Labor: Losserstr. 4, 48527 Nordhorn
   - Firmensitz (Impressum): Zum Jadebusen 73, 26316 Varel
   - CEO: Arthur Barasch
   - USt-IdNr: DE320727155 (nur im Impressum, NICHT im Footer)

5. **Toolboxx-Daten:** Einträge mit Präfix "Werkskalibrierung" oder "Akkreditierte Kalibrierung" werden aus dem Katalog gefiltert.

## Design-System

### Farben
- **Primary (Blau):** `primary-600: #0284c7` (Hauptmarkenfarbe)
- **Accent (Orange):** `accent-500: #ea580c` (Logo-Farbe, CTAs, Buttons) – WCAG-konform angepasst
- **Neutral (Grau):** Warme Grautöne für Hintergründe und Text
- **Kein Dark Mode** – nur Light Mode

### Typografie
- Schrift: Inter (Google Fonts), Fallback: system-ui
- Font-Gewichte: 300, 400, 500, 600, 700

### Layout-Muster
- Hero-Sections: `bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900` mit Grid-Overlay
- Content-Sections: Wechsel zwischen `bg-white` und `bg-slate-50`
- CTAs: Orange (`bg-accent-500`) mit Hover-Effekt und Shadow
- Max-Breite: `max-w-7xl` mit `px-4 sm:px-6 lg:px-8 lg:pr-96`

### Accessibility
- Focus-visible Outlines auf allen interaktiven Elementen
- Screen-reader-only Klassen (`.sr-only`)
- Korrekte Formular-Labels mit `htmlFor`
- WCAG-konforme Kontrastverhältnisse (Orange angepasst)

## Umgebungsvariablen

```
NEXT_PUBLIC_DOMAIN          # kalibrierservice.com
NEXT_PUBLIC_SITE_URL        # https://kalibrierservice.com
NEXT_PUBLIC_BRAND_NAME      # inektra GmbH
NEXT_PUBLIC_PHONE           # +49 5921 72 31 00
NEXT_PUBLIC_EMAIL           # info@inektra.de
RESEND_API_KEY              # E-Mail-Versand
TOOLBOXX_API_KEY            # Produktdaten-API
DATABASE_URL                # PostgreSQL (Supabase Pooler)
NEXT_PUBLIC_SUPABASE_URL    # Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY # Supabase Anon Key
```

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

## SEO

- Meta-Tags und OpenGraph pro Seite definiert
- `robots.ts` erlaubt Indexierung, blockiert `/api/`
- Canonical-URLs gesetzt
- Keywords auf Kalibrierservice/Werkskalibrierung fokussiert
- Structured Data via FAQ-Komponenten möglich
- Datenbank-Schema für zukünftige SEO-Selbstoptimierung vorbereitet (A/B Tests, Ranking-Tracking)
