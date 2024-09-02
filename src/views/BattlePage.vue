<template>
    <h1 class="page-title">Achievements</h1>
    <div class="battle-page game-container">
      <div class="battlefields-container">
        <!-- Render each BattleField as a block -->
        <div v-for="(battle, index) in battleData" :key="battle.id" class="battlefield-block">
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
  
      <!-- HeroList component -->
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
  import { heroes as initialHeroes } from '@/services/HeroService.js';
  
  export default {
    components: {
      BattleField,
      HeroList,
    },
    data() {
      return {
        battleData: [], // Battle data
        heroes: initialHeroes, // All heroes
        currentCreatures: [], // Creatures on each battlefield
      };
    },
    computed: {
      availableHeroes() {
        return this.heroes.filter(hero => hero.assignedArea === null);
      }
    },
    created() {
      this.battleData = getBattleData(); // Initialize battle data
      this.currentCreatures = this.initializeCreatures(); // Initialize creatures
      this.startAutoDamage(); // Start auto-damage mechanism
    },
    beforeUnmount() { // Use beforeUnmount instead of beforeDestroy
      clearInterval(this.autoDamageInterval); // Clear interval on component unmount
    },
    methods: {
      initializeCreatures() {
        return this.battleData.map(() => generateCreature());
      },
      damageCreature(battleIndex, amount) {
        const creature = this.currentCreatures[battleIndex];

        // Ensure creature exists and health is a valid number
        if (creature && typeof creature.health === 'number' && !isNaN(creature.health)) {
        creature.health -= amount; // Subtract damage amount

        // Check if health falls below or equals zero
        if (creature.health <= 0) {
            this.currentCreatures[battleIndex] = generateCreature(); // Replace with a new creature
        }
        } else {
        console.error(`Invalid health value for creature at battlefield ${battleIndex}:`, creature);
        // Optionally reinitialize the creature if the health is invalid
        this.currentCreatures[battleIndex] = generateCreature();
        }
      },
      removeHero(hero) {
        const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
        if (heroIndex !== -1) {
          this.heroes[heroIndex].assignedArea = null;
        }
      },
      assignHeroToBattle(hero, battleIndex) {
        this.removeHero(hero); // Remove the hero from any previous assignment
        const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
        if (heroIndex !== -1) {
          this.heroes[heroIndex].assignedArea = battleIndex; // Assign to the correct battlefield
        }
      },
      removeHeroFromBattle(hero) {
        this.removeHero(hero);
      },
      getHeroesForBattle(battleIndex) {
        return this.heroes.filter(hero => hero.assignedArea === battleIndex);
      },
      startAutoDamage() {
        this.autoDamageInterval = setInterval(() => {
          this.battleData.forEach((battle, index) => {
            const assignedHeroes = this.getHeroesForBattle(index);
            if (assignedHeroes.length > 0) {
              const damage = assignedHeroes.length * 10; // Each hero does 10 damage per tick
              this.damageCreature(index, damage);
            }
          });
        }, 1000); // Damage every second
      },
    },
  };
  </script>
  
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
  