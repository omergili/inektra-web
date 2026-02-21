import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    let query = supabase
      .from('calibration_devices')
      .select('id, article_number, name, device_standard, device_type, price_euro, calibration_type, category', { count: 'exact' });

    // Kategorie-Filter
    if (category) {
      query = query.eq('category', category);
    }

    // Text-Suche
    if (q) {
      query = query.or(`search_text.ilike.%${q}%,name.ilike.%${q}%,device_standard.ilike.%${q}%`);
    }

    // Sort + Pagination
    query = query
      .order('price_euro', { ascending: true })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      devices: data || [],
      total: count || 0,
      limit,
      offset,
      hasMore: offset + limit < (count || 0)
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Suche fehlgeschlagen' },
      { status: 500 }
    );
  }
}
