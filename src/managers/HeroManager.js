import { heroesEnum } from "@/enums/HeroEnum";
import StorageManager from "@/managers/StorageManager";
import eventBus from "@/eventBus";
class HeroManager {
    constructor() {
        this.assetPath = require.context('@/assets/heroes', false, /\.png$/);
        this.XPperLvl = 100;
        this.UIrefs = [];
    }

    getHeroLevel(heroIndex) {
      const heroXP = this.getXP(heroIndex);
      return Math.round(1 + heroXP / this.XPperLvl);
    }

    getMiningPower(heroIndex) {
      const hero = this.getHero(heroIndex);
      console.log(hero)
      return hero.miningPower * this.getHeroLevel(heroIndex);
    }

    getBattlePower(heroIndex) {
      const hero = this.getHero(heroIndex);
      return hero.battlePower * this.getHeroLevel(heroIndex);
    }

    getHeroes() {
      return heroesEnum;
    }

    getHero(heroIndex) {
      return this.getHeroes().find(hero => { return hero.index === heroIndex });
    }

    getHeroesByArea(areaIndex) {
      return this.getHeroes().filter(hero => this.getHeroPosition(hero.index) === areaIndex);
    }

    getAvailableHeroes() {
      return this.getHeroes().filter(hero => {
        return this.isHeroUnlocked(hero.index) && !this.isHeroAssigned(hero.index);
      });
    }

    getHeroPosition(heroIndex) {
      let position = StorageManager.getString(`hero_position_${heroIndex}`);
      return position === '' ? 'free' : position;
    }

    moveHero(heroIndex, areaIndex = null) {
      areaIndex = areaIndex ? areaIndex : 'free';
      StorageManager.update(`hero_position_${heroIndex}`, areaIndex)
      eventBus.emit('hero-moved');
    }

    getXP(heroIndex) {
      return StorageManager.getFloat(`heroxp_${heroIndex}`);
    }

    gainXP(heroIndex, amount = null) {
      amount = amount ? amount : parseInt((Math.random() * (5 - 1) + 1).toFixed(0));
      
      let xp = this.getXP(heroIndex);
      xp = parseInt(xp + amount);
      StorageManager.update(`heroxp_${heroIndex}`, xp);
      let component = this.UIrefs[heroIndex];
      if (component) {
        component.$data.xp += amount;
        component.$data.level = this.getHeroLevel(heroIndex);
      }
      return xp;
    }

    isHeroUnlocked(heroIndex) {
      const hero = this.getHero(heroIndex);
      if (hero.requirement) {
        const requirementKey = `goal_${hero.requirement}_unlocked`;
        return StorageManager.get(requirementKey) === 'true';
      }
      return true;
    }

    isHeroAssigned(heroIndex) {
      return this.getHeroPosition(heroIndex) !== 'free';
    }

    getHeroPicture(heroIndex) { 
        try {
          // Try to load the background image based on the areaIndex
          return this.assetPath(`./${heroIndex}.png`);
        } catch (error) {
          // If the specific background image isn't found, use the default background image
          return this.assetPath(`./default.png`);
        }
    }
}

export default new HeroManager();