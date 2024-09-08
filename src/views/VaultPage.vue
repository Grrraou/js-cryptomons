<template>
  <div class="vault-page game-container">
    <h1 class="page-title">Crypto Vault</h1>
    <p>Total Value of Assets in Cryptocredits: {{ getTotalAssetsValue() }}</p>
    <div class="vault-list">
      <!-- Use filteredTokens instead of tokens -->
      <div v-for="token in filteredTokens" :key="token.index" class="vault-item">
        <h2><img class="tokenSymbol" :src="getTokenIcon(token.index)"> {{ token.name }}</h2>
        <p><strong>Current Amount:</strong> {{ getTokenValue(token.index) }}</p>
        <p><strong>Total Obtained:</strong> {{ getTotalTokenValue(token.index) }}</p>
        <p><strong>Price per {{ token.name }}:</strong> {{ getCryptodollarValue(token.index) }} <img class="token-icon" src="@/assets/tokens/cryptodollar.png"></p>
        <p><strong>Total Value in Cryptocredits:</strong> {{ getTotalCryptodollarValue(token.index) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { tokens } from '@/services/TokenService';

export default {
  name: 'VaultPage',
  data() {
    return {
      tokens,
      intervalId: null,
    };
  },
  computed: {
    filteredTokens() {
      return this.tokens.filter(token => parseFloat(this.getTotalTokenValue(token.index)) > 0);
    },
  },
  methods: {
    getTokenIcon(token) {
        try {
          return require(`@/assets/tokens/${token}.png`);
        } catch (error) {
          return require('@/assets/tokens/default.png');
        }
      },
    getTokenValue(index) {
      const value = parseFloat(localStorage.getItem(`token_${index}`));
      return !isNaN(value) ? value.toFixed(6) : '0.000000';
    },
    getTotalTokenValue(index) {
      const value = parseFloat(localStorage.getItem(`token_${index}`));
      
      return !isNaN(value) ? value.toFixed(6) : '0.000000';
    },
    getCryptodollarValue(index) {
      const value = parseFloat(localStorage.getItem(`cryptodollar_value_${index}`));
      return !isNaN(value) ? value.toFixed(6) : '0.000000';
    },
    getTotalCryptodollarValue(index) {
      const tokenAmount = parseFloat(localStorage.getItem(`token_${index}`));
      const cryptodollarValue = parseFloat(localStorage.getItem(`cryptodollar_value_${index}`));
      const totalValue = tokenAmount * cryptodollarValue;
      return !isNaN(totalValue) ? totalValue.toFixed(6) : '0.000000';
    },
    getTotalAssetsValue() {
      let total = 0;
      this.tokens.forEach(token => {
        const tokenAmount = parseFloat(localStorage.getItem(`token_${token.index}`)) || 0;
        const cryptodollarValue = parseFloat(localStorage.getItem(`cryptodollar_value_${token.index}`)) || 0;
        total += tokenAmount * cryptodollarValue;
      });
      return total.toFixed(6);
    },
    updateData() {
      // Trigger reactivity by simply updating a dummy data property
      this.$forceUpdate();
    }
  },
  mounted() {
    // Set up a periodic check to update the data every 2 seconds
    this.intervalId = setInterval(this.updateData, 2000);
  },
  beforeUnmount() {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  },
};

</script>

<style scoped>
.token-icon {
    width: 16px;
    height: auto;
    transition: transform 0.3s ease;
  }
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
}

.vault-page {
  padding-left: 220px;
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
  color: #444;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
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

.tokenSymbol {
  width: 16px;
}
</style>
