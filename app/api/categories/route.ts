import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get all devices to calculate stats client-side
    const { data: devices, error } = await supabase
      .from('calibration_devices')
      .select('category, price_euro');

    if (error) throw error;

    // Calculate stats per category
    const categoryMap = new Map<string, { count: number; prices: number[] }>();
    
    devices?.forEach((device: any) => {
      const cat = device.category || 'Sonstige';
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, { count: 0, prices: [] });
      }
      const stats = categoryMap.get(cat)!;
      stats.count++;
      stats.prices.push(device.price_euro);
    });

    const categories = Array.from(categoryMap.entries())
      .map(([name, stats]) => {
        const prices = stats.prices.sort((a, b) => a - b);
        return {
          name,
          slug: name.toLowerCase()
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
          deviceCount: stats.count,
          priceRange: {
            min: prices[0] || 0,
            max: prices[prices.length - 1] || 0,
            avg: prices.reduce((sum, p) => sum + p, 0) / prices.length || 0
          }
        };
      })
      .sort((a, b) => b.deviceCount - a.deviceCount);

    return NextResponse.json({ categories });

  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'Kategorien konnten nicht geladen werden' },
      { status: 500 }
    );
  }
}
