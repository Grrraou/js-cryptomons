// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import MinesPage from '@/views/MinesPage.vue';
import AchievementsPage from '@/views/AchievementsPage.vue';
import StatsPage from '@/views/StatsPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/mines', name: 'Mines', component: MinesPage },
  { path: '/achievements', name: 'Achievements', component: AchievementsPage },
  { path: '/stats', name: 'Stats', component: StatsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;