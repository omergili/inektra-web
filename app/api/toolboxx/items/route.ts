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

/** Prefixes to exclude from results (generic service entries, not device-specific) */
const EXCLUDED_PREFIXES = ['Werkskalibrierung', 'Akkreditierte Kalibrierung'];

/**
 * Category definitions: each category has a display name and keywords to match
 * against the product name (case-insensitive). Order matters — first match wins.
 */
const CATEGORIES: { name: string; keywords: string[] }[] = [
  { name: 'Multimeter', keywords: ['multimeter', 'handmultimeter'] },
  { name: 'Oszilloskope', keywords: ['oszilloskop', 'scopemeter', 'oscilloscope'] },
  { name: 'Prüf- & Testgeräte', keywords: ['tester', 'prüfgerät', 'vde', 'dguv', 'gerätetester', 'installationstester'] },
  { name: 'Stromzangen', keywords: ['stromzange', 'zangenamperemeter', 'current clamp', 'current probe'] },
  { name: 'Zähler & Frequenz', keywords: ['frequenzzähler', 'zähler', 'counter'] },
  { name: 'Längenmesstechnik', keywords: ['messschieber', 'bügelmessschraube', 'messuhr', 'endmaß'] },
  { name: 'Temperaturmessung', keywords: ['thermometer', 'temperatur', 'pyrometer'] },
  { name: 'Isolations- & Erdung', keywords: ['isolationsmess', 'erdungsmess', 'isolation'] },
  { name: 'Spannungs- & Strommessung', keywords: ['voltmeter', 'amperemeter', 'spannungsprüf'] },
  { name: 'Netzgeräte', keywords: ['netzgerät', 'power supply', 'netzteil'] },
  { name: 'Manometer & Druck', keywords: ['manometer', 'druckmess', 'pressure'] },
  { name: 'Waagen', keywords: ['waage', 'balance'] },
  { name: 'Drehmoment', keywords: ['drehmoment', 'torque'] },
  { name: 'Kalibratoren', keywords: ['kalibrator', 'calibrator', 'calibration'] },
  { name: 'Dekaden & Widerstände', keywords: ['dekade', 'widerstand', 'decade', 'resistor'] },
  { name: 'Messgeräte & Analysatoren', keywords: ['messgerät', 'analysator', 'netzanalys', 'leistungsmess', 'signalgenerator', 'funktionsgenerator', 'messbrücke', 'simulator'] },
];

let cachedData: ToolboxxData | null = null;
let cachedCategories: { name: string; count: number }[] | null = null;

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

function getItemCategory(name: string): string | null {
  const lower = name.toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.keywords.some((kw) => lower.includes(kw))) {
      return cat.name;
    }
  }
  return null;
}

function getCategories(items: ToolboxxItem[]): { name: string; count: number }[] {
  if (cachedCategories) return cachedCategories;

  const map = new Map<string, number>();
  for (const item of items) {
    const cat = getItemCategory(item.name);
    if (cat) {
      map.set(cat, (map.get(cat) || 0) + 1);
    }
  }

  cachedCategories = Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return cachedCategories;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const data = loadData();

  // Return categories list
  if (searchParams.get('categories') === 'true') {
    const categories = getCategories(data.items);
    return NextResponse.json({ categories });
  }

  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  let items = data.items;

  // Filter by category
  if (category) {
    items = items.filter((item) => getItemCategory(item.name) === category);
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
