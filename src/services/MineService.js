
export const mines = [
  { index: 'btc_mine', name: 'Bitcoin', token: 'btc', requirement: null },
  { index: 'nmc_mine', name: 'Namecoin', token: 'nmc', requirement: 'decentralize_dns' },
  /* { index: 'xmr_mine', name: 'Monero', token: 'xmr', requirement: null },
  { index: 'doge_mine', name: 'Dogecoin', token: 'doge', requirement: null },
  { index: 'ore_mine', name: 'Ore', token: 'ore', requirement: null }, */
];

export const miningSounds = [
  new Audio(require('@/assets/sounds/mining.mp3')),
  new Audio(require('@/assets/sounds/mining2.wav')),
  new Audio(require('@/assets/sounds/mining3.wav')),
  new Audio(require('@/assets/sounds/mining4.wav')),
];