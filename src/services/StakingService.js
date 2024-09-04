
export const stakings = [
  { index: 'ethereum_staking', name: 'Ethereum', token: 'eth', apr: '0.002' },
  { index: 'solana_staking', name: 'Solana', token: 'sol', apr: '0.001' },
];

const intervals = {};

export function startStakingUpdates() {
  stakings.forEach(staking => {
    const stakedKey = `staked_${staking.token}`;
    const storedKey = `token_${staking.token}`;
    const lastUpdateKey = `last_update_${staking.token}`;

    const updateRewards = () => {
      const stakedAmount = parseFloat(localStorage.getItem(stakedKey)) || 0;
      const storedAmount = parseFloat(localStorage.getItem(storedKey)) || 0;
      const lastUpdateTime = parseFloat(localStorage.getItem(lastUpdateKey)) || Date.now();

      if (window.location.pathname === '/staking') {
        const stakingSound = new Audio(require('@/assets/sounds/staking.wav'));
        stakingSound.volume = 0.5;
        stakingSound.play();
      }
      const now = Date.now();
      const elapsedTime = (now - lastUpdateTime) / 1000; // Time in seconds
      const periods = Math.floor(elapsedTime / 10); // Number of 10-second intervals since last update

      if (periods > 0 && stakedAmount > 0) {
        const increment = stakedAmount * parseFloat(staking.apr) / 3600 * periods;
        const newStoredAmount = storedAmount + increment;

        localStorage.setItem(storedKey, newStoredAmount.toFixed(6));
        localStorage.setItem(lastUpdateKey, now);
      }
    };

    updateRewards(); // Initial update
    intervals[staking.token] = setInterval(updateRewards, 10000); // Update every 10 seconds
  });
}

export function stopStakingUpdates() {
  Object.keys(intervals).forEach(token => clearInterval(intervals[token]));
}