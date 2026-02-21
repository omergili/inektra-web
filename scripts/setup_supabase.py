#!/usr/bin/env python3
"""
Supabase Setup: Tabelle erstellen + Daten aus lokaler DB importieren
"""
import psycopg2
import sys

# Verbindungen
LOCAL_DB = {
    'dbname': 'lurch_db',
    'user': 'lurch_admin',
    'password': 'oF&4449',
    'host': 'localhost'
}

SUPABASE_DB = 'postgresql://postgres.vmiflictdsqbksndzhos:hse53hdoleZ@aws-0-eu-central-1.pooler.supabase.com:6543/postgres'

def main():
    print("🚀 SUPABASE SETUP")
    print("=" * 60)
    
    # 1. Supabase-Verbindung testen
    print("\n1️⃣ Verbinde zu Supabase...")
    try:
        supabase_conn = psycopg2.connect(SUPABASE_DB)
        supabase_cur = supabase_conn.cursor()
        print("✅ Supabase verbunden!")
    except Exception as e:
        print(f"❌ Fehler: {e}")
        sys.exit(1)
    
    # 2. Tabelle erstellen
    print("\n2️⃣ Erstelle Tabelle...")
    supabase_cur.execute("""
        CREATE TABLE IF NOT EXISTS calibration_devices (
            id SERIAL PRIMARY KEY,
            article_number VARCHAR(50),
            name TEXT NOT NULL,
            device_standard VARCHAR(255),
            device_type VARCHAR(255),
            price_euro DECIMAL(10,2) NOT NULL,
            calibration_type VARCHAR(50) DEFAULT 'ISO',
            category VARCHAR(100),
            search_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        -- Indizes
        DROP INDEX IF EXISTS idx_calibration_search;
        CREATE INDEX idx_calibration_search ON calibration_devices USING gin(to_tsvector('german', search_text));
        CREATE INDEX IF NOT EXISTS idx_calibration_category ON calibration_devices(category);
        CREATE INDEX IF NOT EXISTS idx_calibration_price ON calibration_devices(price_euro);
    """)
    supabase_conn.commit()
    print("✅ Tabelle erstellt!")
    
    # 3. Daten aus lokaler DB kopieren
    print("\n3️⃣ Kopiere Daten aus lokaler DB...")
    try:
        local_conn = psycopg2.connect(**LOCAL_DB)
        local_cur = local_conn.cursor()
        
        # Alte Daten löschen
        supabase_cur.execute("TRUNCATE TABLE calibration_devices RESTART IDENTITY;")
        
        # Daten laden
        local_cur.execute("""
            SELECT article_number, name, device_standard, device_type, 
                   price_euro, calibration_type, category, search_text
            FROM calibration_devices
        """)
        
        rows = local_cur.fetchall()
        print(f"📦 {len(rows)} Einträge gefunden")
        
        # Batch-Insert
        print("⏳ Importiere...")
        for i, row in enumerate(rows, 1):
            supabase_cur.execute("""
                INSERT INTO calibration_devices 
                (article_number, name, device_standard, device_type, price_euro, 
                 calibration_type, category, search_text)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, row)
            
            if i % 500 == 0:
                print(f"  ... {i}/{len(rows)}")
                supabase_conn.commit()
        
        supabase_conn.commit()
        print(f"✅ {len(rows)} Einträge importiert!")
        
        local_cur.close()
        local_conn.close()
        
    except Exception as e:
        print(f"❌ Fehler beim Daten-Import: {e}")
        sys.exit(1)
    
    # 4. Statistiken
    print("\n4️⃣ Statistiken:")
    supabase_cur.execute("SELECT COUNT(*) FROM calibration_devices")
    count = supabase_cur.fetchone()[0]
    print(f"  Gesamt: {count} Geräte")
    
    supabase_cur.execute("""
        SELECT category, COUNT(*) 
        FROM calibration_devices 
        GROUP BY category 
        ORDER BY COUNT(*) DESC 
        LIMIT 5
    """)
    print("\n  Top 5 Kategorien:")
    for cat, cnt in supabase_cur.fetchall():
        print(f"    {cat}: {cnt}")
    
    supabase_cur.close()
    supabase_conn.close()
    
    print("\n🎉 SETUP ABGESCHLOSSEN!")
    print("=" * 60)
    print("\nConnection String für Vercel:")
    print(SUPABASE_DB)

if __name__ == '__main__':
    main()
