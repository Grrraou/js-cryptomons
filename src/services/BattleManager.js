// services/BattleManager.js
import eventBus from '@/eventBus.js';
import HeroManager from './HeroManager';
import { generateCreature } from '@/services/BattleService.js';
import { useToast } from 'vue-toastification';
import ItemManager from './ItemManager';

class BattleManager {
  constructor() {
    this.battleData = [];
    this.currentCreatures = [];
    this.heroAttackInterval = null;
    this.attackSounds = [
      new Audio(require('@/assets/sounds/slash.ogg')),
      new Audio(require('@/assets/sounds/slash2.wav')),
      new Audio(require('@/assets/sounds/slash3.wav')),
      new Audio(require('@/assets/sounds/slash4.wav')),
    ];
  }

  init(battleData, initialCreatures) {
    this.battleData = battleData || [];
    this.currentCreatures = initialCreatures || this.battleData.map(() => generateCreature());

    // Start the battle logic
    this.startAutoBattle();
  }

  startAutoBattle() {
    if (this.heroAttackInterval) clearInterval(this.heroAttackInterval);

    this.heroAttackInterval = setInterval(() => {
      this.handleHeroAttacks();
      this.checkAndRespawnMonsters();
      this.saveState();
    }, 1000);
  }

  handleHeroAttacks() {
    this.battleData.forEach((battle, battleFieldIndex) => {
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
    if (!this.currentCreatures) {
      console.error('currentCreatures is not initialized');
      return;
    }

    this.currentCreatures.forEach((creature, index) => {
      if (!creature || creature.health <= 0) {
        this.currentCreatures[index] = generateCreature();
        eventBus.emit('monster-updated', { battleIndex: index, creature: this.currentCreatures[index] });
      }
    });
  }

  damageCreature(index, amount) {
    if (window.location.pathname === '/battle') {
      const randomIndex = Math.floor(Math.random() * this.attackSounds.length);
      const slashSound = this.attackSounds[randomIndex];
      slashSound.volume = 0.5;
      slashSound.play();
    }
      
    const creature = this.currentCreatures[index];
    if (creature && typeof creature.health === 'number' && !isNaN(creature.health)) {
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
        

        this.currentCreatures[index] = generateCreature();
      }
      eventBus.emit('monster-updated', { battleIndex: index, creature: this.currentCreatures[index] });
    }
  }

  getHeroesForBattle(BattleFieldIndex) {
    return HeroManager.getHeroes().filter(hero => hero.assignedArea === BattleFieldIndex);
  }

  saveState() {
    localStorage.setItem('currentCreatures', JSON.stringify(this.currentCreatures));
  }

  loadState() {
    const storedCreatures = JSON.parse(localStorage.getItem('currentCreatures'));
    if (storedCreatures && storedCreatures.length === this.battleData.length) {
      this.currentCreatures = storedCreatures;
    } else {
      this.currentCreatures = this.battleData.map(() => generateCreature());
      this.saveState();
    }
  }
}

export default new BattleManager();
