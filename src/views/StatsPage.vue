<template>
  <div class="stats-page game-container">
    <h1 class="page-title">Stats Page <InfoBubble page="stats" /></h1>
    <p>See your game stats here.</p>
    <MenuWindow @reset-stats="resetStoredStats" />
  
    <div class="stats-list">
      <div v-for="(value, key) in localStorageItems" :key="key" class="stat-item">
        <span class="stat-key">{{ key }}:</span>
        <span class="stat-value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import InfoBubble from '@/components/InfoBubble.vue';
import MenuWindow from '@/components/MenuWindow.vue';

export default {
  name: 'StatsPage',
  components: {
    MenuWindow,
    InfoBubble,
  },
  data() {
    return {
      localStorageItems: {},
    };
  },
  created() {
    this.loadLocalStorage();
  },
  methods: {
    loadLocalStorage() {
      const items = {};
      const keys = [];

      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }
      keys.sort();

      keys.forEach((key) => {
        items[key] = localStorage.getItem(key);
      });
      this.localStorageItems = items;
    },
    resetStoredStats() {
      localStorage.clear();
      window.location.reload();
    },
  },
};

</script>

<style>
.page-title {
  position: relative;
  font-size: 28px;
  font-weight: bold;
  color: #444;
  text-align: center;
  top: 0;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 2px solid #ffa500;
  display:flex;
  justify-content: center;
  align-items: center;
}

.stats-page {
  padding-left: 220px;
  margin-top: 50px;
}

.stats-list {
  margin-top: 20px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.stat-key {
  font-weight: bold;
  margin-right: 10px;
}

.stat-value {
  color: #333;
}

</style>