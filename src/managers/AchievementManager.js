import { achievementsEnum } from "@/enums/AchievementEnum";
import ItemManager from "@/managers/ItemManager";
import StorageManager from "@/managers/StorageManager";
import UXManager from "@/managers/UXManager";

class AchievementManager {
    constructor() {
        this.assetPath = require.context('@/assets/achievements', false, /\.png$/);
        this.checkInterval = null;
        this.achievements = achievementsEnum;
        this.achievementSound = new Audio(require('@/assets/sounds/achievement.wav'));
        this.achievementSound.volume = 0.5;
    }

    getAchievements() {
        return this.achievements;
    }

    getAchievement(achievementIndex) {
        return this.getAchievements().find(achievement => { return achievement.index === achievementIndex; })
    }

    getAchievementState(achievementIndex) {
        const achievement = this.getAchievement(achievementIndex);
        return StorageManager.get(achievement.storageKey);
    }

    isAchievementReached(achievementIndex) {
        return achievementIndex 
            && achievementIndex !== "undefined" 
            && StorageManager.getBool(`achievement_${achievementIndex}_unlocked`);
    }

    unlockAchievement(achievementIndex) {
        const achievement = this.getAchievement(achievementIndex);
        let successText = `${achievement.title} unlocked!`;
        this.achievementSound.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
        if (achievement.loot) {
            ItemManager.addToInventory(achievement.loot)
        }
              
        StorageManager.update(`achievement_${achievement.index}_unlocked`, "true"); // Mark achievement as unlocked
        UXManager.showSuccess(successText);
    }

    startAchievementTracking() {
        if (this.checkInterval) return; // Prevent multiple intervals
      
        this.checkInterval = setInterval(() => {
          this.getAchievements().forEach((achievement) => {
            const value = this.getAchievementState(achievement.index);
            
            if (value >= achievement.target && !this.isAchievementReached(achievement.index)) {
                this.unlockAchievement(achievement.index);
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

    getBackgroundImage(achievementIndex) {
        try {
            // Try to load the background image based on the areaIndex
            return require(`@/assets/achievements/${achievementIndex}.png`);
          } catch (error) {
            // If the specific background image isn't found, use the default background image
            return require('@/assets/achievements/default.png');
          }
    }
}

export default new AchievementManager();