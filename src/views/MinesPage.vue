<template>
  <div class="clicker-game">
    <div class="game-container">
      <!-- Left side: Clicker Areas -->
      <div class="areas-container">
        <h1 class="page-title">Mines <InfoBubble /></h1>

        <div class="areas-grid">
          <div class="area-wrapper" v-for="mine in mines" :key="mine.index">
            <MineArea
              ref="mineArea"
              :mine="mine"
              :assignedHeroes="getHeroesForArea(mine.index)"
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
import MineManager from '@/services/MineManager';
import MineArea from '@/components/MineArea.vue';
import HeroList from '@/components/HeroList.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import eventBus from '@/eventBus.js';
import HeroManager from '@/services/HeroManager';

export default {
  components: {
    MineArea,
    HeroList,
    InfoBubble,
  },
  data() {
    return {
      mines: MineManager.getFilteredList(),
      heroes: HeroManager.getHeroes(),
    };
  },
  computed: {
  },
  methods: {
    getHeroesForArea(areaIndex) {
      return this.heroes.filter(hero => hero.assignedArea === areaIndex);
    },
    assignHero(hero, mineIndex) {
      this.removeHero(hero);
      const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
      if (heroIndex !== -1) {
        this.heroes[heroIndex].assignedArea = mineIndex;

        // Calculate the updated number of assigned heroes
        const updatedHeroCount = this.getHeroesForArea(mineIndex).length;
        this.heroes = HeroManager.getHeroes();

        // Emit the event with the updated hero count
        eventBus.emit('trigger-start-auto-clicker', { mineIndex, heroCount: updatedHeroCount });
        const areaIndex = mineIndex;
        eventBus.emit('assign-hero', ({ hero, areaIndex }));
      }
    },
    removeHero(hero) {
      const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
      if (heroIndex !== -1) {
        const mineIndex = this.heroes[heroIndex].assignedArea;
        this.heroes[heroIndex].assignedArea = null;

        if (mineIndex !== null) {
          // Calculate the updated number of assigned heroes after removal
          const updatedHeroCount = this.getHeroesForArea(mineIndex).length;

          // Emit the event with the updated hero count
          eventBus.emit('trigger-start-auto-clicker', { mineIndex, heroCount: updatedHeroCount });
        }
      }
    },
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
}
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
  display:flex;
    justify-content: center;
    align-items: center;
}

.clicker-game {
  text-align: center;
}

.areas-container {
  width: 100%;
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
