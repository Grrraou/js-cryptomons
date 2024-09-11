import { stakingsEnum } from '@/enums/StakingEnum';
import StorageManager from '@/managers/StorageManager';
import TokenManager from '@/managers/TokenManager';
import AudioManager from '@/managers/AudioManager';
import GoalManager from '@/managers/GoalManager';
import UXManager from '@/managers/UXManager';

class StakingManager {
    constructor() {
        this.assetPath = require.context('@/assets/staking', false, /\.png$/);
        this.stakings = stakingsEnum;
        this.intervals = {};
        this.UIrefs = [];
    }

    getStakings() {
        return this.stakings;
    }

    getStaking(stakingIndex) {
        return this.getStakings().find(staking => staking.index === stakingIndex);
    }

    getAvailableStakings() {
        return this.getStakings().filter(staking => {
            if (staking.requirement) {
              return GoalManager.isGoalReached(staking.requirement);
            }
            return true;
        });
    }

    getStakedAmount(tokenIndex) {
        const stakedKey = `staked_${tokenIndex}`;
        return parseFloat(StorageManager.getFloat(stakedKey)) || 0;
    }

    stakeTokens(tokenIndex, amount) {
        if (amount > 0) {
          const currentStoredAmount = TokenManager.getBalance(tokenIndex);
  
          if (currentStoredAmount >= amount) {
            TokenManager.removeToBalance(tokenIndex, amount);
            let stakedAmount = this.getStakedAmount(tokenIndex);
            stakedAmount += amount;
            StorageManager.update(`staked_${tokenIndex}`, stakedAmount)
          } else {
            alert("Not enough tokens to stake");
          }
        }
      }

    getStakingRewards(stakingIndex) {
        const staking = this.getStaking(stakingIndex);
        const stakedAmount = this.getStakedAmount(staking.token);
        return stakedAmount * parseFloat(staking.apr) / 3600;
    }

    getBackgroundImage(stakingIndex) {
        try {
            return this.assetPath(`./${stakingIndex}.png`);
        } catch (error) {
            return this.assetPath('./default.png');
        }
    }

    startStakingUpdates() {
        this.getStakings().forEach(staking => {
            const updateRewards = () => {
                const stakedAmount = this.getStakedAmount(staking.token)
        
                if (stakedAmount > 0) {
                    const increment = (stakedAmount * parseFloat(staking.apr)) / 360;
                    TokenManager.addToBalance(staking.token, increment);
                    UXManager.showAreaLog(this.UIrefs[staking.token], increment, TokenManager.getTokenIcon(staking.token))
                }
                if (window.location.pathname === '/staking') {
                    AudioManager.play('staking.wav', 0.2);
                }
            };
      
            this.intervals[staking.token] = setInterval(updateRewards, 10000);
        });
    }
}

export default new StakingManager();