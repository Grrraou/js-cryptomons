<template>
    <div class="hero-list" @dragover.prevent @drop="handleHeroDrop">
      <div class="hero-list-container">
        <h2>Heroes</h2>
        <div v-if="availableHeroes.length > 0">
          <div
            class="hero"
            v-for="(hero, index) in availableHeroes"
            :key="index"
            draggable="true"
            @dragstart="dragStart(hero)"
          >
            <img :src="hero.image" :alt="hero.name" class="hero-image" />
            <p>{{ hero.name }}</p>
          </div>
        </div>
        <p v-else>No heroes available</p>
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
  .hero-list {
    text-align: center;
    padding: 10px;
    overflow-y: auto;
  }

  .hero-list-container {
    position: fixed;
    height: 100vh;
  }
  
  .hero {
    display: inline-block;
    margin: 10px;
    text-align: center;
    cursor: pointer;
  }
  
  .hero-image {
    width: 100px;
    height: 100px;
  }
  </style>
  