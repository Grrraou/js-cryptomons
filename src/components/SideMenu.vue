<template>
  <div class="side-menu">
    <div class="side-menu-container">
      <div class="logo-container">
        <img src="@/assets/mainLogo.png" alt="Cryptomons Logo" class="logo" />
      </div>
      <div class="totalAssets">
        {{ totalAssetsValue }} <img class="token-icon" src="@/assets/tokens/cryptodollar.png">
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/">🏠 Home</router-link>
          </li>
          <li>
            <router-link to="/mines">⛏️ Mines</router-link>
          </li>
          <li v-if="isStakingUnlocked">
            <router-link to="/staking">🔒 Staking</router-link>
          </li>
          <li v-else>
            <router-link to="/staking" class="forbidden-link">🚫 Staking</router-link>
          </li>
          <li v-if="isVaultUnlocked">
            <router-link to="/vault">🏛️ Vault</router-link>
          </li>
          <li v-else>
            <router-link to="/vault" class="forbidden-link">🚫 Vault</router-link>
          </li>
          <li>
            <router-link to="/battle">⚔️ Battle</router-link>
          </li>
          <li>
            <router-link to="/inventory">📦 Inventory</router-link>
          </li>
          <li v-if="isSwapUnlocked">
            <router-link to="/swap">🔄 Swap</router-link>
          </li>
          <li v-else>
            <router-link to="/swap" class="forbidden-link">🚫 Swap</router-link>
          </li>
          <li>
            <router-link to="/goals">🎯 Goals</router-link>
          </li>
          <li>
            <router-link to="/achievements">🏆 Achievements</router-link>
          </li>
          <li>
            <router-link to="/stats">📊 Stats</router-link>
          </li>
          <li>
            <router-link to="/settings">⚙️ Settings</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { tokens } from '@/services/TokenService';

export default {
  name: 'SideMenu',
  data() {
    return {
      tokens,
      totalAssetsValue: 0,
      isStakingUnlocked: false,
      isVaultUnlocked: false,
      isSwapUnlocked: false, // Track the vault goal unlock status
      intervalId: null, // Track the interval ID to clear it later
    };
  },
  methods: {
    updateTotalAssetsValue() {
      let total = 0;
      this.tokens.forEach(token => {
        const tokenAmount = parseFloat(localStorage.getItem(`token_${token.index}`)) || 0;
        const cryptodollarValue = parseFloat(localStorage.getItem(`cryptodollar_value_${token.index}`)) || 0;
        total += tokenAmount * cryptodollarValue;
      });
      this.totalAssetsValue = total.toFixed(6);
    },
    checkStakingUnlocked() {
      // Check if the vault goal is unlocked in localStorage
      this.isStakingUnlocked = localStorage.getItem('goal_discover_proof_of_stake_unlocked') === 'true';
    },
    checkVaultUnlocked() {
      // Check if the vault goal is unlocked in localStorage
      this.isVaultUnlocked = localStorage.getItem('goal_grandma_bitcoin_unlocked') === 'true';
    },
    checkSwapUnlocked() {
      // Check if the vault goal is unlocked in localStorage
      this.isSwapUnlocked = localStorage.getItem('goal_centralize_decentralization_unlocked') === 'true';
    },
    handleStorageChange(event) {
      if (event.key === 'goal_discover_proof_of_stake_unlocked') {
        this.checkStakingUnlocked();
      }
      if (event.key === 'goal_grandma_bitcoin_unlocked') {
        this.checkVaultUnlocked();
      }
      if (event.key === 'goal_centralize_decentralization_unlocked') {
        this.checkSwapUnlocked();
      }
    },
    startPolling() {
      // Poll for changes every second to capture changes made in the same tab
      this.intervalId = setInterval(() => {
        this.updateTotalAssetsValue();
        this.checkStakingUnlocked();
        this.checkVaultUnlocked();
        this.checkSwapUnlocked();
      }, 1000);
    }
  },
  mounted() {
    // Initial check when the component is mounted
    this.checkStakingUnlocked();
    this.checkVaultUnlocked();
    this.checkSwapUnlocked();

    // Listen for changes in localStorage from other tabs
    window.addEventListener('storage', this.handleStorageChange);

    // Start polling to capture changes made in the same tab
    this.startPolling();
  },
  beforeUnmount() {
    // Clean up interval and event listener
    clearInterval(this.intervalId);
    window.removeEventListener('storage', this.handleStorageChange);
  },
};
</script>

<style scoped>
.token-icon {
    width: 16px;
    height: auto;
    transition: transform 0.3s ease;
  }
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, #1a1a1d, #4e4e50);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  margin-bottom: 20px;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
}

.logo-container:hover .logo {
  transform: scale(1.1);
}

.side-menu {
  width: 160px;
  padding: 20px;
}

.side-menu-container {
  position: fixed;
  height: 100vh;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  margin: 10px 0;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

nav ul li a:hover {
  font-size: 1.2em;
}

nav ul li a.router-link-active {
  color: #42b983;
}

.forbidden-link {
  color: red;
  font-weight: bold;
  cursor: not-allowed;
}
</style>
