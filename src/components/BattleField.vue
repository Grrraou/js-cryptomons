<template>
    <div class="battlefieldContainer">
        <div class="battle-name">
            <h2>{{ battlefield.name }}</h2>
        </div>
        <div class="battle-field" :id="battlefieldId">
        <MonsterThumb 
          class="monster-area" 
          @click="attackMonster"
          :localMonster="localMonster"
          :battlefield="battlefield"
          :monster="MonsterManager.getMonster(localMonster.index)"
        />
        <div class="heroes-area" @drop="handleHeroDrop" @dragover.prevent>
            <h3>Assigned Heroes</h3>
            <div class="heroes-grid">
            <HeroThumb
                v-for="hero in heroes"
                :key="hero.name"
                :hero="hero"
                class="hero"
            />
            </div>
            <div class="drop-area">
            Drop heroes here to assign
            </div>
        </div>
        </div>
    </div>
  </template>
  
<script>
import HeroThumb from '@/components/HeroThumb.vue';
import MonsterThumb from './MonsterThumb.vue';
import BattleManager from '@/managers/BattleManager';
import MonsterManager from '@/managers/MonsterManager';
import HeroManager from '@/managers/HeroManager';
import eventBus from '@/eventBus';
import ItemManager from '@/managers/ItemManager';
  
export default {
    components: {
      HeroThumb,
      MonsterThumb,
    },
    props: {
      battlefield: {
        type: Object,
        required: true,
      },
      currentCreatures: {
        type: Object,
        required: false,
      },
    },
    setup() {
      return {
        BattleManager,
        MonsterManager,
      }
    },
    data() {
      return {
        localMonster: MonsterManager.getCurrentMonster(this.battlefield.index),
        heroes: HeroManager.getHeroesByArea(this.battlefield.index),
      };
    },
    computed: {
      battlefieldId() {
        return `battlefield-${this.battlefield.index}`;
      }
    },
    methods: {
      handleHeroDrop(event) {
        const heroData = event.dataTransfer.getData('heroData');
        if (!heroData) return;
        const hero = JSON.parse(heroData);
        HeroManager.moveHero(hero.index, this.battlefield.index);
      },
      attackMonster(event) {
        let manualDamageAmount = 1;
        const weapon = ItemManager.getEquipedItem('Weapon');
        if (weapon) {
          manualDamageAmount += weapon.effect();
        }
        BattleManager.damageCreature(this.localMonster.battlefieldIndex, manualDamageAmount, null, event);
        this.localMonster = MonsterManager.getCurrentMonster(this.battlefield.index);
      }
    },
    mounted() {
      eventBus.on('hero-moved', () => {
        this.heroes = HeroManager.getHeroesByArea(this.battlefield.index);
      });
    },
    beforeUnmount() {
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
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
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
  
  .heroes-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    color: #444;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
  }
  
  .heroes-grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
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
  