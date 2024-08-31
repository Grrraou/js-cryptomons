<template>
  <div class="vault-page">
    <h1>Crypto Vault</h1>
    <p>Total Value of Assets in Cryptocredits: {{ getTotalAssetsValue() }}</p>
    <p>View your stored crypto data here.</p>
    <div class="vault-list">
      <div v-for="token in tokens" :key="token.index" class="vault-item">
        <h2>{{ token.name }}</h2>
        <p><strong>Current Amount:</strong> {{ getTokenValue(token.index) }}</p>
        <p><strong>Total Mined:</strong> {{ getTotalTokenValue(token.index) }}</p>
        <p><strong>Price per {{ token.name }}:</strong> {{ getCryptodollarValue(token.index) }} Cryptocredits</p>
        <p><strong>Total Value in Cryptocredits:</strong> {{ getTotalCryptodollarValue(token.index) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { tokens } from '@/services/TokenService.js'; // Ensure the path is correct

export default {
  name: 'VaultPage',
  data() {
    return {
      tokens,
    };
  },
  methods: {
    getTokenValue(index) {
      const value = parseFloat(localStorage.getItem(`token_${index}`));
      return !isNaN(value) ? value.toFixed(6) : '0.000000'; // Default formatting with 6 decimals
    },
    getTotalTokenValue(index) {
      const value = parseFloat(localStorage.getItem(`total_token_${index}`));
      return !isNaN(value) ? value.toFixed(6) : '0.000000'; // Default formatting with 6 decimals
    },
    getCryptodollarValue(index) {
      const value = parseFloat(localStorage.getItem(`cryptodollar_value_${index}`));
      return !isNaN(value) ? value.toFixed(6) : '0.000000'; // Default formatting with 6 decimals
    },
    getTotalCryptodollarValue(index) {
      const tokenAmount = parseFloat(localStorage.getItem(`token_${index}`));
      const cryptodollarValue = parseFloat(localStorage.getItem(`cryptodollar_value_${index}`));
      const totalValue = tokenAmount * cryptodollarValue;
      return !isNaN(totalValue) ? totalValue.toFixed(6) : '0.000000'; // Default formatting with 6 decimals
    },
    getTotalAssetsValue() {
      let total = 0;
      this.tokens.forEach(token => {
        const tokenAmount = parseFloat(localStorage.getItem(`token_${token.index}`)) || 0;
        const cryptodollarValue = parseFloat(localStorage.getItem(`cryptodollar_value_${token.index}`)) || 0;
        total += tokenAmount * cryptodollarValue;
      });
      return total.toFixed(6); // Format the total value with 6 decimals
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

.vault-item {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.vault-item h2 {
  margin: 0 0 10px;
  font-size: 22px;
}

.vault-item p {
  font-size: 18px;
  margin: 5px 0;
}
</style>
