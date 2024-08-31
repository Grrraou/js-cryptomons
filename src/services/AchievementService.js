import { useToast } from "vue-toastification";

const toast = useToast();
let checkInterval = null;

export const achievements = [
  {
    key: "clicks_area_btc_mine_10",
    title: "Clicks Master - 10 Clicks",
    target: 10,
    storageKey: "clicks_area_btc_mine"
  },
  {
    key: "clicks_area_btc_mine_100",
    title: "Clicks Master - 100 Clicks",
    target: 100,
    storageKey: "clicks_area_btc_mine"
  },
  {
    key: "clicks_area_btc_mine_1000",
    title: "Clicks Master - 1000 Clicks",
    target: 1000,
    storageKey: "clicks_area_btc_mine"
  },
  // Add more achievements as needed for other areas or thresholds
];

export const startAchievementTracking = () => {
  if (checkInterval) return; // Prevent multiple intervals

  checkInterval = setInterval(() => {
    achievements.forEach((achievement) => {
      const value = parseInt(localStorage.getItem(achievement.storageKey), 10) || 0;

      // Check if the value meets the target and if the achievement is not already unlocked
      if (value >= achievement.target && !localStorage.getItem(achievement.key)) {
        localStorage.setItem(achievement.key, "true"); // Mark achievement as unlocked
        toast.success(`${achievement.title} unlocked!`);
      }
    });
  }, 1000); // Check every second
};

export const stopAchievementTracking = () => {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
};
