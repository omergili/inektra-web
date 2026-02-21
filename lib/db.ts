import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    // Prefer DATABASE_URL (Supabase Pooler)
    if (process.env.DATABASE_URL) {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        },
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });
    } else {
      // Fallback to individual env vars
      pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'lurch_db',
        user: process.env.DB_USER || 'lurch_admin',
        password: process.env.DB_PASSWORD || 'oF&4449',
        ssl: process.env.DB_HOST?.includes('supabase') ? {
          rejectUnauthorized: false
        } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });
    }
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const pool = getPool();
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}

export interface CalibrationDevice {
  id: number;
  article_number: string;
  name: string;
  device_standard: string | null;
  device_type: string | null;
  price_euro: number;
  calibration_type: string;
  category: string;
  search_text: string;
  created_at: Date;
  updated_at: Date;
}
