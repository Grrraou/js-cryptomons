<template>
  <div class="stats-page">
    <h1>Stats Page</h1>
    <p>See your game stats here.</p>
    <div class="stats-list">
      <div v-for="(value, key) in localStorageItems" :key="key" class="stat-item">
        <span class="stat-key">{{ key }}:</span>
        <span class="stat-value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsPage',
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
  },
};

</script>

<style>
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