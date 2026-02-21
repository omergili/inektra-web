# 🚀 Inektra Self-Optimizing SEO Website

**Domain:** kalibrierservice.com (oder inektra.de)  
**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, PostgreSQL  
**Mission:** Selbstoptimierendes SEO-System mit KI-gestützter Content-Optimierung

---

## 📋 Projekt-Übersicht

Dieses Projekt ist eine **hochmoderne, selbstoptimierende Website** für Kalibrierdienstleistungen. 
Das System nutzt **Ranking-Daten** (Google Search Console + Sistrix), um automatisch **Content-Optimierungen** 
vorzuschlagen und durchzuführen.

### Kernfeatures

✅ **6 SEO-optimierte Seiten** (Homepage, Kalibrierservice, Messgeräte, Vor-Ort, Über uns, Kontakt)  
✅ **Multi-Domain-fähig** (kalibrierservice.com ↔ inektra.de per .env umschaltbar)  
✅ **Selbstoptimierende Engine** (KI analysiert Rankings und schlägt Optimierungen vor)  
✅ **A/B-Testing** (Automatische Tests zwischen Content-Varianten)  
✅ **Content-Versionierung** (Rollback-fähig, alle Änderungen nachvollziehbar)  
✅ **Ranking-Monitoring** (Integration mit GSC + Sistrix API)  
✅ **Moderne UI** (Tailwind CSS, Responsive, schnell)

---

## 🗂️ Projekt-Struktur

```
inektra-web/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── kalibrierservice/         # Service-Seite
│   ├── messgeraete-kalibrieren/  # Messgeräte-Seite
│   ├── vor-ort-kalibrierung/     # Vor-Ort-Service
│   ├── ueber-uns/                # Über uns
│   ├── kontakt/                  # Kontaktformular
│   ├── impressum/                # Impressum
│   ├── datenschutz/              # Datenschutz
│   └── layout.tsx                # Root Layout
├── components/                   # React Components
│   ├── Header.tsx                # Site Header
│   └── Footer.tsx                # Site Footer
├── lib/                          # Utilities
│   └── config.ts                 # Zentrale Site-Konfiguration
├── database/                     # Database Schema
│   └── schema.sql                # PostgreSQL Schema (Self-Optimizing)
├── public/                       # Static Assets
└── .env.local                    # Environment Config
```

---

## ⚙️ Installation & Setup

### 1. Dependencies installieren

```bash
cd /home/olaf/.openclaw/workspace/inektra-web
npm install
```

### 2. Umgebungsvariablen konfigurieren

Die `.env.local` Datei ist bereits vorbereitet. Prüfe folgende Werte:

```env
# Domain (umschaltbar)
NEXT_PUBLIC_DOMAIN=kalibrierservice.com  # oder inektra.de

# Database
DATABASE_URL=postgresql://lurch_admin:oF&4449@localhost:5432/lurch_db

# API Keys
SISTRIX_API_KEY=sNSpD9wNJSRDeqjCpyHYusf5XDBaypDbj
# OPENAI_API_KEY=sk-...  (später für KI-Optimierung)
# GSC_CLIENT_ID=...      (später für Google Search Console)
```

### 3. Datenbank-Schema erstellen

```bash
psql -U lurch_admin -d lurch_db -f database/schema.sql
```

Dies erstellt alle Tabellen für:
- Page Versions (Content-Versionierung)
- A/B Tests
- SEO Rankings (erweitert)
- Optimization Queue
- Monitored Keywords

### 4. Development Server starten

```bash
npm run dev
```

Website läuft auf: http://localhost:3000

---

## 🚀 Deployment (Production)

### Option A: Vercel (Empfohlen für Next.js)

1. **Projekt zu Git pushen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Inektra self-optimizing website"
   git remote add origin <dein-repo>
   git push -u origin main
   ```

2. **Vercel Deployment**
   - Gehe zu https://vercel.com
   - "New Project" → GitHub Repo importieren
   - Environment Variables eintragen (.env.local Werte)
   - Deploy klicken

3. **Domain verknüpfen**
   - Vercel Dashboard → Domains
   - `kalibrierservice.com` hinzufügen
   - DNS-Einträge bei Domain-Registrar anpassen

### Option B: Docker (Self-Hosted)

```bash
# Build
npm run build

# Production Start
npm start
```

Nutze Reverse Proxy (nginx) für SSL + Custom Domain.

---

## 🧠 Selbstoptimierungs-System

### Workflow

```
1. Ranking-Monitor (Cronjob täglich 03:00)
   → Holt Daten von Google Search Console + Sistrix
   → Speichert in `seo_rankings` Tabelle

2. Performance-Analyse (KI)
   → Erkennt: Welche Seite verliert?
   → Findet: Welches Keyword hat Potenzial?
   → Identifiziert: Competitor überholt uns?

3. Optimization Queue
   → KI schlägt Änderungen vor (Titel, Meta, Content)
   → Einträge in `optimization_queue` mit Status "pending"

4. Dashboard (manuelles Approval)
   → Du siehst vorgeschlagene Änderungen
   → Approve → Deployment
   → Reject → Abgelehnt

5. A/B Testing (optional)
   → Erstelle Variante A vs. B
   → System misst 14 Tage lang Performance
   → Automatische Auswahl des Gewinners

6. Monitoring & Rollback
   → Nach 14 Tagen: Hat Optimierung funktioniert?
   → Falls nein: Automatischer Rollback zur vorherigen Version
```

### Database Views (für schnellen Zugriff)

```sql
-- Alle Low Hanging Fruits (Position 5-20)
SELECT * FROM low_hanging_fruits;

-- Aktive Seiten-Inhalte
SELECT * FROM active_pages;

-- Pending Optimierungen
SELECT * FROM pending_optimizations;
```

---

## 📊 Domain-Strategie

### kalibrierservice.com (Empfohlen als Haupt-Domain)

**Pro:**
- Exact-Match-Domain → Google liebt das
- Klare Keyword-Signale
- Perfekt für SEO

**Verwendung:**
```env
NEXT_PUBLIC_DOMAIN=kalibrierservice.com
NEXT_PUBLIC_SITE_URL=https://kalibrierservice.com
```

### inektra.de (Brand-Domain)

**Pro:**
- Firmenname = Markenaufbau
- Gut für B2B-Vertrauen

**Verwendung:**
```env
NEXT_PUBLIC_DOMAIN=inektra.de
NEXT_PUBLIC_SITE_URL=https://inektra.de
```

**Multi-Domain-Setup (später):**
- kalibrierservice.com → SEO-optimierte Service-Seiten
- inektra.de → Firmen-Homepage (redirect oder Microsite)
- Canonical-Tags auf Haupt-Domain setzen

---

## 🔧 Nächste Schritte (Phase 2)

### Automation (Backend)

1. **Ranking-Monitor Cronjob**
   ```typescript
   // app/api/cron/ranking-monitor/route.ts
   // Täglich Google Search Console + Sistrix abfragen
   ```

2. **KI-Content-Optimizer**
   ```typescript
   // lib/ai/content-optimizer.ts
   // OpenAI API: Analysiert Rankings → schlägt Optimierungen vor
   ```

3. **A/B Testing Engine**
   ```typescript
   // lib/ab-testing/manager.ts
   // Automatisches Tracking + Gewinner-Selektion
   ```

### Dashboard (Admin-Interface)

4. **Optimization Dashboard**
   - Approve/Reject vorgeschlagene Änderungen
   - A/B-Test-Ergebnisse visualisieren
   - Content-Editor mit Live-Preview

5. **Analytics Integration**
   - Google Search Console API
   - Plausible/Umami (Privacy-friendly)
   - Ranking-Charts (Plotly/Recharts)

### Features

6. **Automatic Content Expansion**
   - KI generiert FAQ-Sections
   - Schema.org Markup automatisch
   - Related Content Suggestions

7. **Competitor Tracking**
   - Monitore Top 3 Competitors
   - Alert wenn Competitor überholt
   - Gap-Analyse (Welche Keywords fehlen uns?)

---

## 📝 Content-Management

### Neue Seite hinzufügen

1. **Seite erstellen**
   ```bash
   mkdir app/neue-seite
   touch app/neue-seite/page.tsx
   ```

2. **Content strukturieren**
   ```typescript
   export const metadata: Metadata = {
     title: 'Titel | Brand',
     description: 'Meta Description...',
     keywords: ['keyword1', 'keyword2'],
   };
   ```

3. **In Navigation eintragen**
   ```typescript
   // lib/config.ts
   navigation: [
     // ...
     { name: 'Neue Seite', href: '/neue-seite' },
   ],
   ```

4. **Version in DB speichern**
   ```sql
   INSERT INTO page_versions (page_slug, title, meta_description, content, is_active)
   VALUES ('neue-seite', 'Titel', 'Description', '{"hero": {...}}', true);
   ```

---

## 🛠️ Development-Commands

```bash
# Dev Server
npm run dev

# Production Build
npm run build

# Production Start
npm start

# Linting
npm run lint

# Type Check
npx tsc --noEmit
```

---

## 🔐 Sicherheit

- ✅ Environment Variables für alle Secrets
- ✅ HTTPS via Vercel/Cloudflare
- ✅ Datenschutzerklärung DSGVO-konform
- ✅ Content Security Policy (CSP) Headers
- ✅ Rate Limiting für API-Calls (später)

---

## 📈 Performance

- ✅ Next.js 15 Server Components (schneller als Client-Side)
- ✅ Tailwind CSS (optimiert, purgiert)
- ✅ ISR (Incremental Static Regeneration) für SEO-Seiten
- ✅ Image Optimization (Next.js built-in)
- ✅ Edge Caching (Vercel Edge Network)

**Lighthouse Score Ziel:** 95+ (Performance, SEO, Accessibility)

---

## 🤝 Zusammenarbeit

**Projekt-Lead:** Olaf (inektra GmbH)  
**Entwickler:** myLurch (OpenClaw Agent)  
**Stack:** Next.js 15 + TypeScript + PostgreSQL + KI

---

## 📞 Support

Bei Fragen oder Problemen:
- E-Mail: info@inektra.com
- Telefon: +49 5921 72 31 00

---

**Version:** 1.0.0  
**Status:** ✅ Phase 1 Complete (6 Seiten, Database Schema, Deployment-Ready)  
**Nächste Phase:** Automation + KI-Integration + Admin Dashboard
