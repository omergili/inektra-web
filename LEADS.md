# Lead-Management für inektra-web

## Aktueller Status

**Contact-Form funktioniert!** Aber Leads werden **noch nicht** automatisch per E-Mail/Telegram versendet.

### Wo landen Leads aktuell?

1. **Vercel Logs** (primär): Alle Submissions werden geloggt mit `[🔔 NEW CONTACT FORM SUBMISSION]`
2. **Resend.com E-Mail** (optional): Wenn `RESEND_API_KEY` konfiguriert ist

---

## Setup: E-Mail-Benachrichtigungen via Resend.com

**Warum Resend?**
- Speziell für Next.js/Vercel gemacht
- 3.000 E-Mails/Monat **kostenlos**
- Funktioniert out-of-the-box (kein SMTP-Port-Blocking wie bei klassischem SMTP)

**Setup (5 Minuten):**

1. **Resend-Account erstellen:**
   - Gehe zu https://resend.com/signup
   - Signup mit GitHub/Google

2. **API-Key holen:**
   - Dashboard → API Keys → Create API Key
   - Kopiere den Key (beginnt mit `re_...`)

3. **Environment Variable setzen:**
   ```bash
   cd /home/olaf/.openclaw/workspace/inektra-web
   echo "re_..." | vercel env add RESEND_API_KEY production
   ```

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

5. **Custom Domain (optional, später):**
   - Resend → Domains → Add Domain
   - DNS-Einträge bei deinem Provider eintragen
   - Dann in route.ts `from:` ändern zu `from: 'kontakt@inektra.de'`

---

## Alternative: Telegram-Benachrichtigungen

**Option A: Heartbeat-Polling** (später von myLurch implementiert)
- myLurch checkt regelmäßig Vercel-Logs
- Neue Leads werden per Telegram gesendet

**Option B: Webhook** (komplexer)
- Lokaler Webhook-Server + Cloudflare Tunnel
- Contact-Form sendet direkt an Webhook
- Webhook sendet Telegram-Nachricht

---

## Vercel Logs ansehen

**Via CLI:**
```bash
vercel logs inektra-web --follow
```

**Via Dashboard:**
https://vercel.com/omergilis-projects/inektra-web/logs

**Filtern nach Leads:**
Suche nach: `NEW CONTACT FORM SUBMISSION`

---

## Nächste Schritte

- [ ] Resend.com API-Key einrichten
- [ ] Custom Domain für Resend (inektra.de)
- [ ] Telegram-Integration (via myLurch Heartbeat)
- [ ] Admin-Panel für Lead-Management (später)
- [ ] Vercel KV für persistent Lead-Storage (später)

---

**Für Fragen:** Frag myLurch! 🗿
