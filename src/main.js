// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { startAchievementTracking } from './services/AchievementService';
import { initCryptodollarValues } from './services/TokenService';
import { startStakingUpdates } from './services/StakingService';

createApp(App).use(router).use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
}).mount('#app');

startAchievementTracking();
initCryptodollarValues();
startStakingUpdates();
