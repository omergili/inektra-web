#!/usr/bin/env python3
"""
Preisliste in PostgreSQL importieren mit automatischer Kategorisierung
"""
import pandas as pd
import psycopg2
import re

# Kategorie-Mapping basierend auf Keywords
CATEGORY_KEYWORDS = {
    'Elektrische Messtechnik': [
        'multimeter', 'oszilloskop', 'stromzange', 'widerstand', 'kapazität',
        'spannung', 'strom', 'frequenz', 'generator', 'netzgerät', 'netzteil',
        'isolationstester', 'erdungstester', 'gerätetester', 'prüfgerät',
        'ohmmeter', 'voltmeter', 'amperemeter', 'digitalmultimeter', 'dmm'
    ],
    'Temperaturmesstechnik': [
        'temperatur', 'thermometer', 'fühler', 'pt100', 'pt1000',
        'thermoelement', 'infrarot', 'wärme', 'kälte', 'pyrometer'
    ],
    'Dimensionsmesstechnik': [
        'messschieber', 'bügelmess', 'schraube', 'lehre', 'maßstab',
        'endmaß', 'messuhr', 'höhenmess', 'koordinaten', 'länge',
        'dickenmess', 'innenmess', 'tiefenmess', 'radius', 'durchmesser',
        'düsen', 'gewinde', 'kugel', 'referenzstück', 'einstellmaß'
    ],
    'Druckmesstechnik': [
        'druck', 'manometer', 'barometer', 'vakuum', 'druckwandler',
        'drucksensor', 'druckprüf', 'druckmess'
    ],
    'Waagen & Kraftmesstechnik': [
        'waage', 'gewicht', 'masse', 'kraft', 'prüfgewicht',
        'wägezelle', 'federkraft', 'drehmoment', 'dynamometer'
    ],
    'Zeit & Frequenz': [
        'zeit', 'frequenz', 'oszillator', 'takt', 'timer',
        'stoppuhr', 'synchron', 'zeitbasis'
    ],
    'Optik & Lichtmesstechnik': [
        'licht', 'lux', 'beleuchtung', 'photometer', 'spektral',
        'optisch', 'laser', 'led', 'lumineszenz'
    ],
    'Feuchtemesstechnik': [
        'feuchte', 'hygro', 'taupunkt', 'luftfeuchte', 'humidity'
    ],
    'Chemie & Analytik': [
        'ph', 'leitfähigkeit', 'konzentration', 'chlor', 'pipette',
        'bürette', 'titration', 'lösemittel', 'chemie'
    ],
    'Akustik': [
        'schall', 'lärm', 'dezibel', 'akustik', 'schallpegel',
        'mikrofon', 'kalibrator'
    ]
}

def categorize_device(name, device_std, device_type):
    """Kategorisiert Gerät basierend auf Bezeichnung"""
    text = f"{name} {device_std or ''} {device_type or ''}".lower()
    
    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text:
                return category
    
    return 'Sonstige Messtechnik'

def create_search_text(name, device_std, device_type):
    """Erstellt Suchtext für Full-Text-Search"""
    parts = [name]
    if device_std and pd.notna(device_std):
        parts.append(str(device_std))
    if device_type and pd.notna(device_type):
        parts.append(str(device_type))
    return ' '.join(parts)

def main():
    print("📦 PREISLISTE IMPORT")
    print("=" * 60)
    
    # Excel laden
    df = pd.read_excel('../preisliste.xlsx')
    print(f"✅ Excel geladen: {len(df)} Einträge")
    
    # Erste Zeile entfernen (Header-Zeile mit "---")
    df = df[df['Artikel-Nr.'] != 0]
    print(f"✅ Bereinigt: {len(df)} Einträge")
    
    # Datenbank-Verbindung
    conn = psycopg2.connect(
        dbname="lurch_db",
        user="lurch_admin",
        password="oF&4449",
        host="localhost"
    )
    cur = conn.cursor()
    
    # Tabelle leeren
    cur.execute("TRUNCATE TABLE calibration_devices RESTART IDENTITY;")
    print("✅ Tabelle geleert")
    
    # Import mit Kategorisierung
    imported = 0
    category_stats = {}
    
    for _, row in df.iterrows():
        name = row['Bezeichung']
        device_std = row['Gerät'] if pd.notna(row['Gerät']) else None
        device_type = row['Typ'] if pd.notna(row['Typ']) else None
        # Deutsches Format: Komma → Punkt
        price_str = str(row['Preis']).replace(',', '.')
        price = float(price_str)
        
        # Kategorisierung
        category = categorize_device(name, device_std, device_type)
        category_stats[category] = category_stats.get(category, 0) + 1
        
        # Suchtext
        search_text = create_search_text(name, device_std, device_type)
        
        # Insert
        cur.execute("""
            INSERT INTO calibration_devices 
            (article_number, name, device_standard, device_type, price_euro, 
             calibration_type, category, search_text)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            str(row['Artikel-Nr.']),
            name,
            device_std,
            device_type,
            price,
            row['Art'],
            category,
            search_text
        ))
        imported += 1
    
    conn.commit()
    print(f"\n✅ {imported} Geräte importiert!")
    
    print("\n📊 KATEGORIEN:")
    for cat, count in sorted(category_stats.items(), key=lambda x: x[1], reverse=True):
        print(f"  {cat}: {count} Geräte")
    
    # Statistiken
    cur.execute("SELECT MIN(price_euro), MAX(price_euro), AVG(price_euro) FROM calibration_devices")
    min_p, max_p, avg_p = cur.fetchone()
    print(f"\n💰 PREISE:")
    print(f"  Min: {min_p:.2f} €")
    print(f"  Max: {max_p:.2f} €")
    print(f"  Durchschnitt: {avg_p:.2f} €")
    
    cur.close()
    conn.close()
    
    print("\n🎉 IMPORT ABGESCHLOSSEN!")

if __name__ == '__main__':
    main()
