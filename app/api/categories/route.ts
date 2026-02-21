import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        category,
        COUNT(*) as device_count,
        MIN(price_euro) as min_price,
        MAX(price_euro) as max_price,
        AVG(price_euro) as avg_price
      FROM calibration_devices
      GROUP BY category
      ORDER BY device_count DESC
    `);

    const categories = result.rows.map(row => ({
      name: row.category,
      slug: row.category.toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
      deviceCount: parseInt(row.device_count),
      priceRange: {
        min: parseFloat(row.min_price),
        max: parseFloat(row.max_price),
        avg: parseFloat(row.avg_price)
      }
    }));

    return NextResponse.json({ categories });

  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'Kategorien konnten nicht geladen werden' },
      { status: 500 }
    );
  }
}
