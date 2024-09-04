<template>
    <h1 class="page-title">BattleFields</h1>
    <div class="battle-page game-container">
        
      <div class="battlefields-container">
        <div v-for="(battle, index) in battleData" :key="battle.id" class="battlefield-block" :style="backgroundStyle">
          <BattleField
            :battle="battle"
            :currentCreatures="currentCreatures[index]"
            :heroes="getHeroesForBattle(index)"
            @creature-click="damageCreature"
            @hero-dropped="assignHeroToBattle"
            @remove-hero="removeHeroFromBattle"
            :battleIndex="index"
          />
        </div>
      </div>
      <HeroList
        class="hero-list"
        :heroes="availableHeroes"
        @remove-hero="removeHero"
      />
    </div>
  </template>
  
  <script>
  import BattleField from '@/components/BattleField.vue';
  import HeroList from '@/components/HeroList.vue';
  import { getBattleData, generateCreature } from '@/services/BattleService.js';
  import { heroes as initialHeroes } from '@/services/HeroService.js'; // Correct import
  import BattleManager from '@/services/BattleManager.js';
  
  export default {
    components: {
      BattleField,
      HeroList,
    },
    data() {
      return {
        battleData: [],
        heroes: initialHeroes,
        currentCreatures: [],
      };
    },
    computed: {
      availableHeroes() {
        return this.heroes.filter(hero => hero.assignedArea === null);
      },
        backgroundStyle() {
        let backgroundUrl;
        
        try {
            console.log(this.battleIndex);
          // Try to load the background image based on the areaIndex
          backgroundUrl = require(`@/assets/battlefields/${this.battleIndex}_bg.png`);
        } catch (error) {
          // If the specific background image isn't found, use the default background image
          backgroundUrl = require('@/assets/battlefields/defaultBG.png');
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
    created() {
      this.battleData = getBattleData();
      BattleManager.init(this.battleData, this.loadCreaturesFromStorage());
      this.currentCreatures = BattleManager.currentCreatures;
    },
    methods: {
      loadCreaturesFromStorage() {
        const storedCreatures = JSON.parse(localStorage.getItem('currentCreatures'));
        if (storedCreatures && storedCreatures.length === this.battleData.length) {
          return storedCreatures;
        } else {
          return this.battleData.map(() => generateCreature());
        }
      },
      damageCreature(battleIndex, amount) {
        BattleManager.damageCreature(battleIndex, amount);
      },
      getHeroesForBattle(battleIndex) {
        return this.heroes.filter(hero => hero.assignedArea === battleIndex);
      },
      removeHero(hero) {
        const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
        if (heroIndex !== -1) {
          this.heroes[heroIndex].assignedArea = null;
        }
      },
      assignHeroToBattle(hero, battleIndex) {
        this.removeHero(hero);
        const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
        if (heroIndex !== -1) {
          this.heroes[heroIndex].assignedArea = battleIndex;
        }
      },
      removeHeroFromBattle(hero) {
        this.removeHero(hero);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your existing styles */
  </style>
  

  <style scoped>
.page-title {
  position: relative;
  font-size: 28px; /* Slightly larger font size for emphasis */
  font-weight: bold;
  color: #444; /* Keep the white color for contrast */
  text-align: center;
  top: 0;
  margin-bottom: 20px; /* Increase the bottom margin for better spacing */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6); /* Softer, larger shadow for depth */
  background-color: transparent; /* Remove background color to avoid button-like appearance */
  padding: 0; /* Remove padding to avoid button-like appearance */
  border-radius: 0; /* Remove border radius to make it more like a title */
  letter-spacing: 1px; /* Slight letter spacing for elegance */
  text-transform: uppercase; /* Uppercase letters for a more formal look */
  border-bottom: 2px solid #ffa500; /* Add a subtle underline for emphasis */
}

  .battle-page {
    display: flex;
    justify-content: space-between;
  }
  
  .battlefields-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px; /* Space between each battlefield block */
  }

  .battlefield-block {
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
    color: #ffffff; /* White text color */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Dark shadow for contrast */
  }

  
  .hero-list {
    width: 200px; /* Fixed width for the hero list */
    max-height: 80vh;
    overflow-y: auto;
  }
  </style>
  