export function validateSymbol(symbol: string) {
  const allowed = (process.env.SYMBOLS || "")
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);

  return allowed.includes(symbol.toUpperCase());
}
