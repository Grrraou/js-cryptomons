
export const tokens = [
  { index: 'cryptodollar', name: 'Crypto Dollar', cryptodollar: 1 },
  { index: 'btc', name: 'Bitcoin', cryptodollar: 10 },
  { index: 'nmc', name: 'Namecoin', cryptodollar: 5 },
  { index: 'ltc', name: 'Litecoin', cryptodollar: 5 },
  { index: 'xrp', name: 'Ripple', cryptodollar: 1 },
  { index: 'eth', name: 'Ethereum', cryptodollar: 2 },
 /*  { index: 'sol', name: 'Solana', cryptodollar: 1 },
  { index: 'xmr', name: 'Monero', cryptodollar: 0.5 },
  { index: 'doge', name: 'Dogecoin', cryptodollar: 0.2 },
  { index: 'ore', name: 'Ore', cryptodollar: 0.1 }, */
];

export function initCryptodollarValues() {
  tokens.forEach((token) => {
    const key = `cryptodollar_value_${token.index}`;
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, token.cryptodollar);
    }
  });
}