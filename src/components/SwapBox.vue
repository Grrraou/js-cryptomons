<template>
  <div class="swap-box">
    <h2>Crypto Swap</h2>
    <div class="swap-interface">
      <!-- From Token -->
      <label for="from-token">From:</label>
      <v-select
        v-model="fromToken"
        :options="filteredTokensFrom"
        :reduce="token => token"
        :get-option-label="getOptionLabel"
        placeholder="Select or search token"
      >
        <template #option="option">
          <div class="option-content">
            <img :src="TokenManager.getTokenIcon(option.index)" alt="Token Logo" class="token-logo" />
            <span class="option-label">{{ getTokenLabel(option) }}</span>
          </div>
        </template>
        <template #single-label="props">
          <div class="option-content">
            <img :src="TokenManager.getTokenIcon(props.option.index)" alt="Token Logo" class="token-logo" />
            <span class="option-label">{{ getTokenLabel(props.option) }}</span>
          </div>
        </template>
      </v-select>

      <!-- Swap Button (Switch From and To Tokens) -->
      <div class="swap-tokens-button-container">
        <button class="swap-tokens-button" @click="switchTokens">
          <img src="@/assets/swap/swapButton.png" alt="Switch Tokens" class="swap-icon" />
        </button>
      </div>

      <!-- To Token -->
      <label for="to-token">To:</label>
      <v-select
        v-model="toToken"
        :options="filteredTokensTo"
        :reduce="token => token"
        :get-option-label="getOptionLabel"
        placeholder="Select or search token"
      >
        <template #option="option">
          <div class="option-content">
            <img :src="TokenManager.getTokenIcon(option.index)" alt="Token Logo" class="token-logo" />
            <span class="option-label">{{ getTokenLabel(option) }}</span>
          </div>
        </template>
        <template #single-label="props">
          <div class="option-content">
            <img :src="TokenManager.getTokenIcon(props.option.index)" alt="Token Logo" class="token-logo" />
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
      <p><span style="color: #444;">You will receive approximately:</span><br>{{ swapResult }} <img :src="require(`@/assets/tokens/${toToken.index}.png`)" class="token-icon"></p>
    </div>
    <div v-else class="swap-result">
      <p><img :src="TokenManager.getTokenIcon(fromToken.index)" class="token-icon"> = {{ TokenManager.getTokenPrice(fromToken.index) }}<img :src="TokenManager.getTokenIcon('cryptodollar')" class="token-icon"></p>
      <p><img :src="TokenManager.getTokenIcon(toToken.index)" class="token-icon"> = {{ TokenManager.getTokenPrice(toToken.index) }}<img :src="TokenManager.getTokenIcon('cryptodollar')" class="token-icon"></p>
    </div>
  </div>
</template>


<script>
import vSelect from 'vue3-select';
import TokenManager from '@/managers/TokenManager';

export default {
  components: {
    vSelect,
  },
  setup() {
      return {
        TokenManager,
      };
    },
  data() {
    return {
      fromToken: TokenManager.getTokens()[1],
      toToken: TokenManager.getTokens()[0],
      amount: 0,
      tokens: TokenManager.getTokens(),
      swapResult: null,
      fromTokenBalance: 0,
      toTokenBalance: 0,
    };
  },
  computed: {
    filteredTokensFrom() {
      return this.tokens
        .filter(token => token.index !== this.toToken.index)
        .sort((a, b) => TokenManager.getBalance(b.index) - TokenManager.getBalance(a.index));
    },
    filteredTokensTo() {
      return this.tokens
        .filter(token => token.index !== this.fromToken.index)
        .sort((a, b) => TokenManager.getBalance(b.index) - TokenManager.getBalance(a.index));
    },
  },
  watch: {
    fromToken() {
      this.updateBalances();
    },
    toToken() {
      this.updateBalances();
    }
  },
  methods: {
    getOptionLabel(token) {
      return `${token.name} (${token.index.toUpperCase()})`;
    },
    getTokenLabel(token) {
      const balance = TokenManager.getBalance(token.index);
      return `${token.name} (${token.index.toUpperCase()}) - Balance: ${balance}`;
    },
    updateBalances() {
      this.fromTokenBalance = TokenManager.getBalance(this.fromToken.index) || 0;
      this.toTokenBalance = TokenManager.getBalance(this.toToken.index) || 0;
      this.calculatePotentialSwap();
    },
    switchTokens() {
      const tempToken = this.fromToken;
      this.fromToken = this.toToken;
      this.toToken = tempToken;

      this.updateBalances();
    },
    updateCryptodollarValues() {
      let fromTokenValue = TokenManager.getTokenPrice(this.fromToken.index);
      let toTokenValue = TokenManager.getTokenPrice(this.toToken.index);

      const impactFactor = this.amount / (this.amount + 10);
      fromTokenValue = fromTokenValue * (1 - impactFactor);
      toTokenValue = toTokenValue * (1 + impactFactor);

      if (this.fromToken.index !== 'cryptodollar') {
        TokenManager.updateTokenPrice(this.fromToken.index, fromTokenValue);
      }
      if (this.toToken.index !== 'cryptodollar') {
        TokenManager.updateTokenPrice(this.toToken.index, toTokenValue);
      }
    },
    calculatePotentialSwap() {
      const fromTokenValue = TokenManager.getTokenPrice(this.fromToken.index);
      const toTokenValue = TokenManager.getTokenPrice(this.toToken.index);

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

        TokenManager.removeToBalance(this.fromToken.index, this.amount);
        TokenManager.addToBalance(this.toToken.index, parseFloat(this.swapResult));
        this.updateCryptodollarValues();
        window.location.reload();
      });
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

.swap-tokens-button-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.swap-tokens-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.swap-icon {
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease;
}

.swap-tokens-button:hover .swap-icon {
  transform: rotate(180deg);
}
</style>
