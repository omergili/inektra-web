/**
 * Feature Regression Tests
 * Stellt sicher, dass implementierte Features nicht verloren gehen
 */

import { test, expect } from '@playwright/test';

test.describe('Critical Features Check', () => {
  
  test('Homepage lädt korrekt', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Werkskalibrierung/);
    
    // Logo ist prominent
    const logo = page.locator('img[alt*="inektra"]');
    await expect(logo).toBeVisible();
    
    // Hero-Section vorhanden
    await expect(page.locator('h1')).toContainText('Präzisions-Werkskalibrierung');
  });

  test('Navigation funktioniert', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Alle Haupt-Nav-Links vorhanden
    const navLinks = ['Kalibrierservice', 'Messgeräte', 'Über uns', 'Kontakt'];
    for (const link of navLinks) {
      await expect(page.locator(`nav >> text="${link}"`)).toBeVisible();
    }
  });

  test('Contact-Sidebar ist auf allen Seiten', async ({ page }) => {
    const pages = ['/', '/kalibrierservice', '/messgeraete-kalibrieren', '/ueber-uns', '/kontakt'];
    
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
    
    await expect(page.locator('text="Nordhorn"')).toBeVisible();
    await expect(page.locator('text="Losserstr. 4"')).toBeVisible();
  });

  test('Keine Markennamen (Fluke, Tektronix)', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const content = await page.content();
    
    // Sicherstellen, dass Markennamen NICHT vorkommen
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
    const pages = ['/kalibrierservice', '/messgeraete-kalibrieren', '/ueber-uns', '/kontakt'];
    
    for (const url of pages) {
      await page.goto(`http://localhost:3000${url}`);
      
      // Check für Premium-Gradient-Hero
      const hero = page.locator('section').first();
      const classes = await hero.getAttribute('class');
      
      // Sollte Gradient-Klassen haben
      expect(classes).toMatch(/gradient|bg-neutral/);
    }
  });

});

test.describe('Performance & Accessibility', () => {
  
  test('Keine Console-Errors auf Homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });

  test('Alle Links sind erreichbar', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const links = await page.locator('a[href^="/"]').all();
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (!href) continue;
      
      const response = await page.goto(`http://localhost:3000${href}`);
      expect(response?.status()).toBe(200);
    }
  });

});
