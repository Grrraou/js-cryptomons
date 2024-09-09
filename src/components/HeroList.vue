<template>
  <div class="hero-list-wrapper">

    <div class="hero-container" @dragover.prevent @drop="handleHeroDrop">
      <div class="hero-list-container">
        <div v-if="availableHeroes.length > 0" class="hero-grid">
          <HeroThumb
            class="hero"
            v-for="(hero, index) in availableHeroes"
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
import HeroThumb from './HeroThumb.vue';


export default {
  components: {
    HeroThumb,
  },
  props: {
    heroes: Array,
  },
  computed: {
    availableHeroes() {
      const unlockedHeroes = this.heroes.filter(hero => {
        // Check if the mine has a requirement
        if (hero.requirement) {
          // Check if the required goal is unlocked in localStorage
          return localStorage.getItem(`goal_${hero.requirement}_unlocked`) === 'true';
        }
        // If no requirement, always show the area
        return true;
      });
      //console.log(unlockedHeroes);
      return unlockedHeroes.filter(hero => hero.assignedArea === null);
    },
  },
  methods: {
    handleHeroDrop(event) {
      try {
        const heroData = event.dataTransfer.getData('heroData');
        if (!heroData) return; // No valid data passed

        const hero = JSON.parse(heroData);
        this.$emit('remove-hero', hero); // Notify parent to remove hero from the area
      } catch (error) {
        console.error('Error parsing hero data on drop to hero list:', error);
      }
    },
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
  