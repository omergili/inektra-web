# Deployment Guide – inektra-web

## Plattform

**Vercel** – Auto-Deployment bei Push/Merge auf `main` Branch.
- Dashboard: https://vercel.com/omergilis-projects/inektra-web
- Domain: inektra.de (Custom Domain, SSL automatisch)

---

## Deployment-Workflow

### Automatisch (Standard)

```bash
# Aenderungen committen
git add <dateien>
git commit -m "Beschreibung der Aenderung"

# Push loest automatisches Deployment aus
git push origin main
```

Vercel erkennt den Push und deployed automatisch (~50-60s Build-Zeit).

### Manuelles Redeploy

Im Vercel Dashboard unter Deployments → letztes Deployment → "Redeploy" klicken.

---

## Voraussetzungen

### Environment Variables (in Vercel konfiguriert)

```
RESEND_API_KEY              # E-Mail-Versand (Kontaktformular)
TOOLBOXX_API_KEY            # Produktdaten von toolboxx.biz
NEXT_PUBLIC_DOMAIN          # inektra.de
NEXT_PUBLIC_SITE_URL        # https://inektra.de
NEXT_PUBLIC_BRAND_NAME      # inektra GmbH
NEXT_PUBLIC_PHONE           # +49 5921 72 31 00
NEXT_PUBLIC_EMAIL           # info@inektra.de
```

Environment Variables aendern: Vercel Dashboard → Settings → Environment Variables

### Build-Prozess

1. `npm run prebuild` – Holt Produktdaten von toolboxx.biz API
2. `npm run build` – Next.js Build (Static + Server Pages)
3. Deployment auf Vercel Edge Network

---

## Lokales Testen

```bash
# Dev-Server starten
npm run dev

# Production Build testen
npm run build && npm start

# E2E-Tests ausfuehren
npm test
```

---

## Rollback

1. Vercel Dashboard → Deployments
2. Funktionierendes Deployment finden
3. "Promote to Production" klicken

---

## Troubleshooting

### Build schlaegt fehl

```bash
# Lokal Build testen
npm run build
# Fehler beheben, committen, pushen
```

### Environment Variables fehlen

1. Vercel Dashboard → Settings → Environment Variables
2. Fehlende Variable hinzufuegen
3. Redeploy ausloesen

### toolboxx-items.json fehlt

Die Datei wird beim Build automatisch erzeugt (`prebuild` Script). Falls `TOOLBOXX_API_KEY` fehlt, wird der Build mit leeren Produktdaten fortgesetzt.

---

**Letzte Aktualisierung:** 07.03.2026
