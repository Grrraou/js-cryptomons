// src/main.js
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import AchievementManager from '@/managers/AchievementManager';
import ItemManager from '@/managers/ItemManager';
import StakingManager from '@/managers/StakingManager';
import TokenManager from '@/managers/TokenManager';

createApp(App).use(router).use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
}).mount('#app');

AchievementManager.startAchievementTracking();
TokenManager.initCryptodollarValues();
ItemManager.initInventory();
StakingManager.startStakingUpdates();
