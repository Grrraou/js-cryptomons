<template>
  <div class="stats-page game-container">
    <h1 class="page-title">Stats Page</h1>
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
import MenuWindow from '@/components/MenuWindow.vue';

export default {
  name: 'StatsPage',
  components: {
    MenuWindow,
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

      // Get all keys from localStorage
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }

      // Sort keys alphabetically
      keys.sort();

      // Populate items object with sorted keys
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
  font-size: 28px; /* Slightly larger font size for emphasis */
  font-weight: bold;
  color: #444; /* Keep the white color for contrast */
  text-align: center;
  top: 0;
  margin-bottom: 20px; /* Increase the bottom margin for better spacing */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6); /* Softer, larger shadow for depth */
  background-color: transparent; /* Remove background color to avoid button-like appearance */
  padding: 0; /* Remove padding to avoid button-like appearance */
  border-radius: 0; /* Remove border radius to make it more like a title */
  letter-spacing: 1px; /* Slight letter spacing for elegance */
  text-transform: uppercase; /* Uppercase letters for a more formal look */
  border-bottom: 2px solid #ffa500; /* Add a subtle underline for emphasis */
}

.stats-page {
  padding-left: 220px; /* Space for the side menu */
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