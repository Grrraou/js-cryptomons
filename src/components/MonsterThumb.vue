<template>
    <div class="monsterThumb">
      <img v-if="localMonster"
                :src="MonsterManager.getMonsterPortrait(localMonster.index)"
                :alt="monster.name"
                class="monster-portrait" />
      <p v-if="localMonster">{{ monster.name }} (HP: {{ localMonster.health }})</p>
      <p v-else>No monster</p>
    </div>
</template>

<script>
import BattleManager from '@/managers/BattleManager';
import MonsterManager from '@/managers/MonsterManager';

export default {
    props: {
      monster: Object,
      battlefield: Object,
    },
    data() {
      return {
        localMonster: MonsterManager.getCurrentMonster(this.battlefield.index),
      };
    },
    setup() {
      return {
        BattleManager,
        MonsterManager,
      };
    },
    mounted() {
      MonsterManager.UIrefs[this.battlefield.index] = this;
    },
    methods: {
      
  },
};
</script>

<style scoped>
.monster-area p {
    color: #444;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
  }
  
  .monster-portrait {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 33%;
    margin-bottom: 10px;
    border: 3px solid #ffa500;
  }
</style>