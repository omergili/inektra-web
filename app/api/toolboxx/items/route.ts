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
let cachedManufacturers: { name: string; count: number }[] | null = null;

function loadData(): ToolboxxData {
  if (cachedData) return cachedData;

  const filePath = join(process.cwd(), 'data', 'toolboxx-items.json');
  if (!existsSync(filePath)) {
    return { fetchedAt: '', totalItems: 0, items: [] };
  }

  cachedData = JSON.parse(readFileSync(filePath, 'utf-8'));
  return cachedData!;
}

/**
 * Extract manufacturer name from the product name.
 * Most toolboxx items start with the manufacturer name followed by the model.
 * E.g. "Fluke 115 Digitalmultimeter" → "Fluke"
 * Special case: "Chauvin Arnoux" is two words.
 */
function extractManufacturer(name: string): string {
  if (!name) return 'Sonstige';

  // Handle known two-word manufacturers
  const twoWordPrefixes = ['Chauvin Arnoux', 'Gossen Metrawatt', 'Rohde & Schwarz', 'H&B'];
  for (const prefix of twoWordPrefixes) {
    if (name.startsWith(prefix)) return prefix;
  }

  // Strip leading "--- " (some items have this prefix)
  const cleaned = name.replace(/^-+\s*/, '');

  // First word = manufacturer
  const firstWord = cleaned.split(/\s+/)[0];
  return firstWord || 'Sonstige';
}

function getManufacturers(items: ToolboxxItem[]): { name: string; count: number }[] {
  if (cachedManufacturers) return cachedManufacturers;

  const map = new Map<string, number>();
  for (const item of items) {
    const mfr = extractManufacturer(item.name);
    map.set(mfr, (map.get(mfr) || 0) + 1);
  }

  // Only include manufacturers with ≥10 items, sorted by count descending
  cachedManufacturers = Array.from(map.entries())
    .filter(([, count]) => count >= 10)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return cachedManufacturers;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const data = loadData();

  // Return manufacturers list
  if (searchParams.get('manufacturers') === 'true') {
    const manufacturers = getManufacturers(data.items);
    return NextResponse.json({ manufacturers });
  }

  const query = searchParams.get('q')?.toLowerCase() || '';
  const manufacturer = searchParams.get('manufacturer') || '';
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  let items = data.items;

  // Filter by manufacturer (extracted from name)
  if (manufacturer) {
    items = items.filter((item) => {
      const mfr = extractManufacturer(item.name);
      return mfr === manufacturer;
    });
  }

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
