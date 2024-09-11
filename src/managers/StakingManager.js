import { stakingsEnum } from '@/enums/StakingEnum';
import StorageManager from '@/managers/StorageManager';
import TokenManager from '@/managers/TokenManager';

class StakingManager {
    constructor() {
        this.assetPath = require.context('@/assets/staking', false, /\.png$/);
        this.stakings = stakingsEnum;
        this.intervals = {};
    }

    getStakings() {
        return this.stakings;
    }

    getStakedAmmount(tokenIndex) {
        const stakedKey = `staked_${tokenIndex}`;
        return parseFloat(StorageManager.getFloat(stakedKey)) || 0;
    }

    startStakingUpdates() {
        this.getStakings().forEach(staking => {
            const updateRewards = () => {
                const stakedAmount = this.getStakedAmmount(staking.token)
        
                if (stakedAmount > 0) {
                    const increment = (stakedAmount * parseFloat(staking.apr)) / 360;
                    TokenManager.addToBalance(staking.token, increment);
                }
                if (window.location.pathname === '/staking') {
                    const stakingSound = new Audio(require('@/assets/sounds/staking.wav'));
                    stakingSound.volume = 0.2;
                    stakingSound.play();
                }
            };
      
            this.intervals[staking.token] = setInterval(updateRewards, 10000);
        });
    }

    stopStakingUpdates() {
        Object.keys(this.intervals).forEach(token => clearInterval(this.intervals[token]));
    }
}

export default new StakingManager();