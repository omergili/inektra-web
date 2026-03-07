# Lead-Management – inektra-web

## Aktueller Status

Das Kontaktformular ist aktiv und versendet Anfragen per **Resend API** als E-Mail an info@inektra.de.

### Lead-Flow

1. Besucher fuellt ContactSidebar-Formular aus (Name, E-Mail, Telefon, Nachricht, optionaler Datei-Upload)
2. POST an `/api/contact` (FormData/multipart)
3. Serverseitige Validierung (Name + E-Mail Pflicht, Datenschutz-Checkbox)
4. HTML-Escaping gegen XSS
5. Resend API sendet E-Mail an info@inektra.de (mit Reply-To des Absenders)
6. Lead wird in Vercel Runtime Logs geloggt (Timestamp, Kontaktdaten)

### Wo landen Leads?

| Kanal | Status |
|-------|--------|
| E-Mail an info@inektra.de | Aktiv (via Resend API) |
| Vercel Runtime Logs | Aktiv (stdout Logging) |

---

## Vercel Logs ansehen

**Via Dashboard:**
https://vercel.com/omergilis-projects/inektra-web → Runtime Logs

**Suche nach:**
`NEW CONTACT FORM SUBMISSION` oder `LEAD`

---

## Naechste Schritte

- [ ] Resend Custom Domain einrichten (E-Mails von @inektra.de statt onboarding@resend.dev)
- [ ] Telegram-Benachrichtigung bei neuen Leads
- [ ] Lead-Datenbank (optional, wenn Volumen steigt)

---

**Letzte Aktualisierung:** 07.03.2026
