// services/BattleService.js
export function getBattleData() {
    return [
        { id: 1, name: 'Kraken\'s Abyss', description: 'A deep and treacherous battlefield where the strongest survive.' },
        { id: 2, name: 'Binance Barricade', description: 'A fortified position with endless waves of enemies.' },
        { id: 3, name: 'Uniswap Underground', description: 'A labyrinthine network of tunnels filled with hidden dangers.' },
        { id: 4, name: 'Gemini Gorge', description: 'A narrow pass where only the cleverest can outmaneuver their foes.' },
        { id: 5, name: 'Bybit Blitz', description: 'A fast-paced battleground where speed and agility are key.' },
        { id: 6, name: 'SushiSwap Slaughterhouse', description: 'A chaotic arena where every move could be your last.' },
        { id: 7, name: 'KuCoin Citadel', description: 'A heavily defended fortress with layers of traps and defenses.' },
        { id: 8, name: 'PancakeSwap Plains', description: 'An open battlefield where strategy and positioning are vital.' },
        { id: 9, name: 'Coinbase Clash', description: 'A massive confrontation where the strongest armies collide.' },
        { id: 10, name: 'Huobi Highlands', description: 'A high-altitude battlefield where control of the heights is crucial.' },
        { id: 11, name: 'Chainlink Crater', description: 'A desolate crater where the toughest warriors fight for dominance.' },
        { id: 12, name: 'Aave Arena', description: 'An arena where only the boldest can claim victory.' },
        { id: 13, name: 'Curve Conquest', description: 'A battlefield of shifting terrain that challenges even the best.' },
        { id: 14, name: 'Synthetix Stronghold', description: 'A stronghold where only the most powerful can hold their ground.' },
        { id: 15, name: 'MakerDAO Maze', description: 'A confusing maze where only those with a sharp mind can escape.' },
        { id: 16, name: 'Balancer Battleground', description: 'A balanced battlefield where every move counts.' },
        { id: 17, name: 'Arbitrum Ambush', description: 'A place of sudden attacks and fierce skirmishes.' },
        { id: 18, name: 'Optimism Outpost', description: 'An outpost where hope and strategy combine to win the day.' },
        { id: 19, name: 'Yearn Yard', description: 'A yard filled with traps and surprises where the clever prevail.' },
        { id: 20, name: 'Gnosis Gorge', description: 'A narrow gorge where knowledge and cunning are the keys to victory.' }
    ];
  }
  
export const monsters = [
    { index: 'fisc_gobelin', name: 'Fisc Goblin', description: 'He want your money', power: 1 },
    { index: 'scammer_troll', name: 'Scammer Troll', description: 'Don\'t trust everyone', power: 2 },
    { index: 'pump_and_dump_dragon', name: 'Pump-and-Dump Dragon', description: 'Master of market manipulation', power: 3 },
    { index: 'rug_puller_wraith', name: 'Rug-Puller Wraith', description: 'Vanishing with your investments', power: 4 },
    { index: 'ponzi_kraken', name: 'Ponzi Kraken', description: 'Feeding off the naive', power: 5 },
    { index: 'gas_fee_gremlin', name: 'Gas Fee Gremlin', description: 'Eats up your transactions', power: 2 },
    { index: 'fomo_phantom', name: 'FOMO Phantom', description: 'Drives fear of missing out', power: 3 },
    { index: 'shill_serpent', name: 'Shill Serpent', description: 'Tempts you with empty promises', power: 4 },
    { index: 'whale_manipulator', name: 'Whale Manipulator', description: 'Shakes the market at will', power: 5 },
    { index: 'dusting_demon', name: 'Dusting Demon', description: 'Leaves traces to track you', power: 2 },
    { index: 'defi_doppelganger', name: 'DeFi Doppelganger', description: 'A fake in the decentralized space', power: 4 },
    { index: 'crypto_clown', name: 'Crypto Clown', description: 'Turns serious investments into a joke', power: 1 },
    { index: 'hodl_hobgoblin', name: 'HODL Hobgoblin', description: 'Tells you to hold, no matter what', power: 2 },
    { index: 'airdrop_angel', name: 'Airdrop Angel', description: 'Gives you free tokens, but at what cost?', power: 3 },
    { index: 'fork_fiend', name: 'Fork Fiend', description: 'Splits chains and confuses investors', power: 4 },
    { index: 'mempool_mimic', name: 'Mempool Mimic', description: 'Hides in pending transactions', power: 2 },
    { index: 'exchange_imp', name: 'Exchange Imp', description: 'Plays tricks with your trading pairs', power: 3 },
    { index: 'blockchain_banshee', name: 'Blockchain Banshee', description: 'Screams of lost keys and frozen assets', power: 4 },
    { index: 'node_nightmare', name: 'Node Nightmare', description: 'Disrupts consensus and causes chaos', power: 5 },
    { index: 'paper_wallet_poltergeist', name: 'Paper Wallet Poltergeist', description: 'Haunts forgotten backups', power: 3 },
    { index: 'dust_attack_djinn', name: 'Dust Attack Djinn', description: 'Curses you with tiny, malicious transactions', power: 2 },
    { index: 'oracle_ogre', name: 'Oracle Ogre', description: 'Feeds false data to smart contracts', power: 4 },
    { index: 'miner_minotaur', name: 'Miner Minotaur', description: 'Labors endlessly for rewards, but at great cost', power: 3 },
    { index: 'token_troll', name: 'Token Troll', description: 'Lurks in obscure coins, waiting to trap victims', power: 2 },
    { index: 'satoshi_specter', name: 'Satoshi Specter', description: 'The elusive creator, a ghostly presence', power: 5 },
    { index: 'wallet_wraith', name: 'Wallet Wraith', description: 'Drains your funds without a trace', power: 4 },
    { index: 'altcoin_abomination', name: 'Altcoin Abomination', description: 'A twisted creation, volatile and unpredictable', power: 3 },
    { index: 'faucet_fairy', name: 'Faucet Fairy', description: 'Grants tiny amounts of crypto, but it adds up', power: 2 },
    { index: 'cold_storage_cyclops', name: 'Cold Storage Cyclops', description: 'Guards your crypto, but is hard to reach', power: 4 },
    { index: 'lightning_lich', name: 'Lightning Lich', description: 'Moves funds swiftly, but with hidden dangers', power: 3 },
    { index: 'whitelist_wizard', name: 'Whitelist Wizard', description: 'Controls access to exclusive sales', power: 3 },
    { index: 'transaction_terror', name: 'Transaction Terror', description: 'Delays confirmations, causing panic', power: 2 },
    { index: 'hashrate_hydra', name: 'Hashrate Hydra', description: 'Multiplies its power with every new head', power: 5 },
    { index: 'staking_specter', name: 'Staking Specter', description: 'Holds your assets in a ghostly grip', power: 4 },
    { index: 'fee_fiend', name: 'Fee Fiend', description: 'Feeds on high transaction fees', power: 2 },
    { index: 'blockchain_bogeyman', name: 'Blockchain Bogeyman', description: 'Lurks in every transaction, waiting to strike', power: 3 },
    { index: 'ledger_leviathan', name: 'Ledger Leviathan', description: 'Records every move with an unbreakable grip', power: 5 },
    { index: 'ico_incubus', name: 'ICO Incubus', description: 'Seduces with promises of riches, often unfulfilled', power: 4 },
    { index: 'dapp_doppelganger', name: 'DApp Doppelganger', description: 'Mimics trusted apps to deceive', power: 3 },
    { index: 'bit_basilisk', name: 'Bit Basilisk', description: 'Its gaze turns traders to stone', power: 4 },
    { index: 'altcoin_ogre', name: 'Altcoin Ogre', description: 'Lumbers through the market, causing chaos', power: 3 },
    { index: 'proof_of_work_wyvern', name: 'Proof-of-Work Wyvern', description: 'Demands immense energy for its hoard', power: 5 },
];


export function generateCreature() {
    const randomIndex = Math.floor(Math.random() * monsters.length);
    const selectedMonster = monsters[randomIndex];
  
    let portrait;
    try {
      // Attempt to load the specific monster image
      portrait = require(`@/assets/monsters/${selectedMonster.index}.png`);
    } catch (e) {
      // Fallback to the default image if the specific image doesn't exist
      portrait = require('@/assets/monsters/default.png');
    }
  
    return {
      ...selectedMonster,
      health: selectedMonster.power * 100, // Example health calculation based on power
      portrait: portrait,
    };
  }
  