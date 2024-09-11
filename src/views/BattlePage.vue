<template>
    <h1 class="page-title">BattleFields</h1>
    <div class="battle-page game-container">
        
      <div class="battlefields-container">
        <div v-for="(battle, index) in battleData" :key="battle.index" class="battlefield-block" :style="getBackgroundStyle(index)">
          <BattleField
            :battle="battle"
            :currentCreatures="MonsterManager.getCurrentMonster(battle.index)"
            :heroes="getHeroesForBattle(battle.index)"
            @hero-dropped="assignHeroToBattle"
            @remove-hero="removeHeroFromBattle"
          />
        </div>
      </div>
      <HeroList
        class="hero-list"
        :heroes="HeroManager.getAvailableHeroes()"
        @remove-hero="removeHero"
      />
    </div>
</template>
  
<script>
import BattleField from '@/components/BattleField.vue';
import HeroList from '@/components/HeroList.vue';
import eventBus from '@/eventBus';
import BattleManager from '@/managers/BattleManager.js';
import GoalManager from '@/managers/GoalManager';
import HeroManager from '@/managers/HeroManager';
import MonsterManager from '@/managers/MonsterManager';
  
  export default {
    components: {
      BattleField,
      HeroList,
    },
    data() {
      return {
        battleData: [],
        heroes: HeroManager.getAvailableHeroes(),
      };
    },
    setup() {
      return {
        BattleManager,
        HeroManager,
        MonsterManager,
      };
    },
    computed: {
    },
    created() {
      this.battleData = BattleManager.getBattlefields().filter(battlefield => {
        if (battlefield.requirement) {
          return GoalManager.isGoalReached(`goal_${battlefield.requirement}_unlocked`);
        }
        return true;
      });
    },
    methods: {
      getHeroesForBattle(battleIndex) {
        return this.heroes.filter(hero => hero.assignedArea === battleIndex);
      },
      removeHero(hero) {
        const heroIndex = this.heroes.findIndex(h => h.name === hero.name);

        if (heroIndex !== -1) {
          this.heroes[heroIndex].assignedArea = null;
        }
      },
      assignHeroToBattle(hero, battleIndex) {
        this.removeHero(hero);
        const heroIndex = this.heroes.findIndex(h => h.name === hero.name);
        if (heroIndex !== -1) {
          this.heroes[heroIndex].assignedArea = battleIndex;
          const areaIndex = battleIndex;
          eventBus.emit('assign-hero', ({ hero, areaIndex }));
        }
      },
      removeHeroFromBattle(hero) {
        this.removeHero(hero);
      },
      getBackgroundStyle(battlefieldIndex) {
        let backgroundUrl = BattleManager.getBackgroundImage(battlefieldIndex);
        return {
            background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
                url(${backgroundUrl}) center/cover no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };
      },
    },
  };
</script>
  
<style scoped>
.page-title {
  position: relative;
  font-size: 28px;
  font-weight: bold;
  color: #444;
  text-align: center;
  top: 0;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 2px solid #ffa500;
}

  .battle-page {
    display: flex;
    justify-content: space-between;
  }
  
  .battlefields-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
  }

  .battlefield-block {
    margin: 10px auto;
    padding: 20px;
    width: 90%;
    border: 2px solid #ffa500;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-blend-mode: 'lighten';
    font-size: 1.3em;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }

  
  .hero-list {
    width: 200px;
    max-height: 80vh;
    overflow-y: auto;
  }
  </style>
  