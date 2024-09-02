// services/BattleManager.js
import eventBus from '@/eventBus.js';
import { generateCreature } from '@/services/BattleService.js';
import { heroes } from '@/services/HeroService.js';

class BattleManager {
  constructor() {
    this.battleData = [];
    this.currentCreatures = [];
    this.heroAttackInterval = null;
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
    this.battleData.forEach((battle, index) => {
      const assignedHeroes = this.getHeroesForBattle(index);
      if (assignedHeroes.length > 0) {
        const damage = assignedHeroes.length * 10;
        this.damageCreature(index, damage);
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
    const creature = this.currentCreatures[index];
    if (creature && typeof creature.health === 'number' && !isNaN(creature.health)) {
      creature.health -= amount;
      if (creature.health <= 0) {
        const currentAmount = parseFloat(localStorage.getItem("token_btc")) || 0;
        localStorage.setItem("token_btc", (currentAmount + 1).toString());
        this.currentCreatures[index] = generateCreature();
      }
      eventBus.emit('monster-updated', { battleIndex: index, creature: this.currentCreatures[index] });
    }
  }

  getHeroesForBattle(index) {
    return heroes.filter(hero => hero.assignedArea === index); // Adjusted to get heroes for a specific battlefield
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
