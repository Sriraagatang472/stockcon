export async function fetchStockData(symbols) {
  // Pathway mock CSV (can also be a REST endpoint returning CSV/JSON)
  const res = await fetch("/stocks.csv");
  const text = await res.text();

  // Parse CSV
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  const map = {};

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    const row = {};
    headers.forEach((h, j) => (row[h] = cols[j]));
    const sym = row.symbol.toUpperCase();
    if (symbols.includes(sym)) {
      map[sym] = {
        price: Number(row.price),
        sma30: Number(row.sma30),
        sector: row.sector,
      };
    }
  }
  return map;
}

