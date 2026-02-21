import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    const { data: devices, error, count } = await supabase
      .from('calibration_devices')
      .select('id, article_number, name, device_standard, device_type, price_euro, calibration_type', { count: 'exact' })
      .ilike('category', categoryName)
      .order('price_euro', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Statistiken berechnen (alle devices für die Kategorie)
    const { data: allDevices } = await supabase
      .from('calibration_devices')
      .select('price_euro')
      .ilike('category', categoryName);

    const prices = allDevices?.map(d => d.price_euro).sort((a, b) => a - b) || [];

    return NextResponse.json({
      category: categoryName,
      slug,
      devices: devices || [],
      stats: {
        total: count || 0,
        priceRange: {
          min: prices[0] || 0,
          max: prices[prices.length - 1] || 0,
          avg: prices.reduce((sum, p) => sum + p, 0) / prices.length || 0
        }
      },
      pagination: {
        limit,
        offset,
        hasMore: offset + limit < (count || 0)
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
