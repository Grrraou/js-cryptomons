<template>
    <div class="battlefieldContainer">
        <div class="battle-name">
            <h2>{{ battle.name }}</h2>
        </div>
        <div class="battle-field">
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
    </div>
  </template>
  
  <script>
  import eventBus from '@/eventBus.js';
  import { items } from '@/services/ItemService';
  
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
        let manualDamageAmount = 1;
        const playerEquipement = JSON.parse(localStorage.getItem('playerEquipement')) || {};
        const weapon = playerEquipement.Weapon;
        if (weapon) {
          const weaponObject = items.find(item => item.index === weapon.index)
          manualDamageAmount += weaponObject.effect();
        }

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
    .battlefieldContainer {
        width: 100%;
    }


  .battle-field {
    display: flex;
    gap: 10px;
  }
  
  .battle-name {
    font-size: 18px;
    text-align: center;
    color: #444;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7); /* Dark shadow for contrast */
  }
  
  .monster-area {
    background-color: #ffe6e6;
    border: 3px solid #9c1616;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)), 
              url('@/assets/battlefields/mobsWidgetBG.png') center/cover no-repeat;
  }

  .monster-area p {
    color: #444;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7); /* Dark shadow for contrast */
  }
  
  .monster-portrait {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 33%;
    margin-bottom: 10px;
    border: 3px solid #ffa500;
  }
  
  .heroes-area {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #444;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7); /* Dark shadow for contrast */
  }
  
  .heroes-grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
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
  
  .hero-image {
    width: 80px;
    height: 80px;
    text-align: center;
    cursor: grab;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 3px solid #ffa500;
    cursor: grab;
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
  