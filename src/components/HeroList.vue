<template>
  <div class="hero-list-wrapper">

    <div class="hero-container" @dragover.prevent @drop="handleHeroDrop">
      <div class="hero-list-container">
        <div v-if="heroes.length > 0" class="hero-grid">
          <HeroThumb
            class="hero"
            v-for="(hero, index) in heroes"
            :key="index"
            :hero="hero"
            draggable="true"
          />
            <!-- <img :src="getHeroPicture(hero.index)" :alt="hero.name" class="hero-image" />
            <p class="hero-name">{{ hero.name }}</p> -->
          </div>
        <p v-else class="no-heroes">No heroes available</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeroManager from '@/services/HeroManager';
import HeroThumb from './HeroThumb.vue';
import eventBus from '@/eventBus';


export default {
  components: {
    HeroThumb,
  },
  data() {
    return {
      heroes: HeroManager.getAvailableHeroes(),
    };
  },
  computed: {

  },
  methods: {
    handleHeroDrop(event) {
      try {
        const heroData = event.dataTransfer.getData('heroData');
        if (!heroData) return; // No valid data passed
        console.log('heroDrop')
        const hero = JSON.parse(heroData);
        this.$emit('remove-hero', hero); // Notify parent to remove hero from the area
        this.heroes = HeroManager.getAvailableHeroes();
      } catch (error) {
        console.error('Error parsing hero data on drop to hero list:', error);
      }
    },
/*     removeHero(hero) {
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
    }, */
  },
  mounted() {
    // Listen for the custom event from the global event bus
    eventBus.on('assign-hero', ({ hero, areaIndex }) => {
      console.log(`${hero.index} assigned to ${areaIndex}`);
      this.heroes = HeroManager.getAvailableHeroes();
    })
  },
};
</script>

  
<style scoped>
.hero-list-wrapper {
  position: relative;
  max-width: 300px;
  margin: 0 auto; /* Center the hero list */
  scrollbar-width: none;
}

.hero-list-title {
  position: fixed;
  font-size: 15px; /* Slightly larger font size for emphasis */
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
  border-bottom: 2px solid #444; /* Add a subtle underline for emphasis */
}


.hero-container {
  text-align: center;
  padding: 20px;
  position: fixed;
  background-image: url('@/assets/mines/workersMenuBG.png'); /* Background image */
  background-size: cover;
  background-position: center;
  scrollbar-width: none;
  background-repeat: no-repeat;
  border: 2px solid #444; /* Border around the hero list */
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  height: calc(80vh); /* Full height minus the space for the title */
  overflow-y: auto; /* Scroll if the content exceeds the height */
  margin-top: 50px; /* Add some margin to account for the title */
}

.hero-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-heroes {
  font-size: 18px;
  color: #bbb;
  margin-top: 20px;
}
</style>
  