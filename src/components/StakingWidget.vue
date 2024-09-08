<template>
  <div class="staking-widget" :style="backgroundStyle">
    <h3>{{ staking.name }} Staking</h3>
    <p><strong>Staked Amount:</strong> {{ stakedAmount }} <img :src="getTokenIcon(staking.token)" class="token-icon" :title="staking.token"></p>
    <p><strong>Stored Amount:</strong> {{ storedAmount }} <img :src="getTokenIcon(staking.token)" class="token-icon" :title="staking.token"></p>
    <p><strong>APR:</strong> {{ staking.apr * 100 }}%</p>
    <p><strong>Gain per Round:</strong> {{ gainPerRound.toFixed(6) }} <img :src="getTokenIcon(staking.token)" class="token-icon" :title="staking.token"></p>
    <input type="number" v-model.number="stakeInput" placeholder="Enter amount to stake" />
    <div class="convenience-buttons">
      <button @click="setStakePercentage(25)">Stake 25%</button>
      <button @click="setStakePercentage(50)">Stake 50%</button>
      <button @click="setStakePercentage(75)">Stake 75%</button>
      <button @click="setStakePercentage(100)">Stake 100%</button>
    </div>
    <button @click="stakeTokens" class="staking-button">Stake</button>
  </div>
</template>

<script>
export default {
  name: 'StakingWidget',
  props: {
    staking: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      stakedAmount: 0,
      storedAmount: 0,
      stakeInput: 0,
      intervalId: null, // Store the interval ID for clearing
    };
  },
  computed: {
    stakedKey() {
      return `staked_${this.staking.token}`;
    },
    storedKey() {
      return `token_${this.staking.token}`;
    },
    gainPerRound() {
      return this.stakedAmount * parseFloat(this.staking.apr) / 3600; // Gain per 10-second interval
    },
    backgroundStyle() {
      let backgroundUrl;

      try {
        // Try to load the background image based on the areaIndex
        backgroundUrl = require(`@/assets/staking/${this.staking.index}_bg.png`);
      } catch (error) {
        // If the specific background image isn't found, use the default background image
        backgroundUrl = require('@/assets/staking/default_staking_bg.png');
      }

      return {
        background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
            url(${backgroundUrl}) center/cover no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
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
    loadAmounts() {
      this.stakedAmount = parseFloat(localStorage.getItem(this.stakedKey)) || 0;
      this.storedAmount = parseFloat(localStorage.getItem(this.storedKey)) || 0;
    },
    stakeTokens() {
      if (this.stakeInput > 0) {
        const currentStoredAmount = parseFloat(localStorage.getItem(this.storedKey)) || 0;

        if (currentStoredAmount >= this.stakeInput) {
          this.storedAmount = currentStoredAmount - this.stakeInput;
          localStorage.setItem(this.storedKey, this.storedAmount.toFixed(6));

          this.stakedAmount += this.stakeInput;
          localStorage.setItem(this.stakedKey, this.stakedAmount.toFixed(6));

          this.stakeInput = 0;
        } else {
          alert("Not enough tokens to stake");
        }
      }
    },
    setStakePercentage(percentage) {
      this.stakeInput = (this.storedAmount * percentage) / 100;
    },
    updateDisplay() {
      this.loadAmounts(); // Load updated amounts from localStorage
    },
    startEarnings() {
      this.intervalId = setInterval(() => {
        const increment = this.gainPerRound;
        if (increment > 0) {
          this.storedAmount += increment;
          localStorage.setItem(this.storedKey, this.storedAmount.toFixed(6));
        }
        this.updateDisplay(); // Update display every 10 seconds (along with earnings)
      }, 10000); // Update every 10 seconds
    },
  },
  mounted() {
    this.loadAmounts();
    this.startEarnings(); // Start generating earnings
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // Clear the earnings interval
  },
};
</script>

<style scoped>
  .staking-button {
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
  .staking-button:hover {
    background-color: #ff8c00; /* Darker orange on hover */
    transform: translateY(-2px); /* Slight lift on hover */
  }
.token-icon {
    width: 16px;
    height: auto;
    transition: transform 0.3s ease;
  }
.staking-widget {
  margin: 10px auto;
  padding: 20px;
  width: 90%;
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
  color: #444;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.staking-widget:hover {
  border: 6px solid #ffa500;
}

.staking-widget h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

.staking-widget p {
  font-size: 16px;
  margin: 5px 0;
}

.staking-widget input {
  margin-top: 10px;
  padding: 5px;
  width: 100%;
}

.staking-widget button {
  margin-top: 10px;
  padding: 5px 10px;
}

.convenience-buttons button {
  margin-right: 5px;
}
</style>
