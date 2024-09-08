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
  
        <button class="swap-button" @click="swapTokens">
          <img src="@/assets/swap/swapButton.png" alt="Swap Logo" class="button-logo" />
          Swap !
        </button>
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
        if (this.amount <= 0) {
          alert(`Can't swap 0.`);
            return;
        }
        if (this.fromTokenBalance < this.amount) {
            alert(`Insufficient ${this.fromToken.toUpperCase()} balance.`);
            return;
        }

        const swapSound = new Audio(require('@/assets/sounds/swap.wav'));
        swapSound.volume = 1;
        swapSound.play().then(() => {
          // Once the sound has started playing, you can show the alert
          alert(`Swapped ${this.amount} ${this.fromToken.toUpperCase()} to ${this.swapResult} ${this.toToken.toUpperCase()}`);

          // Update balances
          const newFromTokenAmount = this.fromTokenBalance - this.amount;
          const newToTokenAmount = this.toTokenBalance + parseFloat(this.swapResult);

          localStorage.setItem(`token_${this.fromToken}`, newFromTokenAmount);
          localStorage.setItem(`token_${this.toToken}`, newToTokenAmount);
          // Adjust cryptodollar values
          this.updateCryptodollarValues();

          // Reload the page after the swap
          window.location.reload();
        }).catch((error) => {
          console.error('Error playing sound:', error);
          // Show the alert anyway if there's an error playing the sound
          alert(`Swapped ${this.amount} ${this.fromToken.toUpperCase()} to ${this.swapResult} ${this.toToken.toUpperCase()}`);
        });

        
        },

        updateCryptodollarValues() {
        // Get current cryptodollar values
        let fromTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.fromToken}`)) || 0;
        let toTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.toToken}`)) || 0;

        // Calculate the impact based on the amount swapped
        const impactFactor = this.amount / (this.amount + 10); // Arbitrary factor for illustration
        
        // Decrease the value of the sold token
        fromTokenValue = fromTokenValue * (1 - impactFactor);

        // Increase the value of the bought token
        toTokenValue = toTokenValue * (1 + impactFactor);

        // Store the updated values back to localStorage
        if (this.fromToken !== "cryptodollar") {
          localStorage.setItem(`cryptodollar_value_${this.fromToken}`, fromTokenValue.toFixed(6));
        }
        if (this.toToken !== "cryptodollar") {
          localStorage.setItem(`cryptodollar_value_${this.toToken}`, toTokenValue.toFixed(6));
        }

        }
    },
    mounted() {
      this.updateBalances();
    },
  };
  </script>
  
  <style scoped>

  .swap-box {
    margin: 10px auto;
    padding: 20px;
    border: 2px solid #ffa500;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-blend-mode: 'lighten';
    font-size: 1.3em;
    font-weight: bold;
    color: #444; /* White text color */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Dark shadow for contrast */
    width: 500px;
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

  .swap-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    background-color: #ffa500; /* Orange background */
    border: 2px solid #444;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .swap-button:hover, .upgrade-button:hover {
    background-color: #ff8c00; /* Darker orange on hover */
    transform: translateY(-2px); /* Slight lift on hover */
  }

  .button-logo {
    width: 50px; /* Adjust size as needed */
    height: 50px; /* Adjust size as needed */
    margin-right: 8px; /* Space between logo and text */
  }
  </style>
  