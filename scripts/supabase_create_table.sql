-- Tabelle für Kalibriergeräte erstellen
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

-- Indizes für Performance
CREATE INDEX IF NOT EXISTS idx_calibration_search 
    ON calibration_devices USING gin(to_tsvector('german', search_text));
    
CREATE INDEX IF NOT EXISTS idx_calibration_category 
    ON calibration_devices(category);
    
CREATE INDEX IF NOT EXISTS idx_calibration_price 
    ON calibration_devices(price_euro);

-- RLS (Row Level Security) deaktivieren für öffentlichen Lesezugriff
ALTER TABLE calibration_devices ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder darf lesen
CREATE POLICY "Allow public read access" 
    ON calibration_devices 
    FOR SELECT 
    USING (true);
