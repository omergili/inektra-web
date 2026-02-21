import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Slug zu Kategorie-Name konvertieren
    const categoryName = slug
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/ae/gi, 'ä')
      .replace(/oe/gi, 'ö')
      .replace(/ue/gi, 'ü');

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Geräte laden
    const devicesResult = await query(`
      SELECT 
        id, article_number, name, device_standard, device_type,
        price_euro, calibration_type
      FROM calibration_devices
      WHERE category ILIKE $1
      ORDER BY price_euro ASC
      LIMIT $2 OFFSET $3
    `, [categoryName, limit, offset]);

    // Statistiken
    const statsResult = await query(`
      SELECT 
        COUNT(*) as total,
        MIN(price_euro) as min_price,
        MAX(price_euro) as max_price,
        AVG(price_euro) as avg_price
      FROM calibration_devices
      WHERE category ILIKE $1
    `, [categoryName]);

    const stats = statsResult.rows[0];

    return NextResponse.json({
      category: categoryName,
      slug,
      devices: devicesResult.rows,
      stats: {
        total: parseInt(stats.total),
        priceRange: {
          min: parseFloat(stats.min_price),
          max: parseFloat(stats.max_price),
          avg: parseFloat(stats.avg_price)
        }
      },
      pagination: {
        limit,
        offset,
        hasMore: offset + limit < parseInt(stats.total)
      }
    });

  } catch (error) {
    console.error('Category API error:', error);
    return NextResponse.json(
      { error: 'Kategorie konnte nicht geladen werden' },
      { status: 500 }
    );
  }
}
