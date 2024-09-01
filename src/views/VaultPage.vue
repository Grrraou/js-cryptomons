<template>
  <div class="vault-page game-container">
    <h1 class="page-title">Crypto Vault</h1>
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

.vault-page {
  padding-left: 220px; /* Space for the side menu */
  margin-top: 50px;
}

.vault-list {
  margin-top: 20px;
}

.vault-item {
    margin: 10px;
    padding: 20px;
    width: 10%;
    border: 2px solid #ffa500;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.3em;
    font-weight: bold;
    color: #444; /* White text color */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Dark shadow for contrast */
  }

  .vault-item:hover {
    border: 6px solid #ffa500;
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
