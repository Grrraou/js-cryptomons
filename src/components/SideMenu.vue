<template>
  <div class="side-menu">
    <div class="sound-toggle">
        <button @click="toggleSound()">{{ soundIcon }}</button>
      </div>
    <div class="side-menu-container">
      <div class="logo-container">
        <img src="@/assets/mainLogo.png" alt="Cryptomons Logo" class="logo" />
      </div>
      <div class="totalAssets">
        {{ totalAssetsValue }} <img class="token-icon" src="@/assets/tokens/cryptodollar.png">
      </div>
      <nav class="main-menu-nav">
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
          <li v-if="isBattleUnlocked">
            <router-link to="/battle">⚔️ Battle</router-link>
          </li>
          <li v-else>
            <router-link to="/battle" class="forbidden-link">🚫 Battle</router-link>
          </li>
          <li v-if="isInventoryUnlocked">
            <router-link to="/inventory">📦 Inventory</router-link>
          </li>
          <li v-else>
            <router-link to="/inventory" class="forbidden-link">🚫 Inventory</router-link>
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
import GoalManager from '@/managers/GoalManager';
import TokenManager from '@/managers/TokenManager';
import AudioManager from '@/managers/AudioManager';

export default {
  name: 'SideMenu',
  data() {
    return {
      tokens: TokenManager.getTokens(),
      totalAssetsValue: 0,
      isStakingUnlocked: false,
      isVaultUnlocked: false,
      isBattleUnlocked: false,
      isInventoryUnlocked: false,
      isSwapUnlocked: false,
      intervalId: null,
      soundOn: AudioManager.isSoundOn(),
    };
  },
  setup() {
    return {
      AudioManager,
    }
  },
  computed: {
    soundIcon() {
      return this.soundOn ? '🔊' : '🔇';
    }
  },
  methods: {
    startPolling() {
      this.intervalId = setInterval(() => {
        this.totalAssetsValue = TokenManager.getToalAssetsValue().toFixed(2);
        this.isStakingUnlocked = GoalManager.isGoalReached('discover_proof_of_stake');
        this.isVaultUnlocked = GoalManager.isGoalReached('grandma_bitcoin');
        this.isBattleUnlocked = GoalManager.isGoalReached('build_and_build');
        this.isInventoryUnlocked = GoalManager.isGoalReached('shopping_on_silk_road');
        this.isSwapUnlocked = GoalManager.isGoalReached('centralize_decentralization');
        this.soundOn = AudioManager.isSoundOn();
      }, 100);
    },
    toggleSound() {
      this.soundOn = !this.soundOn;
      AudioManager.toggleSound();
    }
  },
  mounted() {
    this.totalAssetsValue = TokenManager.getToalAssetsValue().toFixed(2);
    this.isStakingUnlocked = GoalManager.isGoalReached('discover_proof_of_stake');
    this.isVaultUnlocked = GoalManager.isGoalReached('grandma_bitcoin');
    this.isBattleUnlocked = GoalManager.isGoalReached('build_and_build');
    this.isInventoryUnlocked = GoalManager.isGoalReached('shopping_on_silk_road');
    this.isSwapUnlocked = GoalManager.isGoalReached('centralize_decentralization');

    this.startPolling();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.main-menu-nav {
  font-size: 20px;
}
.totalAssets {
  font-weight: bold;
  font-size: 20px;
}
.token-icon {
    width: 16px;
    height: auto;
    transition: transform 0.3s ease;
    margin-bottom: -2px;
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

/** SOUND */
.sound-toggle {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
}

.sound-toggle button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
