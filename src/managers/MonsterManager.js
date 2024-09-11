import { monstersEnum } from "@/enums/MonsterEnum";

class BattleManager {
  constructor() {
    this.monsters = monstersEnum;
  }

  getMonsters() {
    return this.monsters;
  }

  getMonster(monsterIndex) {
    return this.getMonsters().find(monster => monster.index === monsterIndex);
  }
}

export default new BattleManager();
