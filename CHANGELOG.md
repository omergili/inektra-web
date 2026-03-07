# Changelog – inektra-web

**Projekt:** Webseite der inektra GmbH (Kalibrierservice)
**Domain:** inektra.de
**Stack:** Next.js 16, TypeScript, Tailwind CSS 4, React 19
**Deployment:** Vercel (Auto-Deploy auf main)

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

**Letzte Aktualisierung:** 07.03.2026
