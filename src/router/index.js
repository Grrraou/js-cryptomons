// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import MinesPage from '@/views/MinesPage.vue';
import StakingPage from '@/views/StakingPage.vue';
import VaultPage from '@/views/VaultPage.vue';
import BattlePage from '@/views/BattlePage.vue';
import SwapPage from '@/views/SwapPage.vue';
import AchievementsPage from '@/views/AchievementsPage.vue';
import StatsPage from '@/views/StatsPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import InventoryPage from '@/views/InventoryPage.vue';
import GoalsPage from '@/views/GoalsPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/mines', name: 'Mines', component: MinesPage },
  { path: '/staking', name: 'Staking', component: StakingPage },
  { 
    path: '/vault', 
    name: 'Vault', 
    component: VaultPage,
    beforeEnter: (to, from, next) => {
      const isGoalUnlocked = localStorage.getItem('goal_grandma_bitcoin_unlocked') === 'true';
      if (isGoalUnlocked) {
        next(); 
      } else {
        alert('You need to Convince Grandma to Buy Bitcoin before accessing the Vault.');
        next('/goals'); // Redirect to Goals page if the goal is not unlocked
      }
    },
  },
  { path: '/battle', name: 'Battle', component: BattlePage },
  { path: '/inventory', name: 'Inventory', component: InventoryPage },
  { 
    path: '/swap', 
    name: 'Swap', 
    component: SwapPage, 
    beforeEnter: (to, from, next) => {
      const isGoalUnlocked = localStorage.getItem('goal_centralize_decentralization_unlocked') === 'true';
      if (isGoalUnlocked) {
        next(); 
      } else {
        alert('You need to Centralize decentralization before accessing the swap.');
        next('/goals'); // Redirect to Goals page if the goal is not unlocked
      }
    }, },
  { path: '/goals', name: 'Goals', component: GoalsPage },
  { path: '/achievements', name: 'Achievements', component: AchievementsPage },
  { path: '/stats', name: 'Stats', component: StatsPage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
