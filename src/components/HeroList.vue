<template>
  <div class="hero-list-wrapper">
    <h2 class="hero-list-title">Workers</h2>
    <div class="hero-container" @dragover.prevent @drop="handleHeroDrop">
      <div class="hero-list-container">
        <div v-if="availableHeroes.length > 0" class="hero-grid">
          <div
            class="hero"
            v-for="(hero, index) in availableHeroes"
            :key="index"
            draggable="true"
            @dragstart="dragStart(hero)"
          >
            <img :src="hero.image" :alt="hero.name" class="hero-image" />
            <p class="hero-name">{{ hero.name }}</p>
          </div>
        </div>
        <p v-else class="no-heroes">No heroes available</p>
      </div>
    </div>
  </div>
</template>




  
<script>
export default {
  props: {
    heroes: Array,
  },
  computed: {
    availableHeroes() {
      return this.heroes.filter(hero => hero.assignedArea === null);
    },
  },
  methods: {
    dragStart(hero) {
      event.dataTransfer.setData('heroData', JSON.stringify(hero));
    },
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
  margin-top: 30px; /* Add some margin to account for the title */
}

.hero-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}

.hero-image {
  width: 80px;
  height: 80px;
  border-radius: 50%; /* Circular hero image */
  margin-bottom: 10px;
  border: 3px solid #ffa500; /* Border around hero image */
}

.hero-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.no-heroes {
  font-size: 18px;
  color: #bbb;
  margin-top: 20px;
}
</style>
  