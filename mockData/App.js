import { useState } from "react";
import { fetchStockData } from "./utils/fetchData"; // import your CSV fetch function

export default function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [adviceList, setAdviceList] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [qty, setQty] = useState(1);

  // Add stock to portfolio
  function addStock(e) {
    e.preventDefault();
    if (!symbol) return;
    setPortfolio([...portfolio, { symbol: symbol.toUpperCase(), qty: Number(qty) }]);
    setSymbol("");
    setQty(1);
  }

  // Analyze portfolio
  async function analyzePortfolio() {
    const symbols = portfolio.map((s) => s.symbol);
    const stockData = await fetchStockData(symbols);

    const advices = portfolio.map((s) => generateAdvice(s.symbol, stockData[s.symbol]));
    setAdviceList(advices);
  }

  // Simple advice engine
  function generateAdvice(symbol, data) {
    if (!data) return `${symbol}: No data available.`;

    const { price, sma30, sector } = data;
    if (price > sma30 * 1.1) {
      return `${symbol}: Price is high — consider reducing.`;
    } else if (price < sma30 * 0.9) {
      return `${symbol}: Price is low — consider adding more.`;
    } else {
      return `${symbol}: Hold.`;
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📈 Stock Consultant Agent</h1>

      {/* Portfolio Input Form */}
      <form onSubmit={addStock} className="flex gap-2 mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (TCS)"
          className="border p-2 rounded flex-1"
        />
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          min="1"
          className="border p-2 rounded w-20"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      {/* Portfolio List */}
      <ul className="mb-4">
        {portfolio.map((s, i) => (
          <li key={i}>
            {s.symbol} — {s.qty} shares
          </li>
        ))}
      </ul>

      {/* Analyze Portfolio Button */}
      <button
        onClick={analyzePortfolio}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Analyze Portfolio
      </button>

      {/* Advice List */}
      <div>
        {adviceList.map((a, i) => (
          <div key={i} className="p-4 bg-white rounded shadow mb-2">
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}
