<template>
  <div class="clicker-area" :style="backgroundStyle" @dragover.prevent @drop="handleDrop">
    <!-- Title and Logo Section -->
    <div class="title-section">
      <h3 class="mine-name">{{ mine.name }}</h3>
      <img :src="MineManager.getMineLogo(mine.index)" alt="Bitcoin Mine Logo" class="logo-image" />
      <div class="logs"></div>
    </div>

    <!-- Statistics and Actions Section -->
  
    <div class="stats-actions-section">
      <div class="statsBox">
        <p class="clicks-display statDisplay">
          <span class="clicks-text">{{ clicks }}</span>
          <img src="@/assets/mines/clickCount.png" class="click-icon" />
        </p>
        <p class="level-display statDisplay">
          <span class="level-text">{{ level }}</span>
          <img src="@/assets/mines/upgradeLevel.png" class="level-icon" />
        </p>
        <p class="token-balance-display statDisplay">
          <span class="token-balance-text">{{ tokenBalance.toFixed(6) }}</span>
          <img :src="TokenManager.getTokenIcon(mine.token)" class="token-icon" />
        </p>
      </div>
      
      <div class="action-container">
        <button class="mine-button" @click="MineManager.mineTokens($event, mine.index, this)">
          <img src="@/assets/mines/miningButton.png" alt="Mine Logo" class="button-logo" />
          Mine!
        </button>
        <button  class="upgrade-button" @click="MineManager.upgrade(mine.index, this)" :disabled="!MineManager.canUpgrade(mine.index)">
          <img src="@/assets/mines/upgradeButton.png" alt="Mine Logo" class="button-logo" />
          Upgrade (Cost: {{ MineManager.getUpgradeCost(mine.index) }} {{ mine.token }})
        </button>
      </div>
    </div>

    <!-- Workers Area Section -->
    <div class="workers-section">
      <p class="workers-heading">Workers in this Area:</p>
      <p v-if="assignedHeroes.length === 0" class="no-heroes">No workers assigned</p>
      <div v-if="assignedHeroes.length > 0" class="heroes-in-area">
        <div v-for="(hero, index) in assignedHeroes" :key="index" class="hero-container">
          <img :src="HeroManager.getHeroPicture(hero.index)" :alt="hero.name" class="hero-image" draggable="true" @dragstart="dragStart(hero)" />
          <p class="hero-name">{{ hero.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


  
<script>
  import eventBus from '@/eventBus.js';
  import HeroManager from '@/services/HeroManager';
  import TokenManager from '@/services/TokenManager';
  import MineManager from '@/services/MineManager';
  import StorageManager from '@/services/StorageManager';

  export default {
    props: {
      mine: Object,
      assignedHeroes: Array,
    },
    data() {
      return {
        tokenBalance: TokenManager.getBalance(this.mine.token), 
        clicks: MineManager.getClicks(this.mine.index),
        level: MineManager.getUpgradeLevel(this.mine.index),
      };
    },
    setup() {
      return {
        HeroManager,
        TokenManager,
        MineManager,
        StorageManager,
      };
    },
    methods: {
      startAutoClicker(heroCount) {  
        if (this.autoClickerInterval) 
          clearInterval(this.autoClickerInterval);
        
        if (heroCount > 0) {
          this.autoClickerInterval = setInterval(() => {
            MineManager.mineTokens(null, this.mine.index, this);
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
          this.$emit('assign-hero', hero, this.mine.index);
        } catch (error) {
          console.error('Error during drop:', error);
        }
      },
      dragStart(hero) {
        event.dataTransfer.setData('heroData', JSON.stringify(hero));
      },
      updateTokenBalance() {
        
      },
    },
    mounted() {
    // Listen for the custom event from the global event bus
    eventBus.on('trigger-start-auto-clicker', ({ mineIndex, heroCount }) => {
      if (mineIndex === this.mine.index) {
        this.startAutoClicker(heroCount);
      }
    });

     // Listen for the potion effect to double mining power
     eventBus.on('manual-mining-boost', ({ multiplier, duration }) => {
      this.miningMultiplier = multiplier;

      // Reset the multiplier back to 1 after the duration expires
      setTimeout(() => {
        this.miningMultiplier = 1;
      }, duration);
    });
  },
  beforeUnmount() {
    // Clean up the event listener when the component is destroyed
    eventBus.off('trigger-start-auto-clicker');
  },
    computed: {
      backgroundStyle() {
        let backgroundUrl = MineManager.getBackgroundImage(this.mine.index);

        return {
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
              url(${backgroundUrl}) center/cover no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .mine-name {
    color: #444;
    margin-right: 15px;
  }
  /* Main area wrapper */
  .clicker-area {
    margin: 10px auto;
    padding: 20px;
    width: 90%;
    border: 4px solid #ffa500;
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
    color: #ffffff; /* White text color */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Dark shadow for contrast */
  }

  .clicker-area:hover {
    border: 4px solid #5EC15E;
  }

  

  /* Title and logo section */
  .title-section {
    display: flex;
    align-items: center; /* Vertically align items */
    justify-content: center; /* Horizontally center items */
    text-align: center;
    margin-bottom: 15px;
  }

  .title-section h2 {
    margin: 0 10px; /* Space between the title and the logo */
  }

  .title-section img {
    max-width: 80px;
    max-height: 80px;
    border: 3px solid #ffa500;
    border-radius: 33%;
  }

  .logo-image {
    max-width: 80px;
    max-height: 80px;
    border: 3px solid #ffa500;
    border-radius: 50%;
    margin-top: 10px;
  }

  .statsBox {
    display: flex;
  }

  .statDisplay {
    margin: 0 15px !important;
  }

  .logs {
    padding: 0 20px;
    float: right;
  }

  /* Statistics and actions section */
  .stats-actions-section {
    text-align: center;
    margin-bottom: 15px;
  }

  .clicks-display, .level-display {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    margin: 10px 0;
    color: #333;
  }

  .clicks-text, .level-text {
    font-size: 1.3em;
    font-weight: bold;
    margin-right: 10px;
  }

  .click-icon, .level-icon, .token-icon {
    width: 40px;
    height: auto;
    transition: transform 0.3s ease;
  }

  .clicks-display:hover .click-icon, .level-display:hover .level-icon, .token-balance-display:hover .token-icon {
    transform: scale(2);
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

  .action-container {
    display: flex;
  }

  .mine-button, .upgrade-button {
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

  .mine-button:hover, .upgrade-button:hover {
    background-color: #ff8c00; /* Darker orange on hover */
    transform: translateY(-2px); /* Slight lift on hover */
  }

  .mine-button:active, .upgrade-button:active {
    background-color: #e07a00; /* Even darker on click */
    transform: translateY(0); /* Reset transform on click */
  }

  .button-logo {
    width: 50px; /* Adjust size as needed */
    height: 50px; /* Adjust size as needed */
    margin-right: 8px; /* Space between logo and text */
  }

  .mine-button img {
    pointer-events: none; /* Ensure the image doesn't interfere with button click */
  }

  /* Workers section */
  .workers-section {
    width: 100%;
  }

  .workers-heading {
    font-size: 1.5em;
    font-weight: bold;
    color: #444;
    margin-bottom: 10px;
    text-align: center;
    background-color: rgba(255, 165, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
    border: 2px dashed #444;
  }

  .no-heroes {
    font-size: 1.2em;
    color: #888;
    text-align: center;
    margin-bottom: 20px;
    padding: 10px;
    background-color: rgba(240, 240, 240, 0.8);
    border-radius: 10px;
    border: 2px dashed #444;
  }

  .heroes-in-area {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    background-image: url('@/assets/mines/workingBG.png');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .hero-container {
    text-align: center;
    margin: 10px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hero-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .hero-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 5px;
    border: 2px solid #ffa500;
  }

  .hero-name {
    font-size: 1.1em;
    color: #333;
    font-weight: bold;
  }

  .token-balance-display {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  margin: 10px 0;
  color: #333;
}

.token-balance-text {
  font-size: 1.3em;
  font-weight: bold;
  margin-right: 10px;
}

.token-icon {
  width: 30px;
  height: auto;
}

  </style>
  