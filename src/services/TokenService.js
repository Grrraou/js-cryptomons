
export const tokens = [
  { index: 'cryptodollar', name: 'Crypto Dollar', cryptodollar: 1 },
  { index: 'btc', name: 'Bitcoin', cryptodollar: 10 },//2009
  { index: 'nmc', name: 'Namecoin', cryptodollar: 5 },//2011
  { index: 'ltc', name: 'Litecoin', cryptodollar: 5 },//2011
  { index: 'xrp', name: 'Ripple', cryptodollar: 1 },//2012
  { index: 'ppc', name: 'Peercoin', cryptodollar: 1 },//2012
  { index: 'doge', name: 'Dogecoin', cryptodollar: 0.2 },//2013
  { index: 'dash', name: 'Dash', cryptodollar: 2 },//2014
  { index: 'xmr', name: 'Monero', cryptodollar: 0.5 },//2014
  { index: 'eth', name: 'Ethereum', cryptodollar: 2 },//2015
  { index: 'zec', name: 'Zcash', cryptodollar: 2 },//2016
  { index: 'bch', name: 'Bitcoin Cash', cryptodollar: 0.2 },//2017
  { index: 'eos', name: 'EOS', cryptodollar: 0.2 },//2017
  { index: 'ada', name: 'Cardano', cryptodollar: 0.2 },//2017
  { index: 'trx', name: 'Tron', cryptodollar: 0.2 },//2017
  { index: 'bnb', name: 'Binance Coin', cryptodollar: 0.2 },//2017
  { index: 'link', name: 'Chainlink', cryptodollar: 0.2 },//2017
  { index: 'xtz', name: 'Tezos', cryptodollar: 0.2 },//2018
  { index: 'dot', name: 'Polkadot', cryptodollar: 0.2 },//2020
  { index: 'sol', name: 'Solana', cryptodollar: 1 },//2020
  { index: 'shib', name: 'Shiba Inu', cryptodollar: 0.1 },//2020
  { index: 'uni', name: 'Uniswap', cryptodollar: 0.1 },//2020
  
  
  //{ index: 'ore', name: 'Ore', cryptodollar: 0.1 },
];

export function initCryptodollarValues() {
  tokens.forEach((token) => {
    const key = `cryptodollar_value_${token.index}`;
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, token.cryptodollar);
    }
  });
}