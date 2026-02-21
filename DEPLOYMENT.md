# 🚀 Deployment Guide: Vercel + GitHub

---

## 📋 Voraussetzungen

- GitHub Account
- Vercel Account (kostenlos: https://vercel.com)
- Git installiert

---

## 1️⃣ GitHub Repository erstellen

### Option A: Neues Repo erstellen

```bash
# Im Projekt-Verzeichnis
cd /home/olaf/.openclaw/workspace/inektra-web

# GitHub Repo erstellen (auf github.com):
# 1. Gehe zu https://github.com/new
# 2. Name: "inektra-web"
# 3. Private oder Public (empfohlen: Private)
# 4. NICHT "Initialize with README" anklicken

# Dann lokal:
git remote add origin https://github.com/DEIN-USERNAME/inektra-web.git
git branch -M main
git push -u origin main
```

### Option B: Über GitHub Desktop

1. Öffne GitHub Desktop
2. File → Add Local Repository
3. Wähle `/home/olaf/.openclaw/workspace/inektra-web`
4. Publish Repository

---

## 2️⃣ Vercel Deployment

### Automatisch (empfohlen):

1. **Gehe zu https://vercel.com**
2. Klicke **"Add New Project"**
3. Wähle **"Import Git Repository"**
4. Autorisiere GitHub (falls noch nicht)
5. Wähle **"inektra-web"** Repository
6. **Framework Preset:** Next.js (automatisch erkannt)
7. **Root Directory:** `.` (leer lassen)
8. **Build Command:** `npm run build` (automatisch)
9. **Output Directory:** `.next` (automatisch)

### Environment Variables hinzufügen:

Klicke auf **"Environment Variables"** und füge hinzu:

```env
# ── Domain ──────────────────────────────────────────────────
NEXT_PUBLIC_DOMAIN=kalibrierservice.com
NEXT_PUBLIC_SITE_URL=https://kalibrierservice.com

# ── Contact ─────────────────────────────────────────────────
NEXT_PUBLIC_PHONE=+49 5921 72 31 00
NEXT_PUBLIC_EMAIL=info@inektra.com
NEXT_PUBLIC_BRAND_NAME=inektra GmbH

# ── Backend ─────────────────────────────────────────────────
DATABASE_URL=postgresql://lurch_admin:oF&4449@localhost:5432/lurch_db
SISTRIX_API_KEY=sNSpD9wNJSRDeqjCpyHYusf5XDBaypDbj
SMTP_PASSWORD=oF&4449
```

⚠️ **WICHTIG:** Kopiere ALLE Variablen aus `.env.local`!

10. Klicke **"Deploy"**

---

## 3️⃣ Custom Domain verknüpfen

Nach erfolgreichem Deployment:

1. Gehe zu **Settings → Domains** in Vercel
2. Klicke **"Add Domain"**
3. Gib ein: `kalibrierservice.com`
4. Vercel zeigt DNS-Einträge an:

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. Gehe zu deinem Domain-Registrar (z.B. Strato, 1&1, Cloudflare)
6. Öffne DNS-Einstellungen
7. Füge die DNS-Einträge hinzu
8. Warte 5-60 Minuten (DNS-Propagierung)

✅ **Fertig!** Website ist live unter `kalibrierservice.com`

---

## 4️⃣ Automatische Deployments

Vercel deployed **automatisch** bei jedem Git Push:

```bash
# Änderungen machen
git add .
git commit -m "Update XYZ"
git push

# → Vercel deployed automatisch!
```

**Production:** `main` Branch → kalibrierservice.com  
**Preview:** Andere Branches → `branch-name.vercel.app`

---

## 5️⃣ Testing vor Deployment

### Lokal testen:

```bash
npm run build
npm start

# Öffne http://localhost:3000
```

### Automatische Tests:

```bash
# Playwright Tests ausführen
npm test

# Interaktive UI
npm run test:ui

# Test-Report ansehen
npm run test:report
```

**✅ Alle Tests müssen grün sein vor Deployment!**

---

## 6️⃣ Rollback bei Problemen

Falls nach Deployment Probleme auftreten:

1. Gehe zu Vercel Dashboard
2. Klicke auf **"Deployments"**
3. Finde die letzte funktionierende Version
4. Klicke **"Promote to Production"**

→ Sofortiger Rollback!

---

## 7️⃣ Monitoring

### Vercel Analytics:

1. Gehe zu **Analytics** Tab
2. Siehe:
   - Page Views
   - Visitors
   - Performance (Core Web Vitals)

### Logs:

1. Klicke auf **Deployment**
2. **Runtime Logs** zeigen:
   - API-Calls
   - Errors
   - Performance

---

## 🔧 Troubleshooting

### Problem: Build schlägt fehl

**Lösung:**
```bash
# Lokal builden testen
npm run build

# Fehler beheben
# Dann pushen
git push
```

### Problem: Environment Variables fehlen

**Lösung:**
1. Vercel Dashboard → Settings → Environment Variables
2. Alle Variablen aus `.env.local` hinzufügen
3. **Redeploy** klicken

### Problem: Domain funktioniert nicht

**Lösung:**
1. DNS-Einträge bei Registrar checken
2. Warte 1 Stunde (DNS-Propagierung)
3. Teste mit: `dig kalibrierservice.com`

---

## 📊 Continuous Integration (Optional)

### GitHub Actions für Tests:

Erstelle `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
```

→ Tests laufen automatisch bei jedem Push!

---

## ✅ Checkliste vor Production

- [ ] Alle Tests grün (`npm test`)
- [ ] Lokal Build erfolgreich (`npm run build`)
- [ ] Environment Variables in Vercel gesetzt
- [ ] Domain DNS-Einträge konfiguriert
- [ ] SSL-Zertifikat aktiv (automatisch von Vercel)
- [ ] Kontaktformular getestet (E-Mail-Versand)
- [ ] Mobile Ansicht getestet
- [ ] Alle Links funktionieren

---

**Deployment-Zeit:** ~5 Minuten  
**Kosten:** $0 (Vercel Free Tier)  
**Performance:** Edge Network (weltweit schnell)

🚀 **Viel Erfolg mit dem Deployment!**
