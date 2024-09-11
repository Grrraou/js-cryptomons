import HeroManager from '@/managers/HeroManager';
import { useToast } from 'vue-toastification';
import ItemManager from '@/managers/ItemManager';
import MonsterManager from '@/managers/MonsterManager';
import { battlefieldsEnum } from '@/enums/BattleEnum.js';
import AudioManager from './AudioManager';

class BattleManager {
  constructor() {
    this.battlefields = battlefieldsEnum;
    this.battlefieldsAssetPath = require.context('@/assets/battlefields', false, /\.png$/);
    this.heroAttackInterval = null;
    this.attackSounds = [
      'slash.ogg',
      'slash2.wav',
      'slash3.wav',
      'slash4.wav',
    ];
  }

  getBattlefields() {
    return this.battlefields;
  }

  getBattlefield(battlefieldIndex) {
    return this.getBattlefields().find(battlefield => battlefield.index === battlefieldIndex);
  }

  startAutoBattle() {
    if (this.heroAttackInterval) clearInterval(this.heroAttackInterval);

    this.heroAttackInterval = setInterval(() => {
      this.handleHeroAttacks();
    }, 1000);
  }

  handleHeroAttacks() {
    this.battlefields.forEach((battle) => {
      const assignedHeroes = HeroManager.getHeroesByArea(battle.index);
      let heroesDamage = 1;
      const chest = ItemManager.getEquipedItem('Chest');
      if (chest) {
          heroesDamage += chest.effect();
      }
      if (assignedHeroes.length > 0) {
          const damage = assignedHeroes.length * heroesDamage;
          this.damageCreature(battle.index, damage);
      }
    });
  }

  damageCreature(index, amount) {
    if (window.location.pathname === '/battle') {
      AudioManager.playRandom(this.attackSounds, 0.5);
    }

    const currentCreature = MonsterManager.getCurrentMonster(index);
    const monster = MonsterManager.getMonster(currentCreature.index);
    currentCreature.health -= amount;
    MonsterManager.removeCurrentMonsterHealth(index, amount);
    if (currentCreature.health <= 0) {
      // Loot a random item from the items array
      const lootItem = ItemManager.getItem(monster.loot.index);
      let ratio = monster.loot.ratio;
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
    }
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
}

export default new BattleManager();
