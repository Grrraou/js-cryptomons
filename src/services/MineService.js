
export const mines = [
  { index: 'btc_mine', name: 'Bitcoin', token: 'btc', requirement: null },
  { index: 'nmc_mine', name: 'Namecoin', token: 'nmc', requirement: 'decentralize_dns' },
  { index: 'ltc_mine', name: 'Litecoin', token: 'ltc', requirement: 'gold_deserve_silver' },
  { index: 'doge_mine', name: 'Dogecoin', token: 'doge', requirement: 'play_million_doge_disco' },
  { index: 'dash_mine', name: 'Dash (Darkcoin)', token: 'dash', requirement: 'fork_bitcoin_plug_paypal' },
  { index: 'xmr_mine', name: 'Monero', token: 'xmr', requirement: 'work_for_lazarus_group' },
  { index: 'zec_mine', name: 'Zcash', token: 'zec', requirement: 'zero_knowledge_master' },
  
 /* { index: 'ore_mine', name: 'Ore', token: 'ore', requirement: null }, */
];

export const miningSounds = [
  new Audio(require('@/assets/sounds/mining.mp3')),
  new Audio(require('@/assets/sounds/mining2.wav')),
  new Audio(require('@/assets/sounds/mining3.wav')),
  new Audio(require('@/assets/sounds/mining4.wav')),
];