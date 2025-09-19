export function generateAdvice(symbol, data) {
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
