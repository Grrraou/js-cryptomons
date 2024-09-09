<template>
  <div class="vault-page game-container">
    <h1 class="page-title">Crypto Vault</h1>
    <p>Total Value of Assets in Cryptocredits: {{ getTotalAssetsValue() }}</p>

    <!-- Filter and Sort UI -->
    <div class="filter-sort">
      <input
        v-model="filterText"
        type="text"
        placeholder="Filter by token name or index"
        class="filter-input"
      />
      <select v-model="sortOption" class="sort-select">
        <option value="default">Sort by Default</option>
        <option value="amount">Sort by Current Amount</option>
        <option value="price">Sort by Price</option>
        <option value="totalValue">Sort by Total Value</option>
      </select>
    </div>

    <!-- Token List -->
    <div class="vault-list">
      <div v-for="token in filteredTokens" :key="token.index" class="vault-item">
        <h2>
          <img class="tokenSymbol" :src="getTokenIcon(token.index)"> 
          {{ token.name }}
        </h2>
        
        <!-- Current Amount with dynamic class binding for highlighting -->
        <p :class="{'highlight-amount': sortOption === 'amount'}">
          <span class='label'>Current Amount:</span> 
          <br>
          <span class="tokenSum">{{ getTokenValue(token.index) }} <img class="token-icon" :src="getTokenIcon(token.index)"></span>
        </p>

        <!-- <p><strong>Total Obtained:</strong> {{ getTotalTokenValue(token.index) }}</p> -->

        <!-- Price per token with dynamic class binding for highlighting -->
        <p :class="{'highlight-price': sortOption === 'price'}">
          <span class='label'>Price per {{ token.name }}:</span>
          <br>
          <span class="tokenSum">{{ getCryptodollarValue(token.index) }} <img class="token-icon" src="@/assets/tokens/cryptodollar.png"></span>
        </p>
        
        <!-- Total Value in Cryptocredits with dynamic class binding for highlighting -->
        <p :class="{'highlight-total-value': sortOption === 'totalValue'}">
          <span class='label'>Total Value in Cryptocredits:</span>
          <br>
          <span class="tokenSum">{{ getTotalCryptodollarValue(token.index) }} <img class="token-icon" src="@/assets/tokens/cryptodollar.png"></span>
        </p>
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
      filterText: '', // For filtering tokens
      sortOption: 'default', // Default sort option
    };
  },
  computed: {
    filteredTokens() {
      // Filter tokens based on filterText and amount > 0
      let filtered = this.tokens.filter(token => {
        const tokenAmount = parseFloat(localStorage.getItem(`token_${token.index}`)) || 0;
        
        // Include only tokens where the amount > 0 and matches the filterText
        return (
          tokenAmount > 0 &&
          (token.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
          token.index.toLowerCase().includes(this.filterText.toLowerCase()))
        );
      });

      // Sort based on sortOption
      if (this.sortOption === 'amount') {
        filtered.sort((a, b) => {
          return parseFloat(this.getTokenValue(b.index)) - parseFloat(this.getTokenValue(a.index));
        });
      } else if (this.sortOption === 'price') {
        filtered.sort((a, b) => {
          return parseFloat(this.getCryptodollarValue(b.index)) - parseFloat(this.getCryptodollarValue(a.index));
        });
      } else if (this.sortOption === 'totalValue') {
        filtered.sort((a, b) => {
          return parseFloat(this.getTotalCryptodollarValue(b.index)) - parseFloat(this.getTotalCryptodollarValue(a.index));
        });
      }

      // If sortOption is 'default', return the tokens in their original order
      return filtered;
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
.tokenSum {
  white-space: nowrap; /* Prevents text from wrapping */
  overflow: hidden;    /* Hides any overflow if the content is too long */
  text-overflow: ellipsis;
}
.label {
  font-size: 12px;
}
/* Highlight Styles */
.highlight-amount {
  background-color: #fff4e5; /* Light orange background for amount */
  font-weight: bold;
  color: #ff8c00; /* Orange color for text */
}

.highlight-price {
  background-color: #e5f4ff; /* Light blue background for price */
  font-weight: bold;
  color: #007bff; /* Blue color for text */
}

.highlight-total-value {
  background-color: #e5ffe5; /* Light green background for total value */
  font-weight: bold;
  color: #28a745; /* Green color for text */
}

/* Filter and Sort */
.filter-sort {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-input {
  padding: 10px;
  width: 60%;
  border: 2px solid #ffa500;
  border-radius: 8px;
  font-size: 1.2em;
}

.sort-select {
  padding: 10px;
  border: 2px solid #ffa500;
  border-radius: 8px;
  font-size: 1.2em;
}

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
  align-items: flex-start;
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
