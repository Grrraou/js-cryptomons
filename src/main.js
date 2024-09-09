// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { initCryptodollarValues } from './services/TokenService';
import { startStakingUpdates } from './services/StakingService';
import AchievementManager from './services/AchievementManager';
import ItemManager from './services/ItemManager';

createApp(App).use(router).use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
}).mount('#app');

AchievementManager.startAchievementTracking();
initCryptodollarValues();
ItemManager.initInventory();
startStakingUpdates();
