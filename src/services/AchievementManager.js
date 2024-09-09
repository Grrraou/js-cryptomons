import { achievementsEnum } from "./AchievementEnum";
import ItemManager from "./ItemManager";
import StorageManager from "./StorageManager";
import UXManager from "./UXManager";

class AchievementManager {
    constructor() {
        this.assetPath = require.context('@/assets/achievements', false, /\.png$/);
        this.checkInterval = null;
        this.achievements = achievementsEnum;
    }

    getAchievements() {
        return this.achievements;
    }

    getAchievement(achievementIndex) {
        return this.getAchievement().find(achievement => { return achievement.index === achievementIndex })
    }

    startAchievementTracking() {
        const achievementSound = new Audio(require('@/assets/sounds/achievement.wav'));
        achievementSound.volume = 0.5;
        if (this.checkInterval) return; // Prevent multiple intervals
      
        this.checkInterval = setInterval(() => {
          this.getAchievements().forEach((achievement) => {
            const value = parseInt(localStorage.getItem(achievement.storageKey), 10) || 0;
            
            // Check if the value meets the target and if the achievement is not already unlocked
            if (value >= achievement.target && !localStorage.getItem(achievement.key)) {
                let successText = `${achievement.title} unlocked!`;
                achievementSound.play();
                if (achievement.loot) {
                    ItemManager.addToInventory(achievement.loot)
                }
              
                StorageManager.update(achievement.key, "true"); // Mark achievement as unlocked
                UXManager.showSuccess(successText);
            }
          });
        }, 1000); // Check every second
    }

    stopAchievementTracking() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }

}

export default new AchievementManager();