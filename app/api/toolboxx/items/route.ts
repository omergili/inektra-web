import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface ToolboxxItem {
  id: number;
  articleNumber: string;
  name: string;
  description: string;
  priceNet: number | null; // cents
  vat: number | null;
  category: string | null;
  manufacturer: string | null;
}

interface ToolboxxData {
  fetchedAt: string;
  totalItems: number;
  items: ToolboxxItem[];
}

let cachedData: ToolboxxData | null = null;

/** Prefixes to exclude from results (generic service entries, not device-specific) */
const EXCLUDED_PREFIXES = ['Werkskalibrierung', 'Akkreditierte Kalibrierung'];

function loadData(): ToolboxxData {
  if (cachedData) return cachedData;

  const filePath = join(process.cwd(), 'data', 'toolboxx-items.json');
  if (!existsSync(filePath)) {
    return { fetchedAt: '', totalItems: 0, items: [] };
  }

  const raw: ToolboxxData = JSON.parse(readFileSync(filePath, 'utf-8'));

  // Filter out generic calibration service entries
  raw.items = raw.items.filter(
    (item) => !EXCLUDED_PREFIXES.some((prefix) => item.name.startsWith(prefix))
  );
  raw.totalItems = raw.items.length;

  cachedData = raw;
  return cachedData;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  const data = loadData();
  let items = data.items;

  // Filter by search query
  if (query && query.length >= 2) {
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.articleNumber?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.manufacturer?.toLowerCase().includes(query)
    );
  }

  const total = items.length;
  const paginatedItems = items.slice(offset, offset + limit);

  return NextResponse.json({
    items: paginatedItems,
    total,
    limit,
    offset,
    hasMore: offset + limit < total,
    fetchedAt: data.fetchedAt,
  });
}
