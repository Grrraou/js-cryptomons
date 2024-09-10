<template>
  <div class="vault-page game-container">
    <h1 class="page-title">Crypto Vault</h1>
    <p>Total Value of Assets in Cryptocredits: {{ TokenManager.getToalAssetsValue().toFixed(2) }}</p>

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
      <TokenThumb v-for="token in filteredTokens" 
        :key="token.index" 
        :token="token"
        :sortOption="sortOption"
        class="vault-item" 
      />
    </div>
  </div>
</template>

<script>
import TokenThumb from '@/components/TokenThumb.vue';
import TokenManager from '@/services/TokenManager';

export default {
  name: 'VaultPage',
  setup() {
      return {
        TokenManager,
      };
  },
  components: {
    TokenThumb,
  },
  data() {
    return {
      tokens: TokenManager.getTokens(),
      intervalId: null,
      filterText: '', // For filtering tokens
      sortOption: 'default', // Default sort option
    };
  },
  computed: {
    filteredTokens() {
      // Filter tokens based on filterText and amount > 0
      let filtered = this.tokens.filter(token => {
        const tokenAmount = TokenManager.getBalance(token.index);
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
          return TokenManager.getBalance(b.index) - TokenManager.getBalance(a.index);
        });
      } else if (this.sortOption === 'price') {
        filtered.sort((a, b) => {
          return TokenManager.getTokenPrice(b.index) - TokenManager.getTokenPrice(a.index);
        });
      } else if (this.sortOption === 'totalValue') {
        filtered.sort((a, b) => {
          return parseFloat(TokenManager.getBalanceInCryptodollar(b.index)) - parseFloat(TokenManager.getBalanceInCryptodollar(a.index));
        });
      }

      // If sortOption is 'default', return the tokens in their original order
      return filtered;
    },
  },
  methods: {
    updateData() {
      // Trigger reactivity by simply updating a dummy data property
      this.$forceUpdate();
    },
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
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>
