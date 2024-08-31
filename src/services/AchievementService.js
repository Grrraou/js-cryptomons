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
  {
    key: "upgrade_area_btc_mine_10",
    title: "Upgrade Master - upgrade mine 10 times",
    target: 10,
    storageKey: "level_area_btc_mine"
  },
  {
    key: "upgrade_area_btc_mine_100",
    title: "Upgrade Master - upgrade mine 100 times",
    target: 100,
    storageKey: "level_area_btc_mine"
  },
  {
    key: "upgrade_area_btc_mine_1000",
    title: "Upgrade Master - upgrade mine 1000 times",
    target: 100,
    storageKey: "level_area_btc_mine"
  },
  {
    key: "clicks_area_xmr_mine_10",
    title: "Clicks Master - 10 Clicks",
    target: 10,
    storageKey: "clicks_area_xmr_mine"
  },
  {
    key: "clicks_area_xmr_mine_100",
    title: "Clicks Master - 100 Clicks",
    target: 100,
    storageKey: "clicks_area_xmr_mine"
  },
  {
    key: "clicks_area_xmr_mine_1000",
    title: "Clicks Master - 1000 Clicks",
    target: 1000,
    storageKey: "clicks_area_xmr_mine"
  },
  {
    key: "upgrade_area_xmr_mine_10",
    title: "Upgrade Master - upgrade mine 10 times",
    target: 10,
    storageKey: "level_area_xmr_mine"
  },
  {
    key: "upgrade_area_xmr_mine_100",
    title: "Upgrade Master - upgrade mine 100 times",
    target: 100,
    storageKey: "level_area_xmr_mine"
  },
  {
    key: "upgrade_area_xmr_mine_1000",
    title: "Upgrade Master - upgrade mine 1000 times",
    target: 100,
    storageKey: "level_area_xmr_mine"
  },
  {
    key: "clicks_area_doge_mine_10",
    title: "Clicks Master - 10 Clicks",
    target: 10,
    storageKey: "clicks_area_doge_mine"
  },
  {
    key: "clicks_area_doge_mine_100",
    title: "Clicks Master - 100 Clicks",
    target: 100,
    storageKey: "clicks_area_doge_mine"
  },
  {
    key: "clicks_area_doge_mine_1000",
    title: "Clicks Master - 1000 Clicks",
    target: 1000,
    storageKey: "clicks_area_doge_mine"
  },
  {
    key: "upgrade_area_doge_mine_10",
    title: "Upgrade Master - upgrade mine 10 times",
    target: 10,
    storageKey: "level_area_doge_mine"
  },
  {
    key: "upgrade_area_doge_mine_100",
    title: "Upgrade Master - upgrade mine 100 times",
    target: 100,
    storageKey: "level_area_doge_mine"
  },
  {
    key: "upgrade_area_doge_mine_1000",
    title: "Upgrade Master - upgrade mine 1000 times",
    target: 100,
    storageKey: "level_area_doge_mine"
  },
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
