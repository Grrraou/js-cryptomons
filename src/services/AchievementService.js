import { useToast } from "vue-toastification";

const toast = useToast();
let checkInterval = null;

export const achievements = [
  {
    key: "clicks_area_btc_mine_10",
    title: "Bitcoin Tinkerer - 10 Clicks",
    description: "Start your journey with a modest 10 clicks in the Bitcoin mine.",
    target: 10,
    storageKey: "clicks_area_btc_mine"
  },
  {
    key: "clicks_area_btc_mine_100",
    title: "Bitcoin Enthusiast - 100 Clicks",
    description: "Reach a milestone of 100 clicks and show your dedication to Bitcoin mining.",
    target: 100,
    storageKey: "clicks_area_btc_mine"
  },
  {
    key: "clicks_area_btc_mine_1000",
    title: "Bitcoin Powerhouse - 1000 Clicks",
    description: "Dominate the Bitcoin mine with 1000 clicks, proving your mining prowess.",
    target: 1000,
    storageKey: "clicks_area_btc_mine"
  },
  {
    key: "upgrade_area_btc_mine_10",
    title: "Bitcoin Architect - 10 Upgrades",
    description: "Build your Bitcoin empire with 10 crucial upgrades.",
    target: 10,
    storageKey: "level_area_btc_mine"
  },
  {
    key: "upgrade_area_btc_mine_100",
    title: "Bitcoin Mogul - 100 Upgrades",
    description: "Elevate your Bitcoin mining operation with 100 strategic upgrades.",
    target: 100,
    storageKey: "level_area_btc_mine"
  },
  {
    key: "upgrade_area_btc_mine_1000",
    title: "Bitcoin Overlord - 1000 Upgrades",
    description: "Achieve legendary status by upgrading your Bitcoin mine 1000 times.",
    target: 1000,
    storageKey: "level_area_btc_mine"
  },
  {
    key: "clicks_area_xmr_mine_10",
    title: "Monero Initiate - 10 Clicks",
    description: "Begin mining Monero with your first 10 clicks.",
    target: 10,
    storageKey: "clicks_area_xmr_mine"
  },
  {
    key: "clicks_area_xmr_mine_100",
    title: "Monero Seeker - 100 Clicks",
    description: "Gather 100 clicks and delve deeper into Monero mining.",
    target: 100,
    storageKey: "clicks_area_xmr_mine"
  },
  {
    key: "clicks_area_xmr_mine_1000",
    title: "Monero Maestro - 1000 Clicks",
    description: "Master Monero mining with a total of 1000 clicks.",
    target: 1000,
    storageKey: "clicks_area_xmr_mine"
  },
  {
    key: "upgrade_area_xmr_mine_10",
    title: "Monero Builder - 10 Upgrades",
    description: "Start expanding your Monero mine with 10 upgrades.",
    target: 10,
    storageKey: "level_area_xmr_mine"
  },
  {
    key: "upgrade_area_xmr_mine_100",
    title: "Monero Strategist - 100 Upgrades",
    description: "Push your Monero mine to new heights with 100 upgrades.",
    target: 100,
    storageKey: "level_area_xmr_mine"
  },
  {
    key: "upgrade_area_xmr_mine_1000",
    title: "Monero Tycoon - 1000 Upgrades",
    description: "Achieve greatness by upgrading your Monero mine 1000 times.",
    target: 1000,
    storageKey: "level_area_xmr_mine"
  },
  {
    key: "clicks_area_doge_mine_10",
    title: "Doge Explorer - 10 Clicks",
    description: "Take your first steps in Dogecoin mining with 10 clicks.",
    target: 10,
    storageKey: "clicks_area_doge_mine"
  },
  {
    key: "clicks_area_doge_mine_100",
    title: "Doge Prospector - 100 Clicks",
    description: "Gather 100 clicks as you continue your Dogecoin mining adventure.",
    target: 100,
    storageKey: "clicks_area_doge_mine"
  },
  {
    key: "clicks_area_doge_mine_1000",
    title: "Doge Magnate - 1000 Clicks",
    description: "Show your Dogecoin mining strength with 1000 clicks.",
    target: 1000,
    storageKey: "clicks_area_doge_mine"
  },
  {
    key: "upgrade_area_doge_mine_10",
    title: "Doge Engineer - 10 Upgrades",
    description: "Start refining your Dogecoin mine with 10 important upgrades.",
    target: 10,
    storageKey: "level_area_doge_mine"
  },
  {
    key: "upgrade_area_doge_mine_100",
    title: "Doge Visionary - 100 Upgrades",
    description: "Lead the Dogecoin revolution with 100 game-changing upgrades.",
    target: 100,
    storageKey: "level_area_doge_mine"
  },
  {
    key: "upgrade_area_doge_mine_1000",
    title: "Doge Empire - 1000 Upgrades",
    description: "Become a legend by upgrading your Dogecoin mine 1000 times.",
    target: 1000,
    storageKey: "level_area_doge_mine"
  },
];


export const startAchievementTracking = () => {
  const achievementSound = new Audio(require('@/assets/sounds/achievement.wav'));
  achievementSound.volume = 0.5;
  if (checkInterval) return; // Prevent multiple intervals

  checkInterval = setInterval(() => {
    achievements.forEach((achievement) => {
      const value = parseInt(localStorage.getItem(achievement.storageKey), 10) || 0;
      
      // Check if the value meets the target and if the achievement is not already unlocked
      if (value >= achievement.target && !localStorage.getItem(achievement.key)) {
        achievementSound.play();
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
