import { monstersEnum } from "@/enums/MonsterEnum";
import StorageManager from "@/managers/StorageManager";
import BattleManager from "./BattleManager";

class MonsterManager {
  constructor() {
    this.monsters = monstersEnum;
    this.assetPath = require.context('@/assets/monsters', false, /\.png$/);
    this.UIrefs = [];
  }

  getMonsters() {
    return this.monsters;
  }

  getMonster(monsterIndex) {
    return this.getMonsters().find(monster => monster.index === monsterIndex);
  }

  getCurrentMonsters() {
    return StorageManager.getArray("battlefield_current_monsters");
  }

  getCurrentMonster(battlefieldIndex) {
    return this.getCurrentMonsters().find(monster => monster.battlefieldIndex == battlefieldIndex);
  }

  removeCurrentMonsterHealth(battlefieldIndex, value) {
    const currentMonsters = this.getCurrentMonsters();
    const updatedCurrentMonsters = currentMonsters.map(monster => {
      if (monster.battlefieldIndex === battlefieldIndex) {
      
        return {
          ...monster,
          health: Math.max(0, monster.health - value)
        };
      }

      return monster;
    });
    const updatedMonster = updatedCurrentMonsters.find(monster => monster.battlefieldIndex === battlefieldIndex)
    if (updatedMonster.health <= 0) {
      this.regenMonster(updatedMonster.battlefieldIndex);
    } else {
      this.updateCurrentMonsters(updatedCurrentMonsters);
    }
    this.UIrefs[battlefieldIndex].localMonster  = this.getCurrentMonster(battlefieldIndex);
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

  initCurrentMonsters() {
    let currentMonsters = [];
    if (!this.getCurrentMonsters() || this.getCurrentMonsters().length === 0) {
      currentMonsters = BattleManager.getBattlefields().map((battlefield) => this.generateMonsters(battlefield.index));
      this.updateCurrentMonsters(currentMonsters);
    }
    
    BattleManager.startAutoBattle();
  }

  removeCurrentMonster(battlefieldIndex) {
    const currentMonsters = this.getCurrentMonsters();
    const updatedCurrentMonsters = currentMonsters.filter(monster => monster.battlefieldIndex !== battlefieldIndex);
    this.updateCurrentMonsters(updatedCurrentMonsters);
  }

  regenMonster(battlefieldIndex) {
    this.removeCurrentMonster(battlefieldIndex);
    const newMonster = this.generateMonsters(battlefieldIndex);
    let currentMonsters = this.getCurrentMonsters();
    currentMonsters.push(newMonster);
    this.updateCurrentMonsters(currentMonsters);
  }

  updateCurrentMonsters(currentMonsters) {
    StorageManager.update("battlefield_current_monsters", JSON.stringify(currentMonsters));
  }

  getMonsterPortrait(monsterIndex) {
    try {
        return this.assetPath(`./${monsterIndex}.png`);
    } catch (e) {
        return this.assetPath('./default.png');
    }
  }
}

export default new MonsterManager();
