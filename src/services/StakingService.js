export const stakings = [
  { index: 'ethereum_staking', name: 'Ethereum', token: 'eth', apr: '0.002' },
  { index: 'solana_staking', name: 'Solana', token: 'sol', apr: '0.001' },
];

const intervals = {};

// This function will run in the background and update rewards continuously
export function startStakingUpdates() {
  stakings.forEach(staking => {
    const stakedKey = `staked_${staking.token}`;
    const storedKey = `token_${staking.token}`;

    const updateRewards = () => {
      const stakedAmount = parseFloat(localStorage.getItem(stakedKey)) || 0;
      const storedAmount = parseFloat(localStorage.getItem(storedKey)) || 0;

      // If there's something staked, apply the APR every 10 seconds
      if (stakedAmount > 0) {
        const increment = (stakedAmount * parseFloat(staking.apr)) / 360; // 1/360th of APR per 10 seconds
        const newStoredAmount = storedAmount + increment;

        localStorage.setItem(storedKey, newStoredAmount.toFixed(6));
      }

      // Optionally, play sound if the user is on the staking page
      if (window.location.pathname === '/staking') {
        const stakingSound = new Audio(require('@/assets/sounds/staking.wav'));
        stakingSound.volume = 0.2;
        stakingSound.play();
      }
    };

    // Start updating rewards every 10 seconds
    intervals[staking.token] = setInterval(updateRewards, 10000);
  });
}

// Stop staking updates when needed
export function stopStakingUpdates() {
  Object.keys(intervals).forEach(token => clearInterval(intervals[token]));
}
