import StorageManager from "@/managers/StorageManager";
import { minesEnum, miningSoundsEnum } from "@/enums/MineEnum";
import TokenManager from "@/managers/TokenManager";
import UXManager from "@/managers/UXManager";
import ItemManager from "@/managers/ItemManager";
import GoalManager from "@/managers/GoalManager";
import AudioManager from "@/managers/AudioManager";
import HeroManager from "@/managers/HeroManager";

class MineManager {
    constructor() {
        this.mines = minesEnum;
        this.miningSounds = miningSoundsEnum;
        this.assetPath = require.context('@/assets/mines', false, /\.png$/);
        this.autoClickerIntervals = {};
        this.UIrefs = [];
    }

    getDefaultMiningAmount(mineIndex) {
        return (Math.random() * (this.getUpgradeLevel(mineIndex) + 1) * (0.0009 - 0.000001) + 0.000001);
    }

    startAutoMining() {
        if (this.autoClickerIntervals) clearInterval(this.autoClickerIntervals);
    
        this.autoClickerIntervals = setInterval(() => {
          this.handleHeroMining();
        }, 1000);
    }

    handleHeroMining() {
        this.mines.forEach((mine) => {
            const assignedHeroes = HeroManager.getHeroesByArea(mine.index);

            assignedHeroes.forEach(hero => {
                HeroManager.gainXP(hero.index, null);

                let amount = HeroManager.getMiningPower(hero.index) * this.getDefaultMiningAmount(mine.index);
                this.mineTokens(mine.index, amount, null, HeroManager.UIrefs[hero.index]);
            });
        });
    }

    stopAutoClicker(mineIndex) {
        if (this.autoClickerIntervals[mineIndex]) {
          clearInterval(this.autoClickerIntervals[mineIndex]);
          delete this.autoClickerIntervals[mineIndex];
        }
    }

    getList() {
        return this.mines;
    }

    getFilteredList() {
        return this.mines.filter(mine => {
            if (mine.requirement) {
                return GoalManager.isGoalReached(mine.requirement);
            }
            return true;
          });
    }

    getItem(mineIndex) {
        return this.mines.find(mine => mine.index === mineIndex);
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
        
        if (this.canUpgrade(mineIndex)) {
            const mineLevelIndex = `level_area_${mineIndex}`;
            TokenManager.removeToBalance(mineItem.token, cost);
            let newLevel = parseInt(this.getUpgradeLevel(mineIndex) + 1, 10);
            StorageManager.update(mineLevelIndex, newLevel);
            console.log(ref)
            if (ref) {
                ref.level += 1;
            }
        }
    }

    mineTokens(mineIndex, amount = null, event = null, ref = null) {
        const mine = this.getItem(mineIndex);

        if (window.location.pathname === '/mines') {
            AudioManager.playRandom(this.miningSounds, 0.5);
        }
        
        const currentAmount = TokenManager.getBalance(mine.token);
        const tokenIcon = TokenManager.getTokenIcon(mine.token);
        
        // Use event coordinates if available
        console.log(event)
        if (event && event.clientX) {
            const x = event.clientX;
            const y = event.clientY;
            const manualMiningBuff = ItemManager.currentBuff.find(buff => buff.buffType === 'miningMultiplier' && Date.now() < buff.expiration);
            const manualMutliplier = manualMiningBuff?.multiplier || 1;
            amount = amount * manualMutliplier;

            UXManager.showFlyingText(amount.toFixed(6), tokenIcon, x, y);
            ref.clicks += 1;
            StorageManager.update(`clicks_area_${mineIndex}`, ref.clicks);
        } else {
            const rect = ref.$el.getBoundingClientRect();
            const x = rect.left;
            const y = rect.top;
            UXManager.showFlyingText(amount.toFixed(6), tokenIcon, x, y);
        }

        const newBalance = currentAmount + amount;
        TokenManager.addToBalance(mine.token, amount);
        if (ref) {
            ref.tokenBalance = newBalance;
        }
    }
}

export default new MineManager();