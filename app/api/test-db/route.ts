import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Test connection
    const result = await query('SELECT COUNT(*) as count FROM calibration_devices');
    const count = result.rows[0].count;
    
    return NextResponse.json({
      success: true,
      count: parseInt(count),
      env: {
        hasDATABASE_URL: !!process.env.DATABASE_URL,
        hasDB_HOST: !!process.env.DB_HOST,
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      env: {
        hasDATABASE_URL: !!process.env.DATABASE_URL,
        hasDB_HOST: !!process.env.DB_HOST,
      }
    }, { status: 500 });
  }
}
