<template>
    <div class="swap-box">
      <h2>Crypto Swap</h2>
      <div class="swap-interface">
        <label for="from-token">From:</label>
        <select v-model="fromToken" @change="updateBalances" id="from-token">
          <option v-for="token in tokens" :key="token.index" :value="token.index">
            {{ token.name }} (Balance: {{ getTokenBalance(token.index) }})
          </option>
        </select>
  
        <label for="to-token">To:</label>
        <select v-model="toToken" @change="updateBalances" id="to-token">
          <option v-for="token in tokens" :key="token.index" :value="token.index">
            {{ token.name }} (Balance: {{ getTokenBalance(token.index) }})
          </option>
        </select>
  
        <div class="swap-amount">
          <input v-model="amount" type="number" placeholder="Amount" />
          <div class="quick-select-buttons">
            <button @click="selectPercentage(25)">25%</button>
            <button @click="selectPercentage(50)">50%</button>
            <button @click="selectPercentage(75)">75%</button>
            <button @click="selectPercentage(100)">100%</button>
          </div>
        </div>
  
        <button @click="swapTokens">Swap</button>
      </div>
      <div v-if="swapResult" class="swap-result">
        <p>You will receive approximately {{ swapResult }} {{ toToken.toUpperCase() }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { tokens } from '../services/TokenService';
  
  export default {
    data() {
      return {
        fromToken: tokens[0].index,
        toToken: tokens[1].index,
        amount: 0,
        tokens,
        swapResult: null,
        fromTokenBalance: 0,
        toTokenBalance: 0,
      };
    },
    methods: {
      updateBalances() {
        this.fromTokenBalance = parseFloat(localStorage.getItem(`token_${this.fromToken}`)) || 0;
        this.toTokenBalance = parseFloat(localStorage.getItem(`token_${this.toToken}`)) || 0;
        this.calculatePotentialSwap();
      },
      getTokenBalance(tokenIndex) {
        return parseFloat(localStorage.getItem(`token_${tokenIndex}`)) || 0;
      },
      calculatePotentialSwap() {
        const fromTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.fromToken}`)) || 0;
        const toTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.toToken}`)) || 0;
  
        if (this.amount > 0 && fromTokenValue > 0 && toTokenValue > 0) {
          const fromTokenValueInDollar = this.amount * fromTokenValue;
          this.swapResult = (fromTokenValueInDollar / toTokenValue).toFixed(6);
        } else {
          this.swapResult = null;
        }
      },
      selectPercentage(percentage) {
        this.amount = (this.fromTokenBalance * percentage) / 100;
        this.calculatePotentialSwap();
      },
      swapTokens() {
        if (this.fromTokenBalance < this.amount) {
            alert(`Insufficient ${this.fromToken.toUpperCase()} balance.`);
            return;
        }

        // Update balances
        const newFromTokenAmount = this.fromTokenBalance - this.amount;
        const newToTokenAmount = this.toTokenBalance + parseFloat(this.swapResult);

        localStorage.setItem(`token_${this.fromToken}`, newFromTokenAmount);
        localStorage.setItem(`token_${this.toToken}`, newToTokenAmount);

        alert(`Swapped ${this.amount} ${this.fromToken.toUpperCase()} to ${this.swapResult} ${this.toToken.toUpperCase()}`);

        // Adjust cryptodollar values
        this.updateCryptodollarValues();

        // Reload the page after the swap
        window.location.reload();
        },

        updateCryptodollarValues() {
        // Get current cryptodollar values
        let fromTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.fromToken}`)) || 0;
        let toTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.toToken}`)) || 0;

        // Calculate the impact based on the amount swapped
        const impactFactor = this.amount / (this.amount + 100); // Arbitrary factor for illustration
        
        // Decrease the value of the sold token
        fromTokenValue = fromTokenValue * (1 - impactFactor);

        // Increase the value of the bought token
        toTokenValue = toTokenValue * (1 + impactFactor);

        // Store the updated values back to localStorage
        localStorage.setItem(`cryptodollar_value_${this.fromToken}`, fromTokenValue.toFixed(6));
        localStorage.setItem(`cryptodollar_value_${this.toToken}`, toTokenValue.toFixed(6));

        console.log(`Updated values - ${this.fromToken.toUpperCase()}: ${fromTokenValue}, ${this.toToken.toUpperCase()}: ${toTokenValue}`);
        }
    },
    mounted() {
      this.updateBalances();
    },
  };
  </script>
  
  <style scoped>
  .swap-box {
    border: 1px solid #ccc;
    padding: 16px;
    max-width: 400px;
    margin: auto;
  }
  
  .swap-interface {
    display: flex;
    flex-direction: column;
  }
  
  .swap-amount {
    margin: 16px 0;
  }
  
  .quick-select-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  
  .swap-result {
    margin-top: 20px;
    color: green;
    font-weight: bold;
  }
  </style>
  