<template>
    <div class="clicker-area" @dragover.prevent @drop="handleDrop">
      <h2>{{ areaName }} ({{ token }})</h2>
      <p>Clicks: {{ clicks }}</p>
      <p>Level: {{ level }}</p>
      <p>Click Power: {{ clickPower }}</p>
      <p>Heroes in this Area:</p>
      <div v-if="assignedHeroes.length > 0" class="heroes-in-area">
        <div v-for="(hero, index) in assignedHeroes" :key="index" class="hero-container">
          <img :src="hero.image" :alt="hero.name" class="hero-image" draggable="true" @dragstart="dragStart(hero)" />
          <p>{{ hero.name }}</p>
        </div>
      </div>
      <p v-if="assignedHeroes.length === 0">No heroes assigned</p>
      <p>Autoclicker Level: {{ autoClickerLevel }}</p>
      <p>Upgrade Click Power Cost: {{ upgradeCost(level) }} Clicks</p>
      <p>Upgrade Autoclicker Cost: {{ autoClickerCost(autoClickerLevel) }} Clicks</p>
      <button @click="mineManually">Mine !</button>
      <button @click="upgradeClickPower" :disabled="!canUpgradeClickPower">
        Upgrade Click Power (Cost: {{ upgradeCost(level) }} Clicks)
      </button>
      <button @click="upgradeAutoClicker" :disabled="!canUpgradeAutoClicker">
        Upgrade Autoclicker (Cost: {{ autoClickerCost(autoClickerLevel) }} Clicks)
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      areaIndex: String,
      areaName: String,
      token: String,
      initialClicks: Number,
      initialLevel: Number,
      initialClickPower: Number,
      initialAutoClickerLevel: Number,
      assignedHeroes: Array,
    },
    data() {
      return {
        clicks: this.initialClicks || 0,
        level: this.initialLevel || 1,
        clickPower: this.initialClickPower || 1,
        autoClickerLevel: this.initialAutoClickerLevel || 0,
      };
    },
    methods: {
      mineManually() {
        this.clicks += 1;
        this.saveState();
        this.mineTokens();
      },
      upgradeClickPower() {
        const cost = this.upgradeCost(this.level);
        if (this.clicks >= cost) {
          this.clicks -= cost;
          this.level++;
          this.clickPower = this.level;
          this.saveState();
        }
      },
      upgradeAutoClicker() {
        const cost = this.autoClickerCost(this.autoClickerLevel);
        if (this.clicks >= cost) {
          this.clicks -= cost;
          this.autoClickerLevel++;
          this.saveState();
          this.startAutoClicker();
        }
      },
      upgradeCost(level) {
        return level * (1000 * level);
      },
      autoClickerCost(level) {
        return 10 * (level * level);
      },
      startAutoClicker() {
        if (this.autoClickerInterval) clearInterval(this.autoClickerInterval);
  
        if (this.autoClickerLevel > 0) {
          this.autoClickerInterval = setInterval(() => {
            this.clicks += this.autoClickerLevel;
            this.saveState();
          }, 1000);
        }
      },
      handleDrop(event) {
        try {
          const heroData = event.dataTransfer.getData('heroData');
          if (!heroData) return;
  
          const hero = JSON.parse(heroData);
          this.$emit('assign-hero', hero, this.areaIndex);
        } catch (error) {
          console.error('Error during drop:', error);
        }
      },
      dragStart(hero) {
        event.dataTransfer.setData('heroData', JSON.stringify(hero));
      },
      saveState() {
        localStorage.setItem(`clicks_area_${this.areaIndex}`, this.clicks.toString());
        localStorage.setItem(`level_area_${this.areaIndex}`, this.level.toString());
        localStorage.setItem(`clickPower_area_${this.areaIndex}`, this.clickPower.toString());
        localStorage.setItem(`autoClickerLevel_area_${this.areaIndex}`, this.autoClickerLevel.toString());
      },
      mineTokens() {
        let tokenIndex = `token_${this.token}`;
        let currentAmount = parseFloat(localStorage.getItem(tokenIndex)) || 0;
        let minedAmount = Math.random() * (0.009 - 0.00001) + 0.00001;
        localStorage.setItem(tokenIndex, currentAmount + minedAmount);

        let tokenIndexTotal = `total_token_${this.token}`;
        let currentAmountTotal = parseFloat(localStorage.getItem(tokenIndexTotal)) || 0;
        localStorage.setItem(tokenIndexTotal, currentAmountTotal + minedAmount);
      },
    },
    computed: {
      canUpgradeClickPower() {
        return this.clicks >= this.upgradeCost(this.level);
      },
      canUpgradeAutoClicker() {
        return this.clicks >= this.autoClickerCost(this.autoClickerLevel);
      },
    },
  };
  </script>
  
  <style scoped>
  .clicker-area {
    margin: 20px;
    border: 1px solid #ddd;
    padding: 20px;
    display: inline-block;
    width: 200px;
    position: relative;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    margin: 5px;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .heroes-in-area {
    display: flex;
    flex-wrap: wrap;
  }
  
  .hero-container {
    text-align: center;
    margin: 5px;
  }
  
  .hero-image {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  </style>
  