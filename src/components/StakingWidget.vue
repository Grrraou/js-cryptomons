<template>
    <div class="staking-widget">
      <h3>{{ staking.name }} Staking</h3>
      <p><strong>Staked Amount:</strong> {{ stakedAmount }} {{ staking.token.toUpperCase() }}</p>
      <p><strong>Stored Amount:</strong> {{ storedAmount }} {{ staking.token.toUpperCase() }}</p>
      <p><strong>APR:</strong> {{ staking.apr * 100 }}%</p>
      <p><strong>Gain per Round:</strong> {{ gainPerRound.toFixed(6) }} {{ staking.token.toUpperCase() }}</p>
      <input type="number" v-model.number="stakeInput" placeholder="Enter amount to stake" />
      <div class="convenience-buttons">
        <button @click="setStakePercentage(25)">Stake 25%</button>
        <button @click="setStakePercentage(50)">Stake 50%</button>
        <button @click="setStakePercentage(75)">Stake 75%</button>
        <button @click="setStakePercentage(100)">Stake 100%</button>
      </div>
      <button @click="stakeTokens">Stake</button>
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
    },
    methods: {
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
        }, 10000); // Update every 10 seconds
      },
    },
    mounted() {
      this.loadAmounts();
      this.startEarnings(); // Start generating earnings
      this.updateInterval = setInterval(this.updateDisplay, 1000); // Update display every second
    },
    beforeUnmount() {
      clearInterval(this.updateInterval); // Clear the display interval
      clearInterval(this.intervalId); // Clear the earnings interval
    },
  };
  </script>
  
  <style scoped>
  .staking-widget {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #f9f9f9;
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
  