<template>
  <div class="clicker-game">
    <h1>Clicker Game with Heroes and Clicker Areas</h1>

    <!-- MenuWindow Component -->
    <MenuWindow @reset-stats="resetStoredStats" />

    <div class="game-container">
      <!-- Left side: Clicker Areas -->
      <div class="areas-container">
        <div class="row" v-for="rowIndex in rowCount" :key="rowIndex">
          <div class="area-wrapper" v-for="index in getAreasForRow(rowIndex)" :key="index">
            <ClickerArea
              :areaIndex="index - 1"
              :initialClicks="getStoredValue(`clicks_area_${index - 1}`, 0)"
              :initialLevel="getStoredValue(`level_area_${index - 1}`, 1)"
              :initialClickPower="getStoredValue(`clickPower_area_${index - 1}`, 1)"
              :initialAutoClickerLevel="getStoredValue(`autoClickerLevel_area_${index - 1}`, 0)"
              :assignedHeroes="getHeroesForArea(index - 1)"
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
import ClickerArea from './ClickerArea.vue';
import HeroList from './HeroList.vue';
import MenuWindow from './MenuWindow.vue';

export default {
  components: {
    ClickerArea,
    HeroList,
    MenuWindow,
  },
  data() {
    return {
      areaCount: 5, // Number of clicker areas
      heroes: [
        { name: 'Hero 1', image: require('@/assets/hero1.png'), boostPower: 2, assignedArea: null },
        { name: 'Hero 2', image: require('@/assets/hero2.png'), boostPower: 3, assignedArea: null },
        { name: 'Hero 3', image: require('@/assets/hero3.png'), boostPower: 5, assignedArea: null },
      ],
      areasPerRow: 3, // Adjust this to set the number of areas per row
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
      const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
      if (heroIndex !== -1) {
        this.heroes[heroIndex].assignedArea = areaIndex;
      }
    },
    removeHero(hero) {
      const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
      if (heroIndex !== -1) {
        this.heroes[heroIndex].assignedArea = null;
      }
    },
    getAreasForRow(rowIndex) {
      const startIndex = (rowIndex - 1) * this.areasPerRow + 1;
      const endIndex = Math.min(rowIndex * this.areasPerRow, this.areaCount);
      const areaIndices = [];
      for (let i = startIndex; i <= endIndex; i++) {
        areaIndices.push(i);
      }
      return areaIndices;
    },
    resetStoredStats() {
      for (let i = 0; i < this.areaCount; i++) {
        localStorage.removeItem(`clicks_area_${i}`);
        localStorage.removeItem(`level_area_${i}`);
        localStorage.removeItem(`clickPower_area_${i}`);
        localStorage.removeItem(`autoClickerLevel_area_${i}`);
      }

      this.heroes.forEach(hero => {
        hero.assignedArea = null;
      });

      window.location.reload();
    },
  },
};
</script>

<style scoped>
.clicker-game {
  text-align: center;
  margin-top: 50px;
}

.game-container {
  display: flex;
  justify-content: space-between;
}

.areas-container {
  flex: 1;
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
