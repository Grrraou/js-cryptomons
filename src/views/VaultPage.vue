<template>
    <div class="vault-page">
      <h1>Crypto Vault</h1>
      <p>View your stored crypto data here.</p>
      <div class="vault-list">
        <CryptoVault
          v-for="(value, key) in floatStorageItems"
          :key="key"
          :title="key"
          :value="value"
        />
      </div>
    </div>
  </template>
  
  <script>
  import CryptoVault from '@/components/CryptoVault.vue';
  
  export default {
    name: 'VaultPage',
    components: {
      CryptoVault,
    },
    data() {
      return {
        floatStorageItems: {},
      };
    },
    created() {
      this.loadFloatStorage();
    },
    methods: {
      loadFloatStorage() {
        const items = {};
        const keys = [];
  
        // Get all keys from localStorage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = parseFloat(localStorage.getItem(key));
  
          // Check if the value is a valid float number
          if (!isNaN(value)) {
            keys.push(key);
          }
        }
  
        // Sort keys alphabetically
        keys.sort();
  
        // Populate items object with sorted keys and their values
        keys.forEach((key) => {
          items[key] = parseFloat(localStorage.getItem(key));
        });
  
        this.floatStorageItems = items;
      },
    },
  };
  </script>
  
  <style scoped>
  .vault-page {
    padding-left: 220px; /* Space for the side menu */
    margin-top: 50px;
  }
  
  .vault-list {
    margin-top: 20px;
  }
  </style>
  