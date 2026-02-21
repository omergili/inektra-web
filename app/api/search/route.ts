import { NextRequest, NextResponse } from 'next/server';
import { query, CalibrationDevice } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!q && !category) {
      return NextResponse.json({ devices: [], total: 0 });
    }

    let sqlQuery = `
      SELECT 
        id, article_number, name, device_standard, device_type, 
        price_euro, calibration_type, category
      FROM calibration_devices
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 0;

    // Full-Text-Search
    if (q) {
      paramCount++;
      sqlQuery += ` AND (
        to_tsvector('german', search_text) @@ plainto_tsquery('german', $${paramCount})
        OR name ILIKE $${paramCount + 1}
        OR device_standard ILIKE $${paramCount + 1}
      )`;
      params.push(q, `%${q}%`);
      paramCount++;
    }

    // Kategorie-Filter
    if (category) {
      paramCount++;
      sqlQuery += ` AND category = $${paramCount}`;
      params.push(category);
    }

    // Relevanz-Sortierung bei Suche, sonst nach Preis
    if (q) {
      sqlQuery += ` ORDER BY ts_rank(to_tsvector('german', search_text), plainto_tsquery('german', $1)) DESC`;
    } else {
      sqlQuery += ` ORDER BY price_euro ASC`;
    }

    // Pagination
    sqlQuery += ` LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await query(sqlQuery, params);

    // Total count für Pagination
    let countQuery = `SELECT COUNT(*) FROM calibration_devices WHERE 1=1`;
    const countParams: any[] = [];
    let countParamCount = 0;

    if (q) {
      countParamCount++;
      countQuery += ` AND (
        to_tsvector('german', search_text) @@ plainto_tsquery('german', $${countParamCount})
        OR name ILIKE $${countParamCount + 1}
        OR device_standard ILIKE $${countParamCount + 1}
      )`;
      countParams.push(q, `%${q}%`);
      countParamCount++;
    }

    if (category) {
      countParamCount++;
      countQuery += ` AND category = $${countParamCount}`;
      countParams.push(category);
    }

    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    return NextResponse.json({
      devices: result.rows,
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Suche fehlgeschlagen' },
      { status: 500 }
    );
  }
}
