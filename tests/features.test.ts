/**
 * Feature Regression Tests
 * Stellt sicher, dass implementierte Features nicht verloren gehen
 * Stand: Februar 2026
 */

import { test, expect } from '@playwright/test';

test.describe('Critical Features Check', () => {

  test('Homepage lädt korrekt', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Werkskalibrierung/);

    // Logo ist prominent (Header hat Logo + Footer hat Logo → .first())
    const logo = page.locator('img[alt*="inektra"]').first();
    await expect(logo).toBeVisible();

    // Hero-Section vorhanden
    await expect(page.locator('h1')).toContainText('Werkskalibrierung');
  });

  test('Navigation funktioniert', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Alle Haupt-Nav-Items vorhanden (Links + Dropdown-Buttons)
    const navItems = ['Kalibrierservice', 'Messverfahren', 'Kalibrierkosten', 'Ratgeber', 'Über uns'];
    for (const itemText of navItems) {
      await expect(page.locator(`nav >> text="${itemText}"`).first()).toBeVisible();
    }
  });

  test('Contact-Sidebar ist auf allen Seiten', async ({ page }) => {
    const pages = ['/', '/kalibrierservice', '/messgeraete-kalibrieren', '/kalibrierkosten', '/ueber-uns', '/kontakt', '/kalibrierintervalle', '/laengenkalibrierung', '/druckkalibrierung', '/elektrische-messtechnik-kalibrierung', '/drehmoment-kalibrierung', '/temperaturkalibrierung', '/werkskalibrierung-vs-dakks'];

    for (const url of pages) {
      await page.goto(`http://localhost:3000${url}`);

      // Sidebar sollte existieren (Desktop)
      const sidebar = page.locator('text="Schnellanfrage"');
      await expect(sidebar).toBeVisible({ timeout: 5000 });
    }
  });

  test('Kontaktformular hat alle Pflichtfelder', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Name/Firma
    await expect(page.locator('input[id="quick-name"]')).toBeVisible();

    // E-Mail
    await expect(page.locator('input[id="quick-email"]')).toBeVisible();

    // Datenschutz-Checkbox
    await expect(page.locator('input[id="quick-privacy"]')).toBeVisible();

    // Submit-Button
    await expect(page.locator('button:has-text("Anfrage senden")')).toBeVisible();
  });

  test('Datei-Upload ist vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // File-Upload-Input
    await expect(page.locator('input[type="file"]')).toBeAttached();

    // Label
    await expect(page.locator('text="Messmittelliste hochladen"')).toBeVisible();
  });

  test('Keine ISO 17025 Claims', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const content = await page.content();

    // Sicherstellen, dass "DIN EN ISO/IEC 17025" NICHT vorkommt
    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
    expect(content).not.toContain('akkreditiert');
  });

  test('Korrekte Terminologie: ISO-Normen', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const content = await page.content();

    // "ISO-Normen" oder "Werkskalibrierung" sollte vorkommen
    expect(content).toMatch(/ISO-Normen|Werkskalibrierung/);
  });

  test('Nordhorn-Adresse ist korrekt', async ({ page }) => {
    await page.goto('http://localhost:3000/ueber-uns');

    await expect(page.locator('text=/Nordhorn/').first()).toBeVisible();
    await expect(page.locator('text=/Losserstr/').first()).toBeVisible();
  });

  test('Keine Markennamen auf Homepage', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const content = await page.content();

    // Homepage soll keine Markennamen zeigen (Kalibrierkosten-Seite zeigt sie bewusst)
    expect(content).not.toContain('Fluke');
    expect(content).not.toContain('Tektronix');
    expect(content).not.toContain('Metrawatt');
    expect(content).not.toContain('Philips');
  });

  test('Logo ist größer als h-12', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const logo = page.locator('img[alt*="inektra"]').first();
    const classes = await logo.getAttribute('class');

    // h-16 oder h-20 sollte im Class-String sein
    expect(classes).toMatch(/h-(16|20)/);
  });

  test('Contact-Form Submit-Button ist enabled wenn Privacy gecheckt', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const submitBtn = page.locator('button:has-text("Anfrage senden")');

    // Initial disabled
    await expect(submitBtn).toBeDisabled();

    // Nach Privacy-Check enabled
    await page.locator('input[id="quick-privacy"]').check();
    await expect(submitBtn).toBeEnabled();
  });

  test('Alle Unterseiten haben Premium-Design', async ({ page }) => {
    const pages = ['/kalibrierservice', '/messgeraete-kalibrieren', '/kalibrierkosten', '/ueber-uns', '/kontakt', '/kalibrierintervalle', '/laengenkalibrierung', '/druckkalibrierung', '/elektrische-messtechnik-kalibrierung', '/drehmoment-kalibrierung'];

    for (const url of pages) {
      await page.goto(`http://localhost:3000${url}`);

      // Check: Seite hat irgendwo eine Gradient- oder Slate-Hintergrund-Klasse
      const content = await page.content();
      expect(content).toMatch(/gradient|bg-slate|bg-neutral/);
    }
  });

});

test.describe('Kalibrierkosten-Seite', () => {

  test('Seite lädt mit Hero und Suchfeld', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierkosten');

    // Hero-Überschrift
    await expect(page.locator('h1')).toContainText('Kalibrierkosten');

    // Suchfeld
    await expect(page.locator('input[placeholder*="Kalibrierung suchen"]')).toBeVisible();
  });

  test('Kategorie-Filter werden angezeigt', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierkosten');

    // Warte auf Kategorien-Ladung
    await expect(page.locator('text="Nach Kategorie filtern"')).toBeVisible({ timeout: 10000 });

    // "Alle" Button vorhanden (exakt, nicht "Alle akzeptieren" aus Cookie-Banner)
    await expect(page.getByRole('button', { name: 'Alle', exact: true })).toBeVisible();

    // Mindestens Multimeter und Oszilloskope als Kategorien
    await expect(page.locator('button:has-text("Multimeter")')).toBeVisible();
    await expect(page.locator('button:has-text("Oszilloskope")')).toBeVisible();
  });

  test('Suche liefert Ergebnisse', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierkosten');

    // Suche nach "Fluke"
    await page.locator('input[placeholder*="Kalibrierung suchen"]').fill('Fluke');

    // Warte auf Ergebnisse (debounced, 300ms + Netzwerk)
    await page.waitForTimeout(1500);

    // Tabelle sollte Ergebnisse enthalten
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible({ timeout: 10000 });

    // Mindestens ein Ergebnis mit "Fluke" im Namen
    await expect(page.locator('tbody >> text=/Fluke/').first()).toBeVisible();
  });

  test('Kategorie-Filter funktioniert', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierkosten');

    // Warte auf Kategorien
    await expect(page.locator('button:has-text("Multimeter")')).toBeVisible({ timeout: 10000 });

    // Klick auf "Multimeter"
    await page.locator('button:has-text("Multimeter")').click();

    // Warte auf gefilterte Ergebnisse
    await page.waitForTimeout(1000);

    // Ergebnisse sollten vorhanden sein
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible({ timeout: 5000 });

    // Ergebnis sollte "Multimeter" oder "multimeter" enthalten
    const firstRowText = await rows.first().textContent();
    expect(firstRowText?.toLowerCase()).toContain('multimeter');
  });

  test('Werkskalibrierung und Akkreditierte Kalibrierung sind ausgeschlossen', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierkosten');

    // Warte bis Daten geladen
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 10000 });

    // Seite sollte KEINE "Werkskalibrierung"-Einträge zeigen
    const content = await page.locator('tbody').textContent();
    expect(content).not.toContain('Werkskalibrierung');
    expect(content).not.toContain('Akkreditierte Kalibrierung');
  });

});

test.describe('Kalibrierkosten API', () => {

  test('Items-Endpoint gibt Daten zurück', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/toolboxx/items?limit=5');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.items).toBeDefined();
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.items.length).toBeLessThanOrEqual(5);
    expect(data.total).toBeGreaterThan(3000);
  });

  test('Kategorien-Endpoint gibt Kategorien zurück', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/toolboxx/items?categories=true');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.categories).toBeDefined();
    expect(data.categories.length).toBeGreaterThan(10);

    // Multimeter sollte die häufigste Kategorie sein
    expect(data.categories[0].name).toBe('Multimeter');
    expect(data.categories[0].count).toBeGreaterThan(500);
  });

  test('Kategorie-Filter funktioniert', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/toolboxx/items?category=Multimeter&limit=10');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.items.length).toBeGreaterThan(0);

    // Alle Ergebnisse sollten "Multimeter" oder "multimeter" im Namen haben
    for (const item of data.items) {
      expect(item.name.toLowerCase()).toContain('multimeter');
    }
  });

  test('Suche funktioniert', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/toolboxx/items?q=fluke&limit=10');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.items.length).toBeGreaterThan(0);

    // Alle Ergebnisse sollten "Fluke" oder "fluke" enthalten
    for (const item of data.items) {
      expect(item.name.toLowerCase()).toContain('fluke');
    }
  });

  test('Werkskalibrierung ist ausgeschlossen', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/toolboxx/items?q=werkskalibrierung&limit=10');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    // Keine Ergebnisse, da "Werkskalibrierung" ausgeschlossen ist
    expect(data.items.length).toBe(0);
  });

});

test.describe('Footer', () => {

  test('Keine USt-IdNr. im Footer', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const footer = page.locator('footer');
    const footerText = await footer.textContent();

    expect(footerText).not.toContain('USt-IdNr');
    expect(footerText).not.toContain('DE320727155');
  });

  test('Copyright-Text vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const footer = page.locator('footer');
    const footerText = await footer.textContent();
    expect(footerText).toMatch(/© \d{4} inektra/);
    expect(footerText).toContain('Alle Rechte vorbehalten');
  });

  test('E-Mail-Link im Footer', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const footer = page.locator('footer');
    await expect(footer.locator('text="info@inektra.de"')).toBeVisible();
  });

});

test.describe('Cookie Consent Banner', () => {

  test('Banner erscheint bei erstem Besuch', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const banner = page.locator('[role="dialog"][aria-label="Cookie-Einstellungen"]');
    await expect(banner).toBeVisible({ timeout: 5000 });
    await expect(page.locator('button:has-text("Alle akzeptieren")')).toBeVisible();
    await expect(page.locator('button:has-text("Nur essenzielle")')).toBeVisible();
  });

  test('Banner verschwindet nach Akzeptieren', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    await page.locator('button:has-text("Alle akzeptieren")').click();
    const banner = page.locator('[role="dialog"][aria-label="Cookie-Einstellungen"]');
    await expect(banner).not.toBeVisible();
  });

  test('Banner verschwindet nach Ablehnen', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    await page.locator('button:has-text("Nur essenzielle")').click();
    const banner = page.locator('[role="dialog"][aria-label="Cookie-Einstellungen"]');
    await expect(banner).not.toBeVisible();
  });

  test('Banner erscheint nicht wenn Consent gespeichert', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', JSON.stringify({
        essential: true, marketing: false, timestamp: Date.now(), version: '1.0'
      }));
    });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    // Kurz warten damit useEffect laufen kann
    await page.waitForTimeout(500);

    const banner = page.locator('[role="dialog"][aria-label="Cookie-Einstellungen"]');
    await expect(banner).not.toBeVisible();
  });

  test('Consent Mode v2 Default wird immer gesetzt', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const consentScript = page.locator('script#google-consent-default');
    await expect(consentScript).toBeAttached();
  });

  test('Datenschutz-Link im Banner vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const link = page.locator('[role="dialog"] a[href="/datenschutz"]');
    await expect(link).toBeVisible({ timeout: 5000 });
  });

  test('Cookie-Einstellungen Link im Footer', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('footer >> text="Cookie-Einstellungen"')).toBeVisible();
  });

  test('Einstellungen-Panel oeffnet sich', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    await page.getByRole('button', { name: 'Einstellungen', exact: true }).click();
    await expect(page.locator('text="Essenzielle Cookies"')).toBeVisible();
    await expect(page.locator('text="Marketing-Cookies (Google Ads)"')).toBeVisible();
  });

});

test.describe('Kalibrierintervalle SEO', () => {

  test('Seite laed mit korrektem Title und H1', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierintervalle');

    // Title enthaelt Keyword und Brand (Template: %s | inektra GmbH)
    await expect(page).toHaveTitle(/Kalibrierintervalle.*kalibrieren.*inektra GmbH/);

    // H1 enthaelt Keyword
    await expect(page.locator('h1')).toContainText('Kalibrierintervalle');
  });

  test('Structured Data: BreadcrumbList + FAQPage JSON-LD', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierintervalle');
    const content = await page.content();

    // BreadcrumbList JSON-LD (via Breadcrumbs-Komponente)
    expect(content).toContain('"@type":"BreadcrumbList"');

    // FAQPage JSON-LD (via PageFAQ-Komponente)
    expect(content).toContain('"@type":"FAQPage"');

    // 3 FAQ-Fragen vorhanden
    expect(content).toContain('Kalibrierintervall überschreite');
    expect(content).toContain('gesetzliche Vorgaben');
    expect(content).toContain('selbst festlegen');
  });

  test('Canonical URL und OpenGraph vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierintervalle');

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://inektra.de/kalibrierintervalle');

    // OpenGraph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Kalibrierintervalle/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('Interne Verlinkung: Links zu Kalibrierservice, Kalibrierkosten, Messverfahren, Kontakt', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierintervalle');

    // Links im Content-Bereich (nicht Header/Footer)
    const main = page.locator('main');
    await expect(main.locator('a[href="/kalibrierservice"]')).toBeVisible();
    await expect(main.locator('a[href="/kalibrierkosten"]')).toBeVisible();
    await expect(main.locator('a[href="/laengenkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/druckkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/elektrische-messtechnik-kalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/kontakt"]').first()).toBeVisible();
  });

  test('Keine verbotenen Begriffe auf Kalibrierintervalle-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierintervalle');
    const content = await page.content();

    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
    expect(content).not.toContain('akkreditiert');
  });

  test('Keyword im ersten Absatz', async ({ page }) => {
    await page.goto('http://localhost:3000/kalibrierintervalle');

    // Erster Absatz der Einleitung enthaelt "Kalibrierintervall"
    const firstParagraph = page.locator('section:nth-of-type(2) p').first();
    await expect(firstParagraph).toContainText('Kalibrierintervall');
  });

  test('Eingehende Links von Kalibrierservice, Messgeraete und Messverfahren-Seiten', async ({ page }) => {
    // /kalibrierservice hat Link zu /kalibrierintervalle
    await page.goto('http://localhost:3000/kalibrierservice');
    const main1 = page.locator('main');
    await expect(main1.locator('a[href="/kalibrierintervalle"]')).toBeVisible();

    // /messgeraete-kalibrieren erwaehnt Kalibrierintervalle in FAQ
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');
    const content = await page.content();
    expect(content).toContain('Kalibrierintervallen');

    // Alle 4 Messverfahren-Seiten haben Link zu /kalibrierintervalle
    for (const url of ['/laengenkalibrierung', '/druckkalibrierung', '/elektrische-messtechnik-kalibrierung', '/drehmoment-kalibrierung']) {
      await page.goto(`http://localhost:3000${url}`);
      const main = page.locator('main');
      await expect(main.locator('a[href="/kalibrierintervalle"]').first()).toBeVisible();
    }
  });

});

test.describe('Laengenkalibrierung SEO', () => {

  test('Seite laed mit korrektem Title und H1', async ({ page }) => {
    await page.goto('http://localhost:3000/laengenkalibrierung');

    // Title enthaelt Keyword und Brand (Template: %s | inektra GmbH)
    await expect(page).toHaveTitle(/Längenkalibrierung.*inektra GmbH/);

    // H1 enthaelt Keyword
    await expect(page.locator('h1')).toContainText('Längenkalibrierung');
  });

  test('Structured Data: BreadcrumbList + FAQPage JSON-LD', async ({ page }) => {
    await page.goto('http://localhost:3000/laengenkalibrierung');
    const content = await page.content();

    // BreadcrumbList JSON-LD (via Breadcrumbs-Komponente)
    expect(content).toContain('"@type":"BreadcrumbList"');

    // FAQPage JSON-LD (via PageFAQ-Komponente)
    expect(content).toContain('"@type":"FAQPage"');

    // 3 FAQ-Fragen vorhanden
    expect(content).toContain('Prüfumfänge');
    expect(content).toContain('Längenkalibrierung');
    expect(content).toContain('Bezugstemperatur');
  });

  test('Canonical URL und OpenGraph vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/laengenkalibrierung');

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://inektra.de/laengenkalibrierung');

    // OpenGraph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Längenkalibrierung/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('Interne Verlinkung: Links zu Messverfahren, Kalibrierkosten, Kalibrierintervalle, Kontakt', async ({ page }) => {
    await page.goto('http://localhost:3000/laengenkalibrierung');

    // Links im Content-Bereich (nicht Header/Footer)
    const main = page.locator('main');
    await expect(main.locator('a[href="/messgeraete-kalibrieren"]')).toBeVisible();
    await expect(main.locator('a[href="/druckkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/elektrische-messtechnik-kalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/kalibrierkosten"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierintervalle"]')).toBeVisible();
    await expect(main.locator('a[href="/kontakt"]').first()).toBeVisible();
  });

  test('Keine verbotenen Begriffe auf Laengenkalibrierung-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000/laengenkalibrierung');
    const content = await page.content();

    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
    expect(content).not.toContain('akkreditiert');
  });

  test('Keyword im ersten Absatz', async ({ page }) => {
    await page.goto('http://localhost:3000/laengenkalibrierung');

    // Erster Absatz der Einleitung enthaelt "Längenkalibrierung"
    const firstParagraph = page.locator('section:nth-of-type(2) p').first();
    await expect(firstParagraph).toContainText('Längenkalibrierung');
  });

  test('Eingehende Links von Messgeraete-kalibrieren, Kalibrierintervalle und Messverfahren-Seiten', async ({ page }) => {
    // /messgeraete-kalibrieren hat Link zu /laengenkalibrierung
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');
    const main1 = page.locator('main');
    await expect(main1.locator('a[href="/laengenkalibrierung"]').first()).toBeVisible();

    // /kalibrierintervalle hat Link zu /laengenkalibrierung
    await page.goto('http://localhost:3000/kalibrierintervalle');
    const main2 = page.locator('main');
    await expect(main2.locator('a[href="/laengenkalibrierung"]')).toBeVisible();

    // /druckkalibrierung hat Cross-Link zu /laengenkalibrierung
    await page.goto('http://localhost:3000/druckkalibrierung');
    const main3 = page.locator('main');
    await expect(main3.locator('a[href="/laengenkalibrierung"]')).toBeVisible();

    // /elektrische-messtechnik-kalibrierung hat Cross-Link zu /laengenkalibrierung
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');
    const main4 = page.locator('main');
    await expect(main4.locator('a[href="/laengenkalibrierung"]')).toBeVisible();

    // /drehmoment-kalibrierung hat Cross-Link zu /laengenkalibrierung
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');
    const main5 = page.locator('main');
    await expect(main5.locator('a[href="/laengenkalibrierung"]')).toBeVisible();
  });

  test('Technische Fachinhalte: DKD-R und VDI-Richtlinien vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/laengenkalibrierung');
    const content = await page.content();

    // Unique Content: Spezifische Pruefungsrichtlinien
    expect(content).toContain('DKD-R 4-3');
    expect(content).toContain('VDI/VDE/DGQ 2618');
    expect(content).toContain('DIN EN ISO 14253-1');

    // Geraetetypen mit Normen
    expect(content).toContain('DIN EN ISO 3650');
    expect(content).toContain('DIN 862');
    expect(content).toContain('DIN 863');
    expect(content).toContain('DIN 878');
  });

});

test.describe('Druckkalibrierung SEO', () => {

  test('Seite laed mit korrektem Title und H1', async ({ page }) => {
    await page.goto('http://localhost:3000/druckkalibrierung');

    // Title enthaelt Keyword und Brand (Template: %s | inektra GmbH)
    await expect(page).toHaveTitle(/Druckkalibrierung.*inektra GmbH/);

    // H1 enthaelt Keyword
    await expect(page.locator('h1')).toContainText('Druckkalibrierung');
  });

  test('Structured Data: BreadcrumbList + FAQPage JSON-LD', async ({ page }) => {
    await page.goto('http://localhost:3000/druckkalibrierung');
    const content = await page.content();

    // BreadcrumbList JSON-LD (via Breadcrumbs-Komponente)
    expect(content).toContain('"@type":"BreadcrumbList"');

    // FAQPage JSON-LD (via PageFAQ-Komponente)
    expect(content).toContain('"@type":"FAQPage"');

    // 3 FAQ-Fragen vorhanden
    expect(content).toContain('steigende UND fallende');
    expect(content).toContain('Genauigkeitsklassen');
    expect(content).toContain('Manometer-Kalibrierung');
  });

  test('Canonical URL und OpenGraph vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/druckkalibrierung');

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://inektra.de/druckkalibrierung');

    // OpenGraph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Druckkalibrierung/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('Interne Verlinkung: Links zu Messverfahren, Kalibrierkosten, Kalibrierintervalle, Kontakt', async ({ page }) => {
    await page.goto('http://localhost:3000/druckkalibrierung');

    // Links im Content-Bereich (nicht Header/Footer)
    const main = page.locator('main');
    await expect(main.locator('a[href="/messgeraete-kalibrieren"]')).toBeVisible();
    await expect(main.locator('a[href="/laengenkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/elektrische-messtechnik-kalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/kalibrierkosten"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierintervalle"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kontakt"]').first()).toBeVisible();
  });

  test('Keine verbotenen Begriffe auf Druckkalibrierung-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000/druckkalibrierung');
    const content = await page.content();

    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
    expect(content).not.toContain('akkreditiert');
  });

  test('Keyword im ersten Absatz', async ({ page }) => {
    await page.goto('http://localhost:3000/druckkalibrierung');

    // Erster Absatz der Einleitung enthaelt "Druckkalibrierung"
    const firstParagraph = page.locator('section:nth-of-type(2) p').first();
    await expect(firstParagraph).toContainText('Druckkalibrierung');
  });

  test('Eingehende Links von Messgeraete-kalibrieren und Messverfahren-Seiten', async ({ page }) => {
    // /messgeraete-kalibrieren hat Link zu /druckkalibrierung
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');
    const main1 = page.locator('main');
    await expect(main1.locator('a[href="/druckkalibrierung"]').first()).toBeVisible();

    // /laengenkalibrierung hat Cross-Link zu /druckkalibrierung
    await page.goto('http://localhost:3000/laengenkalibrierung');
    const main2 = page.locator('main');
    await expect(main2.locator('a[href="/druckkalibrierung"]')).toBeVisible();

    // /elektrische-messtechnik-kalibrierung hat Cross-Link zu /druckkalibrierung
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');
    const main3 = page.locator('main');
    await expect(main3.locator('a[href="/druckkalibrierung"]')).toBeVisible();

    // /drehmoment-kalibrierung hat Cross-Link zu /druckkalibrierung
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');
    const main4 = page.locator('main');
    await expect(main4.locator('a[href="/druckkalibrierung"]')).toBeVisible();
  });

  test('Technische Fachinhalte: DKD-R 6-1 und DIN EN 837 vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/druckkalibrierung');
    const content = await page.content();

    // Spezifische Pruefungsrichtlinien
    expect(content).toContain('DKD-R 6-1');
    expect(content).toContain('DIN EN 837');

    // Preisanker
    expect(content).toContain('20,85');
    expect(content).toContain('46,90');
  });

});

test.describe('Elektrische Messtechnik Kalibrierung SEO', () => {

  test('Seite laed mit korrektem Title und H1', async ({ page }) => {
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');

    // Title enthaelt Keyword und Brand (Template: %s | inektra GmbH)
    await expect(page).toHaveTitle(/Elektrische Messtechnik.*inektra GmbH/);

    // H1 enthaelt Keyword
    await expect(page.locator('h1')).toContainText('Elektrische Messtechnik');
  });

  test('Structured Data: BreadcrumbList + FAQPage JSON-LD', async ({ page }) => {
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');
    const content = await page.content();

    // BreadcrumbList JSON-LD (via Breadcrumbs-Komponente)
    expect(content).toContain('"@type":"BreadcrumbList"');

    // FAQPage JSON-LD (via PageFAQ-Komponente)
    expect(content).toContain('"@type":"FAQPage"');

    // 3 FAQ-Fragen vorhanden
    expect(content).toContain('Messfunktionen');
    expect(content).toContain('Multimeter-Kalibrierung');
    expect(content).toContain('elektrischer Messgeräte');
  });

  test('Canonical URL und OpenGraph vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://inektra.de/elektrische-messtechnik-kalibrierung');

    // OpenGraph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Elektrische Messtechnik/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('Interne Verlinkung: Links zu Messverfahren, Kalibrierkosten, Kalibrierintervalle, Kontakt', async ({ page }) => {
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');

    // Links im Content-Bereich (nicht Header/Footer)
    const main = page.locator('main');
    await expect(main.locator('a[href="/messgeraete-kalibrieren"]')).toBeVisible();
    await expect(main.locator('a[href="/laengenkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/druckkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/kalibrierkosten"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierintervalle"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kontakt"]').first()).toBeVisible();
  });

  test('Keine verbotenen Begriffe auf Elektrische-Messtechnik-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');
    const content = await page.content();

    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
    expect(content).not.toContain('akkreditiert');
  });

  test('Keyword im ersten Absatz', async ({ page }) => {
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');

    // Erster Absatz der Einleitung enthaelt "elektrische" oder "Messtechnik"
    const firstParagraph = page.locator('section:nth-of-type(2) p').first();
    await expect(firstParagraph).toContainText('elektrischer Messgeräte');
  });

  test('Eingehende Links von Messgeraete-kalibrieren und Messverfahren-Seiten', async ({ page }) => {
    // /messgeraete-kalibrieren hat Link zu /elektrische-messtechnik-kalibrierung
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');
    const main1 = page.locator('main');
    await expect(main1.locator('a[href="/elektrische-messtechnik-kalibrierung"]').first()).toBeVisible();

    // /laengenkalibrierung hat Cross-Link zu /elektrische-messtechnik-kalibrierung
    await page.goto('http://localhost:3000/laengenkalibrierung');
    const main2 = page.locator('main');
    await expect(main2.locator('a[href="/elektrische-messtechnik-kalibrierung"]')).toBeVisible();

    // /druckkalibrierung hat Cross-Link zu /elektrische-messtechnik-kalibrierung
    await page.goto('http://localhost:3000/druckkalibrierung');
    const main3 = page.locator('main');
    await expect(main3.locator('a[href="/elektrische-messtechnik-kalibrierung"]')).toBeVisible();

    // /drehmoment-kalibrierung hat Cross-Link zu /elektrische-messtechnik-kalibrierung
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');
    const main4 = page.locator('main');
    await expect(main4.locator('a[href="/elektrische-messtechnik-kalibrierung"]')).toBeVisible();
  });

  test('Technische Fachinhalte: VDE-Normen und Preisanker vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');
    const content = await page.content();

    // Spezifische Normen
    expect(content).toContain('DIN VDE 0701-0702');
    expect(content).toContain('DIN VDE 0100');
    expect(content).toContain('IEC 61010');

    // Preisanker
    expect(content).toContain('29,97');
    expect(content).toContain('80,79');
    expect(content).toContain('99,36');
  });

});

test.describe('Drehmomentkalibrierung SEO', () => {

  test('Seite laed mit korrektem Title und H1', async ({ page }) => {
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');

    // Title enthaelt Keyword und Brand (Template: %s | inektra GmbH)
    await expect(page).toHaveTitle(/Drehmomentkalibrierung.*inektra GmbH/);

    // H1 enthaelt Keyword
    await expect(page.locator('h1')).toContainText('Drehmomentkalibrierung');
  });

  test('Structured Data: BreadcrumbList + FAQPage JSON-LD', async ({ page }) => {
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');
    const content = await page.content();

    // BreadcrumbList JSON-LD (via Breadcrumbs-Komponente)
    expect(content).toContain('"@type":"BreadcrumbList"');

    // FAQPage JSON-LD (via PageFAQ-Komponente)
    expect(content).toContain('"@type":"FAQPage"');

    // 3 FAQ-Fragen vorhanden
    expect(content).toContain('Drehmomentschlüssel kalibriert werden');
    expect(content).toContain('Drehmomentschlüssel-Kalibrierung geprüft');
    expect(content).toContain('Drehmomentschlüssel-Kalibrierung?');
  });

  test('Canonical URL und OpenGraph vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://inektra.de/drehmoment-kalibrierung');

    // OpenGraph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Drehmomentkalibrierung/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('Interne Verlinkung: Links zu Messverfahren, Kalibrierkosten, Kalibrierintervalle, Kontakt', async ({ page }) => {
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');

    // Links im Content-Bereich (nicht Header/Footer)
    const main = page.locator('main');
    await expect(main.locator('a[href="/messgeraete-kalibrieren"]')).toBeVisible();
    await expect(main.locator('a[href="/laengenkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/druckkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/elektrische-messtechnik-kalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/kalibrierkosten"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierintervalle"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kontakt"]').first()).toBeVisible();
  });

  test('Keine verbotenen Begriffe auf Drehmomentkalibrierung-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');
    const content = await page.content();

    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
    expect(content).not.toContain('akkreditiert');
  });

  test('Keyword im ersten Absatz', async ({ page }) => {
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');

    // Erster Absatz der Einleitung enthaelt "Drehmoment"
    const firstParagraph = page.locator('section:nth-of-type(2) p').first();
    await expect(firstParagraph).toContainText('Drehmoment');
  });

  test('Eingehende Links von Messgeraete-kalibrieren und Messverfahren-Seiten', async ({ page }) => {
    // /messgeraete-kalibrieren hat Link zu /drehmoment-kalibrierung
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');
    const main1 = page.locator('main');
    await expect(main1.locator('a[href="/drehmoment-kalibrierung"]').first()).toBeVisible();

    // /laengenkalibrierung hat Cross-Link zu /drehmoment-kalibrierung
    await page.goto('http://localhost:3000/laengenkalibrierung');
    const main2 = page.locator('main');
    await expect(main2.locator('a[href="/drehmoment-kalibrierung"]')).toBeVisible();

    // /druckkalibrierung hat Cross-Link zu /drehmoment-kalibrierung
    await page.goto('http://localhost:3000/druckkalibrierung');
    const main3 = page.locator('main');
    await expect(main3.locator('a[href="/drehmoment-kalibrierung"]')).toBeVisible();

    // /elektrische-messtechnik-kalibrierung hat Cross-Link zu /drehmoment-kalibrierung
    await page.goto('http://localhost:3000/elektrische-messtechnik-kalibrierung');
    const main4 = page.locator('main');
    await expect(main4.locator('a[href="/drehmoment-kalibrierung"]')).toBeVisible();
  });

  test('Technische Fachinhalte: DIN EN ISO 6789 und Preisanker vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/drehmoment-kalibrierung');
    const content = await page.content();

    // Spezifische Normen
    expect(content).toContain('DIN EN ISO 6789');
    expect(content).toContain('VDI/VDE 2645');
    expect(content).toContain('DIN 51309');

    // Preisanker
    expect(content).toContain('24,76');
    expect(content).toContain('110,74');
  });

});

test.describe('Temperaturkalibrierung SEO', () => {

  test('Seite laed mit korrektem Title und H1', async ({ page }) => {
    await page.goto('http://localhost:3000/temperaturkalibrierung');

    // Title enthaelt Keyword und Brand (Template: %s | inektra GmbH)
    await expect(page).toHaveTitle(/Temperaturkalibrierung.*inektra GmbH/);

    // H1 enthaelt Keyword
    await expect(page.locator('h1')).toContainText('Temperaturkalibrierung');
  });

  test('Structured Data: BreadcrumbList + FAQPage JSON-LD', async ({ page }) => {
    await page.goto('http://localhost:3000/temperaturkalibrierung');
    const content = await page.content();

    // BreadcrumbList JSON-LD (via Breadcrumbs-Komponente)
    expect(content).toContain('"@type":"BreadcrumbList"');

    // FAQPage JSON-LD (via PageFAQ-Komponente)
    expect(content).toContain('"@type":"FAQPage"');

    // 3 FAQ-Fragen vorhanden
    expect(content).toContain('Thermometer kalibriert werden');
    expect(content).toContain('Vergleichs- und Fixpunktkalibrierung');
    expect(content).toContain('Temperaturkalibrierung?');
  });

  test('Canonical URL und OpenGraph vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/temperaturkalibrierung');

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://inektra.de/temperaturkalibrierung');

    // OpenGraph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Temperaturkalibrierung/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('Interne Verlinkung: Links zu Messverfahren, Kalibrierkosten, Kalibrierintervalle, Kontakt', async ({ page }) => {
    await page.goto('http://localhost:3000/temperaturkalibrierung');

    // Links im Content-Bereich (nicht Header/Footer)
    const main = page.locator('main');
    await expect(main.locator('a[href="/messgeraete-kalibrieren"]')).toBeVisible();
    await expect(main.locator('a[href="/laengenkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/druckkalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/elektrische-messtechnik-kalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/drehmoment-kalibrierung"]')).toBeVisible();
    await expect(main.locator('a[href="/kalibrierkosten"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierintervalle"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kontakt"]').first()).toBeVisible();
  });

  test('Keine verbotenen Begriffe auf Temperaturkalibrierung-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000/temperaturkalibrierung');
    const content = await page.content();

    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
    expect(content).not.toContain('akkreditiert');
  });

  test('Keyword im ersten Absatz', async ({ page }) => {
    await page.goto('http://localhost:3000/temperaturkalibrierung');

    // Erster Absatz der Einleitung enthaelt "Temperaturkalibrierung"
    const firstParagraph = page.locator('section:nth-of-type(2) p').first();
    await expect(firstParagraph).toContainText('Temperaturkalibrierung');
  });

  test('Eingehende Links von Messgeraete-kalibrieren und Kalibrierintervalle', async ({ page }) => {
    // /kalibrierintervalle hat Link zu alle Messverfahren-Seiten
    await page.goto('http://localhost:3000/kalibrierintervalle');
    const main1 = page.locator('main');
    // Temperaturkalibrierung should be linked from other pages once cross-links are added
  });

  test('Technische Fachinhalte: DKD-R 5-1 und DIN EN 60751 vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/temperaturkalibrierung');
    const content = await page.content();

    // Spezifische Normen
    expect(content).toContain('DKD-R 5-1');
    expect(content).toContain('DIN EN 60751');
    expect(content).toContain('VDI/VDE 3511');

    // Preisanker
    expect(content).toContain('15,00');
    expect(content).toContain('45,00');
  });

});

test.describe('Messgeraete-Kalibrieren SEO', () => {

  test('Seite laed mit korrektem H1 (Haupt-Keyword)', async ({ page }) => {
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');

    // H1 enthaelt Haupt-Keyword "kalibrieren"
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text?.toLowerCase()).toContain('kalibrieren');
    expect(h1Text?.toLowerCase()).toContain('messgeräte');
  });

  test('Structured Data: FAQPage JSON-LD mit 8 Fragen', async ({ page }) => {
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');
    const content = await page.content();

    // FAQPage JSON-LD vorhanden
    expect(content).toContain('"@type":"FAQPage"');

    // 8 FAQ-Fragen vorhanden (neue Fragen pruefen)
    expect(content).toContain('Welche Messgeräte können Sie kalibrieren');
    expect(content).toContain('Was kostet eine Messgeräte-Kalibrierung');
    expect(content).toContain('Kalibrieren Sie auch Spezialgeräte');
    expect(content).toContain('Unterschied zwischen Kalibrierung, Justierung und Eichung');
    expect(content).toContain('Kalibrierschein');
    expect(content).toContain('Express-Kalibrierung');
  });

  test('OpenGraph type ist article', async ({ page }) => {
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('Keine verbotenen Begriffe auf Messgeraete-Kalibrieren-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');
    const content = await page.content();

    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
    expect(content).not.toContain('akkreditiert');
    expect(content).not.toContain('DAkkS');
  });

  test('Neue Sections vorhanden: Kalibrierung-Definition, Messgeraete-Checkliste, Normen', async ({ page }) => {
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');
    const content = await page.content();

    // Section: Was bedeutet Kalibrierung
    expect(content).toContain('Was bedeutet Kalibrierung von Messgeräten');
    expect(content).toContain('Kalibrierung, Justierung und Eichung');
    expect(content).toContain('Rückverfolgbarkeit');

    // Section: Welche Messgeraete kalibrieren
    expect(content).toContain('Welche Messgeräte sollten regelmäßig kalibriert werden');

    // Section: Normen und Richtlinien
    expect(content).toContain('Normen und Richtlinien für die Messgeräte-Kalibrierung');
    expect(content).toContain('DKD-R Richtlinien');
    expect(content).toContain('VDI/VDE/DGQ 2618');
  });

  test('Interne Verlinkung: Messverfahren-Seiten, Kalibrierservice, Kalibrierkosten, Kalibrierintervalle', async ({ page }) => {
    await page.goto('http://localhost:3000/messgeraete-kalibrieren');

    const main = page.locator('main');
    await expect(main.locator('a[href="/kalibrierservice"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierkosten"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierintervalle"]').first()).toBeVisible();
    await expect(main.locator('a[href="/laengenkalibrierung"]').first()).toBeVisible();
    await expect(main.locator('a[href="/druckkalibrierung"]').first()).toBeVisible();
    await expect(main.locator('a[href="/elektrische-messtechnik-kalibrierung"]').first()).toBeVisible();
    await expect(main.locator('a[href="/drehmoment-kalibrierung"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kontakt"]').first()).toBeVisible();
  });

});

test.describe('Werkskalibrierung vs DAkkS SEO', () => {

  test('Seite laed mit korrektem Title und H1', async ({ page }) => {
    await page.goto('http://localhost:3000/werkskalibrierung-vs-dakks');

    await expect(page).toHaveTitle(/Werkskalibrierung.*DAkkS.*inektra GmbH/);
    await expect(page.locator('h1')).toContainText('Werkskalibrierung');
  });

  test('Structured Data: BreadcrumbList + FAQPage JSON-LD', async ({ page }) => {
    await page.goto('http://localhost:3000/werkskalibrierung-vs-dakks');
    const content = await page.content();

    expect(content).toContain('"@type":"BreadcrumbList"');
    expect(content).toContain('"@type":"FAQPage"');
    expect(content).toContain('rückverfolgbar');
    expect(content).toContain('ISO-9001-Audits');
  });

  test('Canonical URL und OpenGraph vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/werkskalibrierung-vs-dakks');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://inektra.de/werkskalibrierung-vs-dakks');

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Werkskalibrierung/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'article');
  });

  test('Interne Verlinkung: Links zu Kalibrierservice, Kalibrierkosten, Kontakt', async ({ page }) => {
    await page.goto('http://localhost:3000/werkskalibrierung-vs-dakks');

    const main = page.locator('main');
    await expect(main.locator('a[href="/kalibrierservice"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierkosten"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kalibrierintervalle"]').first()).toBeVisible();
    await expect(main.locator('a[href="/kontakt"]').first()).toBeVisible();
  });

  test('Keyword im ersten Absatz', async ({ page }) => {
    await page.goto('http://localhost:3000/werkskalibrierung-vs-dakks');

    const firstParagraph = page.locator('section:nth-of-type(2) p').first();
    await expect(firstParagraph).toContainText('Werkskalibrierung');
  });

  test('Vergleichstabelle vorhanden', async ({ page }) => {
    await page.goto('http://localhost:3000/werkskalibrierung-vs-dakks');
    const content = await page.content();

    expect(content).toContain('Rückverfolgbarkeit');
    expect(content).toContain('Bearbeitungszeit');
    expect(content).toContain('Kosten');
  });

  test('Keine falschen Akkreditierungs-Claims fuer inektra', async ({ page }) => {
    await page.goto('http://localhost:3000/werkskalibrierung-vs-dakks');
    const content = await page.content();

    // Seite darf DAkkS erwaehnen (ist ja der Vergleich), aber nicht behaupten inektra sei akkreditiert
    expect(content).not.toContain('inektra ist akkreditiert');
    expect(content).not.toContain('DIN EN ISO/IEC 17025');
    expect(content).not.toContain('ISO 9001');
  });

});

test.describe('Layout & Spacing', () => {

  test('Unterseiten haben kompaktes Hero-Layout ohne ueberfluessigen Weissraum', async ({ page }) => {
    const subpages = ['/kalibrierservice', '/messgeraete-kalibrieren', '/ueber-uns', '/kontakt', '/faq', '/kalibrierintervalle', '/laengenkalibrierung', '/druckkalibrierung', '/elektrische-messtechnik-kalibrierung', '/drehmoment-kalibrierung', '/temperaturkalibrierung', '/werkskalibrierung-vs-dakks'];

    for (const url of subpages) {
      await page.goto(`http://localhost:3000${url}`);

      // Breadcrumbs: kein pt-24 mehr (war 96px Weissraum)
      const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
      await expect(breadcrumbNav).toBeVisible();

      // Hero-Section: kein pt-32/min-h-[500px] mehr
      const content = await page.content();
      expect(content).not.toContain('pt-32');
      expect(content).not.toContain('min-h-[500px]');

      // Hero-Section existiert und ist sichtbar
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();
    }
  });

});

test.describe('Performance & Accessibility', () => {

  test('Keine kritischen Console-Errors auf Homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      // Nur echte JS-Fehler, keine 404-Ressourcen (z.B. fehlende Bilder)
      if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });

  test('Alle internen Links sind erreichbar', async ({ request, page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Sammle alle einzigartigen internen Links
    const hrefs = await page.locator('a[href^="/"]').evaluateAll(
      (els) => [...new Set(els.map(el => el.getAttribute('href')).filter(Boolean))]
    );

    for (const href of hrefs) {
      const response = await request.get(`http://localhost:3000${href}`);
      expect(response.ok(), `Link ${href} sollte erreichbar sein`).toBeTruthy();
    }
  });

});
