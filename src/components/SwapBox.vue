<template>
  <div class="swap-box">
    <h2>Crypto Swap</h2>
    <div class="swap-interface">
      <!-- From Token -->
      <label for="from-token">From:</label>
      <v-select
        v-model="fromToken"
        :options="filteredTokensFrom"
        @input="updateBalances"
        :reduce="token => token"
        :get-option-label="getOptionLabel"
        placeholder="Select or search token"
      >
        <template #option="option">
          <div class="option-content">
            <img :src="getTokenLogo(option.index)" alt="Token Logo" class="token-logo" />
            <span class="option-label">{{ getTokenLabel(option) }}</span>
          </div>
        </template>
        <template #single-label="props">
          <div class="option-content">
            <img :src="getTokenLogo(props.option.index)" alt="Token Logo" class="token-logo" />
            <span class="option-label">{{ getTokenLabel(props.option) }}</span>
          </div>
        </template>
      </v-select>

      <!-- To Token -->
      <label for="to-token">To:</label>
      <v-select
        v-model="toToken"
        :options="filteredTokensTo"
        @input="updateBalances"
        :reduce="token => token"
        :get-option-label="getOptionLabel"
        placeholder="Select or search token"
      >
        <template #option="option">
          <div class="option-content">
            <img :src="getTokenLogo(option.index)" alt="Token Logo" class="token-logo" />
            <span class="option-label">{{ getTokenLabel(option) }}</span>
          </div>
        </template>
        <template #single-label="props">
          <div class="option-content">
            <img :src="getTokenLogo(props.option.index)" alt="Token Logo" class="token-logo" />
            <span class="option-label">{{ getTokenLabel(props.option) }}</span>
          </div>
        </template>
      </v-select>

      <!-- Swap Amount -->
      <div class="swap-amount">
        <input 
          v-model="amount" 
          type="number" 
          placeholder="Amount" 
          class="amount-input" 
        />
        <div class="quick-select-buttons">
          <button @click="selectPercentage(25)">25%</button>
          <button @click="selectPercentage(50)">50%</button>
          <button @click="selectPercentage(75)">75%</button>
          <button @click="selectPercentage(100)">100%</button>
        </div>
      </div>

      <!-- Swap Button -->
      <button class="swap-button" @click="swapTokens">
        <img src="@/assets/swap/swapButton.png" alt="Swap Logo" class="button-logo" />
        Swap!
      </button>
    </div>

    <!-- Swap Result -->
    <div v-if="swapResult" class="swap-result">
      <p>You will receive approximately:<br>{{ swapResult }} <img :src="require(`@/assets/tokens/${toToken.index}.png`)" class="token-icon">{{ toToken.index.toUpperCase() }}</p>
    </div>

  </div>
</template>

<script>
import vSelect from 'vue3-select';
import { tokens } from '../services/TokenService';

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      fromToken: tokens[0],
      toToken: tokens[1],
      amount: 0,
      tokens,
      swapResult: null,
      fromTokenBalance: 0,
      toTokenBalance: 0,
    };
  },
  computed: {
    filteredTokensFrom() {
      return this.tokens
        .filter(token => token.index !== this.toToken.index)
        .sort((a, b) => this.getTokenBalance(b.index) - this.getTokenBalance(a.index));
    },
    filteredTokensTo() {
      return this.tokens
        .filter(token => token.index !== this.fromToken.index)
        .sort((a, b) => this.getTokenBalance(b.index) - this.getTokenBalance(a.index));
    },
  },
  methods: {
    getOptionLabel(token) {
      return `${token.name} (${token.index.toUpperCase()})`;
    },
    getTokenLabel(token) {
      const balance = this.getTokenBalance(token.index);
      return `${token.name} (${token.index.toUpperCase()}) - Balance: ${balance}`;
    },
    getTokenLogo(tokenIndex) {
      try {
        return require(`@/assets/tokens/${tokenIndex}.png`);
      } catch (error) {
        return require('@/assets/tokens/default.png');
      }
    },
    updateBalances() {
      this.fromTokenBalance = parseFloat(localStorage.getItem(`token_${this.fromToken.index}`)) || 0;
      this.toTokenBalance = parseFloat(localStorage.getItem(`token_${this.toToken.index}`)) || 0;
      this.calculatePotentialSwap();
    },
    getTokenBalance(tokenIndex) {
      return parseFloat(localStorage.getItem(`token_${tokenIndex}`)) || 0;
    },
    calculatePotentialSwap() {
      const fromTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.fromToken.index}`)) || 0;
      const toTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.toToken.index}`)) || 0;

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
        alert(`Insufficient ${this.fromToken.index.toUpperCase()} balance.`);
        return;
      }

      const swapSound = new Audio(require('@/assets/sounds/swap.wav'));
      swapSound.volume = 1;
      swapSound.play().then(() => {
        alert(`Swapped ${this.amount} ${this.fromToken.index.toUpperCase()} to ${this.swapResult} ${this.toToken.index.toUpperCase()}`);

        const newFromTokenAmount = this.fromTokenBalance - this.amount;
        const newToTokenAmount = this.toTokenBalance + parseFloat(this.swapResult);

        localStorage.setItem(`token_${this.fromToken.index}`, newFromTokenAmount);
        localStorage.setItem(`token_${this.toToken.index}`, newToTokenAmount);

        this.updateCryptodollarValues();

        window.location.reload();
      });
    },
    updateCryptodollarValues() {
      let fromTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.fromToken.index}`)) || 0;
      let toTokenValue = parseFloat(localStorage.getItem(`cryptodollar_value_${this.toToken.index}`)) || 0;

      const impactFactor = this.amount / (this.amount + 10);

      fromTokenValue = fromTokenValue * (1 - impactFactor);
      toTokenValue = toTokenValue * (1 + impactFactor);

      if (this.fromToken.index !== 'cryptodollar') {
        localStorage.setItem(`cryptodollar_value_${this.fromToken.index}`, fromTokenValue.toFixed(6));
      }
      if (this.toToken.index !== 'cryptodollar') {
        localStorage.setItem(`cryptodollar_value_${this.toToken.index}`, toTokenValue.toFixed(6));
      }
    },
  },
  mounted() {
    this.updateBalances();
  },
};
</script>

<style scoped>
.token-icon {
  width: 16px;
  height: auto;
  transition: transform 0.3s ease;
}
.option-content {
  display: flex;
  align-items: center;
}

.token-logo {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.amount-input {
  width: 94%;
  padding: 10px;
  border: 2px solid #ffa500;
  border-radius: 8px;
  font-size: 1.2em;
  color: #444;
  background-color: #fdfdfd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.amount-input:focus {
  border-color: #ff8c00;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  outline: none;
}


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
  background-blend-mode: lighten;
  font-size: 1.3em;
  font-weight: bold;
  color: #444;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  width: 500px;
}

.swap-interface {
  display: flex;
  flex-direction: column;
  width: 100%;
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
  background-color: #ffa500;
  border: 2px solid #444;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.swap-button:hover {
  background-color: #ff8c00;
  transform: translateY(-2px);
}

.button-logo {
  width: 50px;
  height: 50px;
  margin-right: 8px;
}
</style>
