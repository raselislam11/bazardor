
import { parseNum } from "./bn";
 

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];
 
async function apiFetch(path) {
  let lastErr;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}
 
const first = (...vals) => vals.find((v) => v !== undefined && v !== null && v !== "");
const unwrap = (data, ...keys) =>
  Array.isArray(data) ? data : first(...keys.map((k) => data?.[k]), data?.data) || [];
 

const UNIT_BN = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
 

export function normalizeProduct(raw, i = 0) {
  const price = parseNum(first(raw.today, raw.price, 0));
 
  
  let pct = Math.abs(parseNum(first(raw.change?.pct, raw.change, 0)));
  const dir = raw.change?.dir;
  const change = dir === "down" ? -pct : dir === "up" ? pct : 0;
 
  const markets = (Array.isArray(raw.markets) ? raw.markets : []).map((m) => ({
    name: first(m.market, m.name, "বাজার"),
    division: first(m.division, ""),
    min: parseNum(m.min),
    max: parseNum(m.max),
  }));
 
  const mins = markets.map((m) => m.min).filter(Boolean);
  const maxs = markets.map((m) => m.max).filter(Boolean);
  const mids = markets.map((m) => (m.min + m.max) / 2).filter(Boolean);
 
  return {
    id: String(first(raw.id, i)),
    slug: String(first(raw.slug, raw.id, i)),
    name: first(raw.nameBn, raw.name, "পণ্য"),
    emoji: first(raw.image, raw.emoji, raw.categoryIcon, "🛒"),
    unit: UNIT_BN[raw.unit] || raw.unit || "প্রতি কেজি",
    description: first(raw.description, ""),
    categories: [first(raw.categoryNameBn, raw.category)].filter(Boolean),
    categorySlugs: [raw.category].filter(Boolean),
    price,
    change,
    yesterday: parseNum(raw.yesterday),
    lastWeek: parseNum(raw.lastWeek),
    lastMonth: parseNum(raw.lastMonth),
    markets,
    min: mins.length ? Math.min(...mins) : price,
    max: maxs.length ? Math.max(...maxs) : price,
    avg: mids.length ? Math.round(mids.reduce((a, b) => a + b, 0) / mids.length) : price,
  };
}
 
export function normalizeCategory(raw, i = 0) {
  if (typeof raw === "string") return { slug: raw, name: raw, icon: "🛒" };
  return {
    slug: String(first(raw.slug, raw.id, raw._id, i)),
    name: first(raw.name, raw.title, raw.nameBn, raw.slug, "ক্যাটাগরি"),
    icon: first(raw.emoji, raw.icon, "🛒"),
  };
}
 
export async function getProducts(category) {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await apiFetch(`/products${q}`);
  return unwrap(data, "products", "items", "results").map(normalizeProduct);
}
 
export async function getProduct(slug) {
  try {
    const data = await apiFetch(`/products/${encodeURIComponent(slug)}`);
    const raw = data?.product || data?.data || data;
    if (raw && (raw.name || raw.title)) return normalizeProduct(raw);
  } catch {}

  
  const all = await getProducts();
  return all.find((p) => p.slug === slug || p.id === slug) || null;
}
 
export async function getCategories() {
  const data = await apiFetch("/categories");
  return unwrap(data, "categories", "items", "results").map(normalizeCategory);
}
 
export async function getCategory(slug) {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) || null;
}
 









