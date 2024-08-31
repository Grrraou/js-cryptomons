
export const tokens = [
  { index: 'btc', name: 'Bitcoin', cryptodollar: 50 },
  { index: 'eth', name: 'Ethereum', cryptodollar: 14 },
  { index: 'sol', name: 'Solana', cryptodollar: 7 },
  { index: 'xmr', name: 'Monero', cryptodollar: 22 },
  { index: 'doge', name: 'Dogecoin', cryptodollar: 0.2 },
  { index: 'ore', name: 'Ore', cryptodollar: 10 },
];

export function initCryptodollarValues() {
  tokens.forEach((token) => {
    const key = `cryptodollar_value_${token.index}`;
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, token.cryptodollar);
    }
  });
}