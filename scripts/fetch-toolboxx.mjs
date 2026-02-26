/**
 * Fetch all items from toolboxx.biz API and save to data/toolboxx-items.json
 * Run: node scripts/fetch-toolboxx.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const OUTPUT_FILE = join(DATA_DIR, 'toolboxx-items.json');

const API_URL = 'https://api.toolboxx.biz/api/items';
const API_KEY = process.env.TOOLBOXX_API_KEY;
const BATCH_SIZE = 10; // parallel requests per batch

if (!API_KEY) {
  console.error('❌ TOOLBOXX_API_KEY environment variable is not set');
  console.log('⚠️  Skipping toolboxx data fetch. Using existing data if available.');
  process.exit(0);
}

async function fetchPage(page) {
  const res = await fetch(`${API_URL}?page=${page}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`API error page ${page}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function fetchAllItems() {
  console.log('🔄 Fetching toolboxx items...');

  // Get first page to know total pages
  const firstPage = await fetchPage(1);
  const totalPages = firstPage.meta.last_page;
  const totalItems = firstPage.meta.total;
  console.log(`📊 Found ${totalItems} items across ${totalPages} pages`);

  let allItems = [...firstPage.data];

  // Fetch remaining pages in batches
  for (let batch = 2; batch <= totalPages; batch += BATCH_SIZE) {
    const pages = [];
    for (let p = batch; p < batch + BATCH_SIZE && p <= totalPages; p++) {
      pages.push(p);
    }

    const results = await Promise.all(pages.map(fetchPage));
    for (const result of results) {
      allItems.push(...result.data);
    }

    const progress = Math.min(batch + BATCH_SIZE - 1, totalPages);
    console.log(`  📥 Pages ${batch}-${progress} of ${totalPages} (${allItems.length} items)`);
  }

  return allItems;
}

async function main() {
  try {
    const items = await fetchAllItems();

    // Slim down: only keep fields we need
    const slimItems = items.map((item) => ({
      id: item.id,
      articleNumber: item.article_number,
      name: item.name,
      description: item.description,
      priceNet: item.unit_net, // cents
      vat: item.vat,
      category: item.category?.name || null,
      manufacturer: item.manufacturer?.name || null,
    }));

    // Sort by name
    slimItems.sort((a, b) => a.name.localeCompare(b.name, 'de'));

    // Ensure data dir exists
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }

    const output = {
      fetchedAt: new Date().toISOString(),
      totalItems: slimItems.length,
      items: slimItems,
    };

    writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`✅ Saved ${slimItems.length} items to ${OUTPUT_FILE}`);
    console.log(`📁 File size: ${(JSON.stringify(output).length / 1024 / 1024).toFixed(1)} MB`);
  } catch (error) {
    console.error('❌ Error fetching toolboxx items:', error.message);
    process.exit(1);
  }
}

main();
