<template>
    <div class="clicker-area" @dragover.prevent @drop="handleDrop">
      <h2>{{ areaName }} ({{ token }})</h2>
      <p>Clicks: {{ clicks }}</p>
      <p>Level: {{ level }}</p>
      <p>Heroes in this Area:</p>
      <div v-if="assignedHeroes.length > 0" class="heroes-in-area">
        <div v-for="(hero, index) in assignedHeroes" :key="index" class="hero-container">
          <img :src="hero.image" :alt="hero.name" class="hero-image" draggable="true" @dragstart="dragStart(hero)" />
          <p>{{ hero.name }}</p>
        </div>
      </div>
      <p v-if="assignedHeroes.length === 0">No heroes assigned</p>
      <button @click="mineManually($event)">Mine !</button>
      <button @click="upgradeClickPower" :disabled="!canUpgrade">
        Upgrade (Cost: {{ upgradeCost(level) }} {{ token }})
      </button>
    </div>
  </template>
  
  <script>
  import eventBus from '@/eventBus.js';

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
        autoClickerLevel: this.initialAutoClickerLevel || 1,
      };
    },
    methods: {
      mineManually(event) {
        this.clicks += 1;
        this.saveState();
        this.mineTokens(event);
      },
      mineAutomatically(event) {
        this.mineTokens(event);
      },
      upgradeClickPower() {
        const cost = this.upgradeCost(this.level);
        const storedAmmount = localStorage.getItem(`token_${this.token}`);
        if (storedAmmount >= cost) {
          const newAmount = storedAmmount - cost;
          localStorage.setItem(`token_${this.token}`, newAmount);
          this.level++;
          this.saveState();
        }
      },
      upgradeCost(level) {
        return level * (10 * level);
      },
      startAutoClicker(heroCount) {  
        if (this.autoClickerInterval) 
          clearInterval(this.autoClickerInterval);
        
        if (heroCount > 0) {
          this.autoClickerInterval = setInterval(() => {
            this.mineAutomatically(heroCount);
          }, 1000);
        } else {
          clearInterval(this.autoClickerInterval);
          this.autoClickerInterval = null; // Reset the interval variable
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
      mineTokens(event) {
        let tokenIndex = `token_${this.token}`;
        let currentAmount = parseFloat(localStorage.getItem(tokenIndex)) || 0;
        let minedAmount = (Math.random() * (this.level + 1) * (0.0009 - 0.000001) + 0.000001);
        localStorage.setItem(tokenIndex, currentAmount + minedAmount);

        let tokenIndexTotal = `total_token_${this.token}`;
        let currentAmountTotal = parseFloat(localStorage.getItem(tokenIndexTotal)) || 0;
        localStorage.setItem(tokenIndexTotal, currentAmountTotal + minedAmount);

        this.showFlyingText(minedAmount.toFixed(6), event.clientX, event.clientY);
      },
      showFlyingText(amount, x, y) {
        const textElement = document.createElement('div');
        textElement.innerText = `+${amount}`;
        
        // Apply initial styles directly with JavaScript
        textElement.style.position = 'fixed';
        textElement.style.left = `${x}px`;
        textElement.style.top = `${y}px`;
        textElement.style.fontSize = '24px';
        textElement.style.fontWeight = 'bold';
        textElement.style.color = 'green';
        textElement.style.opacity = '1'; // Start fully visible
        textElement.style.pointerEvents = 'none'; // Ensure it doesn't interfere with user interactions
        textElement.style.transition = 'transform 2s ease-out, opacity 2s ease-out'; // Smooth transition for both transform and opacity
        textElement.style.zIndex = '9999'; // Ensure it appears on top of other elements

        // Append the element to the document body
        document.body.appendChild(textElement);

        // Force a reflow to ensure the initial styles are applied before starting the animation
        textElement.offsetHeight; // Trigger a reflow

        // Apply the transformation to move the text up and fade it out
        textElement.style.transform = 'translateY(-50px)';
        textElement.style.opacity = '0';

        // Automatically remove the element after the animation ends
        setTimeout(() => {
          if (textElement && textElement.parentElement) {
            textElement.parentElement.removeChild(textElement);
          }
        }, 2000); // Match with the duration of the animation
      }
    },
    mounted() {
    // Listen for the custom event from the global event bus
    eventBus.on('trigger-start-auto-clicker', ({ areaIndex, heroCount }) => {
      if (areaIndex === this.areaIndex) {
        this.startAutoClicker(heroCount);
      }
    });
  },
  beforeUnmount() {
    // Clean up the event listener when the component is destroyed
    eventBus.off('trigger-start-auto-clicker');
  },
    computed: {
      canUpgrade() {
        let stored = localStorage.getItem(`token_${this.token}`);
        return stored >= this.upgradeCost(this.level);
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
  