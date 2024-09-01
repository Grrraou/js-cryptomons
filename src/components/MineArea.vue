<template>
  <div class="clicker-area" :style="backgroundStyle" @dragover.prevent @drop="handleDrop">
    <!-- Title and Logo Section -->
    <div class="title-section">
      <h2>{{ areaName }} ({{ token }})</h2>
      <img :src="getLogoPath(areaIndex)" alt="Bitcoin Mine Logo" class="logo-image" />
      <div class="logs"></div>
    </div>

    <!-- Statistics and Actions Section -->
    <div class="stats-actions-section">
      <p class="clicks-display">
        <span class="clicks-text">{{ clicks }}</span>
        <img src="@/assets/mines/clickCount.png" class="click-icon" />
      </p>
      <p class="level-display">
        <span class="level-text">{{ level }}</span>
        <img src="@/assets/mines/upgradeLevel.png" class="level-icon" />
      </p>
      <div class="action-container">
        <button class="mine-button" @click="mineManually($event)">
          <img src="@/assets/mines/miningButton.png" alt="Mine Logo" class="button-logo" />
          Mine!
        </button>
        <button  class="upgrade-button" @click="upgradeClickPower" :disabled="!canUpgrade">
          <img src="@/assets/mines/upgradeButton.png" alt="Mine Logo" class="button-logo" />
          Upgrade (Cost: {{ upgradeCost(level) }} {{ token }})
        </button>
      </div>
    </div>

    <!-- Workers Area Section -->
    <div class="workers-section">
      <p class="workers-heading">Workers in this Area:</p>
      <p v-if="assignedHeroes.length === 0" class="no-heroes">No workers assigned</p>
      <div v-if="assignedHeroes.length > 0" class="heroes-in-area">
        <div v-for="(hero, index) in assignedHeroes" :key="index" class="hero-container">
          <img :src="hero.image" :alt="hero.name" class="hero-image" draggable="true" @dragstart="dragStart(hero)" />
          <p class="hero-name">{{ hero.name }}</p>
        </div>
      </div>
    </div>
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
      getLogoPath(index) {
        try {
          return require(`@/assets/mines/${index}.png`);
        } catch (error) {
          // If the image doesn't exist, fall back to the default image
          return require('@/assets/mines/default.png');
        }
      },
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
        
        let x, y;

        if (event.clientX) {
          // Use event coordinates if available
          x = event.clientX;
          y = event.clientY;
          this.showFlyingText(minedAmount.toFixed(6), x, y);
        } else {
          // Use the component's coordinates
          this.showAreaLog(minedAmount.toFixed(6));
        }
        //if (this.$route.name === 'Mines' && x && y)
          //this.showFlyingText(minedAmount.toFixed(6), x, y);
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
      },
      showAreaLog(text) {
        if (this.$el) {
          const logsDiv = this.$el.querySelector('.logs');
          if (logsDiv) {
            // Create a new text node
            const textNode = document.createTextNode(text);

            // Create a new paragraph element and append the text node to it
            const newParagraph = document.createElement('p');
            newParagraph.style.fontSize = '24px';
            newParagraph.style.fontWeight = 'bold';
            newParagraph.style.color = 'green';
            newParagraph.style.opacity = '1'; // Start fully visible
            newParagraph.style.pointerEvents = 'none'; // Ensure it doesn't interfere with user interactions
            newParagraph.style.transition = 'transform 2s ease-out, opacity 2s ease-out'; // Smooth transition for both transform and opacity
            newParagraph.style.zIndex = '9999'; // Ensure it appears on top of other elements

            newParagraph.appendChild(textNode);

            // Append the new paragraph to the .logs div
            logsDiv.appendChild(newParagraph);

            // Automatically remove the element after the animation ends
            setTimeout(() => {
              if (newParagraph && newParagraph.parentElement) {
                newParagraph.parentElement.removeChild(newParagraph);
              }
            }, 800); // Match with the duration of the animation
          }
        } else {
          console.error('Element is not available');
          return { x: 0, y: 0 }; // Fallback values
        }
      },
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
      backgroundStyle() {
        let backgroundUrl;
        
        try {
          // Try to load the background image based on the areaIndex
          backgroundUrl = require(`@/assets/mines/${this.areaIndex}_bg.png`);
        } catch (error) {
          // If the specific background image isn't found, use the default background image
          backgroundUrl = require('@/assets/mines/default_mine_bg.png');
        }

        return {
          //backgroundImage: `url(${backgroundUrl})`,
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
  /* Main area wrapper */
  .clicker-area {
    margin: 0 auto 20px;
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
    margin-right: 10px;
    color: #ffffff; /* White text color */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Dark shadow for contrast */
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
    border-radius: 50%;
  }

  .logo-image {
    max-width: 80px;
    max-height: 80px;
    border: 3px solid #ffa500;
    border-radius: 50%;
    margin-top: 10px;
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

  .click-icon, .level-icon {
    width: 40px;
    height: auto;
    transition: transform 0.3s ease;
  }

  .clicks-display:hover .click-icon, .level-display:hover .level-icon {
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
  </style>
  