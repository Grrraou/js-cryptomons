import eventBus from '@/eventBus.js';
import HeroManager from '@/managers/HeroManager';
import { useToast } from 'vue-toastification';
import ItemManager from '@/managers/ItemManager';
import { battlefieldsEnum } from '@/enums/BattleEnum.js';
import { monstersEnum } from '@/enums/MonsterEnum';
import StorageManager from '@/managers/StorageManager';
import AudioManager from './AudioManager';

class BattleManager {
  constructor() {
    this.battlefields = battlefieldsEnum;
    this.monsters = monstersEnum;
    this.monstersAssetPath = require.context('@/assets/monsters', false, /\.png$/);
    this.battlefieldsAssetPath = require.context('@/assets/battlefields', false, /\.png$/);
    this.currentMonsters = [];
    this.heroAttackInterval = null;
    this.attackSounds = [
      'slash.ogg',
      'slash2.wav',
      'slash3.wav',
      'slash4.wav',
    ];
  }

  getMonsters() {
    return this.monsters;
  }

  getMonster(monsterIndex) {
    return this.getMonsters().find(monster => monster.index === monsterIndex);
  }

  getBattlefields() {
    return this.battlefields;
  }

  initCurrentMonsters() {
    this.currentMonsters = this.getCurrentMonsters() || this.battlefields.map((battlefield) => this.generateMonsters(battlefield.index));
    this.updateCurrentMonsters();
    this.startAutoBattle();
  }

  generateMonsters(battlefieldIndex) {
    const randomIndex = Math.floor(Math.random() * this.getMonsters().length);
    const selectedMonster = this.getMonsters()[randomIndex];

    return {
      index: selectedMonster.index,
      health: selectedMonster.power * 100,
      battlefieldIndex: battlefieldIndex,
    };
  }

  getCurrentMonsters() {
    return StorageManager.getArray("battlefield_current_monsters");
  }

  updateCurrentMonsters() {
    StorageManager.update("battlefield_current_monsters", JSON.stringify(this.currentMonsters));
  }

  startAutoBattle() {
    if (this.heroAttackInterval) clearInterval(this.heroAttackInterval);

    this.heroAttackInterval = setInterval(() => {
      this.handleHeroAttacks();
      this.checkAndRespawnMonsters();
      this.updateCurrentMonsters();
    }, 1000);
  }

  handleHeroAttacks() {
    this.battlefields.forEach((battle, battleFieldIndex) => {
      const assignedHeroes = HeroManager.getHeroesByArea(battleFieldIndex);
      let heroesDamage = 1;
      const chest = ItemManager.getEquipedItem('Chest');
      if (chest) {
          heroesDamage += chest.effect();
      }
      if (assignedHeroes.length > 0) {
          const damage = assignedHeroes.length * heroesDamage;
          this.damageCreature(battleFieldIndex, damage);
      }
    });
  }

  checkAndRespawnMonsters() {
    if (!this.currentMonsters) {
      console.error('currentMonsters is not initialized');
      return;
    }

    this.currentMonsters.forEach((creature, index) => {
      if (!creature || creature.health <= 0) {
        this.currentMonsters[index] = this.generateMonsters();
        eventBus.emit('monster-updated', { battleIndex: index, creature: this.currentMonsters[index] });
      }
    });
  }

  damageCreature(index, amount) {
    if (window.location.pathname === '/battle') {
      AudioManager.playRandom(this.attackSounds, 0.5);
    }
      
    const creature = this.currentMonsters[index];
    creature.health -= amount;
    if (creature.health <= 0) {
      // Loot a random item from the items array
      const lootItem = ItemManager.getItem(creature.loot.index);
      let ratio = creature.loot.ratio;
      // get Head bonus
      const head = ItemManager.getEquipedItem('Head');
      if (head) {
        ratio = ratio + (ratio * head.effect());
      }
      /** DEBUG */ ratio += 5;
      if (Math.random() <= ratio) {
        ItemManager.addToInventory(lootItem.index)
        const toast = useToast();
        toast.success(`looted ${lootItem.name}!`);
      }
      
      this.currentMonsters[index] = this.generateMonsters();
    }
    eventBus.emit('monster-updated', { battleIndex: index, creature: this.currentMonsters[index] });
    this.updateCurrentMonsters();
  }

  getBackgroundImage(battlefieldIndex) {
    try {
        return this.battlefieldsAssetPath(`./${battlefieldIndex}_bg.png`);
    } catch (error) {
        return this.battlefieldsAssetPath('./default.png');
    }
  }

  getHeroesForBattle(BattleFieldIndex) {
    return HeroManager.getHeroes().filter(hero => hero.assignedArea === BattleFieldIndex);
  }

  loadState() {
    const storedCreatures = this.getCurrentMonsters();
    if (storedCreatures && storedCreatures.length === this.battlefields.length) {
      this.currentMonsters = storedCreatures;
    } else {
      this.currentMonsters = this.battlefields.map(() => this.generateMonsters());
      this.updateCurrentMonsters();
    }
  }

  getMonsterPortrait(monsterIndex) {
    try {
      return this.monstersAssetPath(`./${monsterIndex}.png`);
    } catch (e) {
      return this.monstersAssetPath('./default.png');
    }
  }
}

export default new BattleManager();
