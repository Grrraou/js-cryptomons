<template>
    <div class="token-thumb">
      <h2>
          <img class="tokenSymbol" :src="TokenManager.getTokenIcon(token.index)"> 
          {{ token.name }}
        </h2>
        
        <!-- Current Amount with dynamic class binding for highlighting -->
        <p :class="{'highlight-amount': sortOption === 'amount'}">
          <span class='label'>Current Amount:</span> 
          <br>
          <span class="tokenSum">{{ tokenBalance }} <img class="token-icon" :src="TokenManager.getTokenIcon(token.index)"></span>
        </p>

        <!-- Price per token with dynamic class binding for highlighting -->
        <p :class="{'highlight-price': sortOption === 'price'}">
          <span class='label'>Price per {{ token.name }}:</span>
          <br>
          <span class="tokenSum">{{ tokenPrice }} <img class="token-icon" src="@/assets/tokens/cryptodollar.png"></span>
        </p>
        
        <!-- Total Value in Cryptocredits with dynamic class binding for highlighting -->
        <p :class="{'highlight-total-value': sortOption === 'totalValue'}">
          <span class='label'>Total Value in Cryptocredits:</span>
          <br>
          <span class="tokenSum">{{ balanceInCryptodollar }} <img class="token-icon" src="@/assets/tokens/cryptodollar.png"></span>
        </p>
    </div>
</template>

<script>
import TokenManager from '@/managers/TokenManager';

export default {
    props: {
      token: Object,
      sortOption: String,
    },
    data() {
      return {
        intervalId: null,
        tokenBalance: TokenManager.getBalance(this.token.index),
        tokenPrice: TokenManager.getTokenPrice(this.token.index),
        balanceInCryptodollar: TokenManager.getBalanceInCryptodollar(this.token.index),
      };
    },
    setup() {
      return {
        TokenManager,
      };
    },
    methods: {
      startPolling() {
      this.intervalId = setInterval(() => {
        this.tokenBalance = TokenManager.getBalance(this.token.index);
        this.tokenPrice = TokenManager.getTokenPrice(this.token.index);
        this.balanceInCryptodollar = TokenManager.getBalanceInCryptodollar(this.token.index)
      }, 200);
    }
    },
    mounted() {
      this.startPolling();
  },
};
</script>

<style scoped>
.token-thumb {
  margin: 10px;
  padding: 20px;
  width: 10%;
  border: 4px solid #ffa500;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fdfdfd;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: bold;
  color: #444;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.token-thumb:hover {
  border: 4px solid #5EC15E;
}

.token-thumb h2 {
  margin: 0 0 10px;
  font-size: 22px;
}

.token-thumb p {
  font-size: 18px;
  margin: 5px 0;
}

.tokenSum {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.label {
  font-size: 12px;
}

.highlight-amount {
  background-color: #fff4e5;
  font-weight: bold;
  color: #ff8c00;
}

.highlight-price {
  background-color: #e5f4ff;
  font-weight: bold;
  color: #007bff;
}

.highlight-total-value {
  background-color: #e5ffe5;
  font-weight: bold;
  color: #28a745;
}

.token-icon {
  width: 16px;
  height: auto;
  transition: transform 0.3s ease;
  margin-bottom: -2px;
}

.tokenSymbol {
  width: 16px;
}
</style>