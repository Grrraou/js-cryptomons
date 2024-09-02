<template>
    <div class="battle-field">
      <div class="battle-name">
        <h2>{{ battle.name }}</h2>
      </div>
  
      <div class="monster-area" @click="creatureClicked">
        <img v-if="localCreature"
             :src="localCreature.portrait"
             :alt="localCreature.name"
             class="monster-portrait" />
        <p v-if="localCreature">{{ localCreature.name }} (HP: {{ localCreature.health }})</p>
        <p v-else>No monster</p>
      </div>
  
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
        <div class="drop-area" @drop="onDrop" @dragover.prevent>
          Drop heroes here to assign
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import eventBus from '@/eventBus.js';
  
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
    data() {
      return {
        localCreature: { ...this.currentCreatures }
      };
    },
    methods: {
      creatureClicked() {
        const manualDamageAmount = 10;
        this.$emit('creature-click', this.battleIndex, manualDamageAmount);
      },
      onDrop(event) {
        const heroData = event.dataTransfer.getData('heroData');
        if (heroData) {
          const hero = JSON.parse(heroData);
          this.$emit('hero-dropped', hero, this.battleIndex);
        }
      },
      dragStart(hero) {
        event.dataTransfer.setData('heroData', JSON.stringify(hero));
      },
      removeHeroFromBattle(hero) {
        this.$emit('remove-hero', hero);
      },
      updateCreature({ battleIndex, creature }) {
        if (this.battleIndex === battleIndex) {
          this.localCreature = { ...creature };
        }
      }
    },
    mounted() {
      eventBus.on('monster-updated', this.updateCreature);
    },
    beforeUnmount() {
      eventBus.off('monster-updated', this.updateCreature);
    }
  };
  </script>
  
  <style scoped>
  /* Your existing styles */
  </style>
  

  <style scoped>
  .battle-field {
    display: flex;
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
  