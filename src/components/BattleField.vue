<template>
    <div class="battle-field">
      <!-- Battlefield Name -->
      <div class="battle-name">
        <h2>{{ battle.name }}</h2>
      </div>
  
      <!-- Monster Area -->
      <div class="monster-area" @click="creatureClicked">
        <img v-if="currentCreatures"
             :src="currentCreatures.portrait"
             :alt="currentCreatures.name"
             class="monster-portrait" />
        <p v-if="currentCreatures">{{ currentCreatures.name }} (HP: {{ currentCreatures.health }})</p>
        <p v-else>No monster</p>
      </div>
  
      <!-- Assigned Heroes -->
      <div class="heroes-area">
        <h3>Assigned Heroes</h3>
        <div class="heroes-grid">
          <div
            v-for="hero in heroes"
            :key="hero.name"
            class="hero"
            draggable="true"
            @dragstart="dragStart(hero)"
            @dragend="removeHeroFromBattle(hero)"
          >
            <img :src="hero.image" :alt="hero.name" class="hero-image" />
            <p>{{ hero.name }}</p>
          </div>
        </div>
      </div>
  
      <!-- Drop Zone -->
      <div class="drop-area" @drop="onDrop" @dragover.prevent>
        Drop heroes here to assign
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      battle: {
        type: Object,
        required: true,
      },
      currentCreatures: {
        type: Object,
        required: false,
      },
      heroes: {
        type: Array,
        required: true,
      },
      battleIndex: { 
        type: Number, 
        required: true 
      },
    },
    methods: {
        creatureClicked() {
        const manualDamageAmount = 10; // Define a fixed amount of damage for manual hits
        this.$emit('creature-click', this.battleIndex, manualDamageAmount); // Pass the amount along with the battle index
        },
      onDrop(event) {
        const heroData = event.dataTransfer.getData('heroData');
        if (heroData) {
          const hero = JSON.parse(heroData);
          this.$emit('hero-dropped', hero, this.battleIndex); // Use battleIndex
        }
      },
      dragStart(hero) {
        event.dataTransfer.setData('heroData', JSON.stringify(hero));
      },
      removeHeroFromBattle(hero) {
        this.$emit('remove-hero', hero);
      }
    },
  };
  </script>
  
  <style scoped>
  .battle-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .battle-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .monster-area {
    background-color: #ffe6e6;
    border: 1px solid #ff9999;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
  
  .monster-portrait {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .heroes-area {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .heroes-grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .hero {
    width: 60px;
    text-align: center;
    cursor: grab;
  }
  
  .hero-image {
    width: 100%;
    border-radius: 50%;
  }
  
  .drop-area {
    background-color: #d3d3d3;
    border: 2px dashed #aaa;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  