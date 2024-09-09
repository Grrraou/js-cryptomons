import StorageManager from "./StorageManager";
import { mines } from "./MineService";
import TokenManager from "./TokenManager";
import { miningSounds } from "./MineService";
import { currentBuff } from "./ItemService";
import UXManager from "./UXManager";

class MineManager {
    constructor() {
        this.assetPath = require.context('@/assets/mines', false, /\.png$/);
    }

    getList() {
        return mines;
    }

    getFilteredList() {
        return mines.filter(mine => {
            // Check if the mine has a requirement
            if (mine.requirement) {
              // Check if the required goal is unlocked in localStorage
              return StorageManager.get(`goal_${mine.requirement}_unlocked`) === 'true';
            }
            // If no requirement, always show the area
            return true;
          });
    }

    getItem(mineIndex) {
        return mines.find(mine => mine.index === mineIndex);
    }

    getMineLogo(mineIndex) {
        try {
            return this.assetPath(`./${mineIndex}.png`);
        } catch (error) {
            // If the image doesn't exist, fall back to the default image
            return this.assetPath('./default.png');
        }
    }

    getBackgroundImage(mineIndex) {
        try {
            return this.assetPath(`./${mineIndex}_bg.png`);
        } catch (error) {
            // If the image doesn't exist, fall back to the default image
            return this.assetPath('./default_bg.png');
        }
    }

    getUpgradeCost(mineIndex) {
        const level = this.getUpgradeLevel(mineIndex);
        return parseFloat(level * (1.2 * level)).toFixed(2);
    }

    getClicks(mineIndex) {
        return StorageManager.getInt(`clicks_area_${mineIndex}`, 0);
    }

    canUpgrade(mineIndex) {
        const mineItem = this.getItem(mineIndex);
        const balance = TokenManager.getBalance(mineItem.token);
        return balance >= this.getUpgradeCost(this.areaIndex);
    }

    getUpgradeLevel(mineIndex) {
        return StorageManager.getInt(`level_area_${mineIndex}`, 1);
    }

    upgrade(mineIndex, ref = null) {
        const mineItem = this.getItem(mineIndex);
        const cost = this.getUpgradeCost(this.areaIndex);
        console.log(mineIndex);

        if (this.canUpgrade(mineIndex)) {
            const mineLevelIndex = `level_area_${mineIndex}`;
            TokenManager.removeToBalance(mineItem.token, cost);
            let newLevel = parseInt(this.getUpgradeLevel(mineIndex) + 1, 10);
            StorageManager.update(mineLevelIndex, newLevel);
            if (ref) {
                ref.level += 1;
            }
        }
    }

    mineTokens(event, mineIndex, ref) {
        const mine = this.getItem(mineIndex);

        if (window.location.pathname === '/mines') {
          const randomIndex = Math.floor(Math.random() * miningSounds.length); // Use miningSounds.length here
          const miningSound = miningSounds[randomIndex]; // Access the sound from the imported miningSounds array
          miningSound.volume = 0.5;
          miningSound.play();
        }

        let tokenIndex = `token_${mine.token}`;
        let currentAmount = parseFloat(localStorage.getItem(tokenIndex)) || 0;
        let minedAmount = (Math.random() * (this.getUpgradeLevel(mine.index) + 1) * (0.0009 - 0.000001) + 0.000001);
        

        
        const tokenIcon = TokenManager.getTokenIcon(mine.token);
        
        // Use event coordinates if available
        if (event && event.clientX) {
            const x = event.clientX;
            const y = event.clientY;
            const manualMiningBuff = currentBuff.find(buff => buff.buffType === 'miningMultiplier' && Date.now() < buff.expiration);
            const manualMutliplier = manualMiningBuff?.multiplier || 1;
            minedAmount = minedAmount * manualMutliplier;

            UXManager.showFlyingText(minedAmount.toFixed(6), tokenIcon, x, y);
            ref.clicks += 1;
        } else {
            // @todo amount should be updated via heros count
            UXManager.showAreaLog(ref, minedAmount.toFixed(6), tokenIcon);
        }

        const newBalance = currentAmount + minedAmount;
        TokenManager.addToBalance(mine.token, minedAmount);

        ref.tokenBalance = newBalance;
        //if (this.$route.name === 'Mines' && x && y)
          //this.showFlyingText(minedAmount.toFixed(6), x, y);
      }
}

export default new MineManager();