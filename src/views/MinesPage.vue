<template>
  <div class="clicker-game">
    <div class="game-container">
      <!-- Left side: Clicker Areas -->
      <div class="areas-container">
        <h1 class="page-title">Mines</h1>

        <div class="areas-grid">
          <div class="area-wrapper" v-for="area in areas" :key="area.index">
            <MineArea
              ref="mineArea"
              :areaIndex="area.index"
              :areaName="area.name"
              :token="area.token"
              :initialClicks="getStoredValue(`clicks_area_${area.index}`, 0)"
              :initialLevel="getStoredValue(`level_area_${area.index}`, 1)"
              :initialClickPower="getStoredValue(`clickPower_area_${area.index}`, 1)"
              :initialAutoClickerLevel="getStoredValue(`autoClickerLevel_area_${area.index}`, 0)"
              :assignedHeroes="getHeroesForArea(area.index)"
              @assign-hero="assignHero"
              @remove-hero="removeHero"
            />
          </div>
        </div>
      </div>


      <!-- Right side: Hero List -->
      <HeroList class="hero-list" :heroes="heroes" @remove-hero="removeHero" />
    </div>
  </div>
</template>

<script>
import MineArea from '@/components/MineArea.vue';
import HeroList from '@/components/HeroList.vue';
import { mines } from '@/services/MineService.js';
import { heroes } from '@/services/HeroService.js';
import eventBus from '@/eventBus.js';

export default {
  components: {
    MineArea,
    HeroList,
  },
  data() {
    return {
      areas: mines,
      heroes: heroes,
    };
  },
  computed: {
    rowCount() {
      return Math.ceil(this.areaCount / this.areasPerRow); // Calculate the number of rows based on the areas
    },
  },
  methods: {
    getStoredValue(key, defaultValue) {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? parseInt(storedValue, 10) : defaultValue;
    },
    getHeroesForArea(areaIndex) {
      return this.heroes.filter(hero => hero.assignedArea === areaIndex);
    },
    assignHero(hero, areaIndex) {
      this.removeHero(hero);
      const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
      if (heroIndex !== -1) {
        this.heroes[heroIndex].assignedArea = areaIndex;

        // Calculate the updated number of assigned heroes
        const updatedHeroCount = this.getHeroesForArea(areaIndex).length;

        // Emit the event with the updated hero count
        eventBus.emit('trigger-start-auto-clicker', { areaIndex, heroCount: updatedHeroCount });
      }
    },
    removeHero(hero) {
      const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
      if (heroIndex !== -1) {
        const areaIndex = this.heroes[heroIndex].assignedArea;
        this.heroes[heroIndex].assignedArea = null;

        if (areaIndex !== null) {
          // Calculate the updated number of assigned heroes after removal
          const updatedHeroCount = this.getHeroesForArea(areaIndex).length;

          // Emit the event with the updated hero count
          eventBus.emit('trigger-start-auto-clicker', { areaIndex, heroCount: updatedHeroCount });
        }
      }
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

.clicker-game {
  text-align: center;
  margin-top: 50px;
}

.game-container {
  display: flex;
  justify-content: space-between;
}

.areas-container {
  width: 100%;
  padding: 20px;
}



.row {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.area-wrapper {
  flex-basis: 30%;
}

.hero-list {
  flex-basis: 20%;
  margin-left: 20px;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
