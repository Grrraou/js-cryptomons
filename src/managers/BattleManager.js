import HeroManager from '@/managers/HeroManager';
import { useToast } from 'vue-toastification';
import ItemManager from '@/managers/ItemManager';
import MonsterManager from '@/managers/MonsterManager';
import { battlefieldsEnum } from '@/enums/BattleEnum.js';
import AudioManager from './AudioManager';
import UXManager from './UXManager';

class BattleManager {
  constructor() {
    this.battlefields = battlefieldsEnum;
    this.battlefieldsAssetPath = require.context('@/assets/battlefields', false, /\.png$/);
    this.heroAttackInterval = null;
    this.UIrefs = [];
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

      assignedHeroes.forEach(() => {
        let heroDamage = 1;
        const chest = ItemManager.getEquipedItem('Chest');
        if (chest) {
          heroDamage += chest.effect();
        }
        this.damageCreature(battle.index, heroDamage, MonsterManager.UIrefs[battle.index]);
      });
    });
  }

  damageCreature(index, amount, ref = null, event = null) {
    if (window.location.pathname === '/battle') {
      AudioManager.playRandom(this.attackSounds, 0.5);
    }
    

    const currentCreature = MonsterManager.getCurrentMonster(index);
    const monster = MonsterManager.getMonster(currentCreature.index);
    currentCreature.health -= amount;
    MonsterManager.removeCurrentMonsterHealth(index, amount);
    if (ref) {
      const rect = ref.$el.getBoundingClientRect();
      UXManager.showFlyingText('⚔️ ' + amount, null, rect.left, rect.top)
    }
    if (event) {
      const x = event.clientX;
      const y = event.clientY;
      UXManager.showFlyingText('⚔️ ' + amount, null, x, y);
    }
    
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
    return HeroManager.getHeroes().filter(hero => HeroManager.getHeroPosition(hero.index) === BattleFieldIndex);
  }
}

export default new BattleManager();
