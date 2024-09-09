import { heroesEnum } from "./HeroEnum";
import StorageManager from "./StorageManager";
class HeroManager {
    constructor() {
        this.assetPath = require.context('@/assets/heroes', false, /\.png$/);
    }

    getHeroes() {
      return heroesEnum;
    }

    getHero(heroIndex) {
      return this.getHeroes().find(hero => { return hero.index === heroIndex });
    }

    getHeroesByArea(areaIndex) {
      return this.getHeroes().filter(hero => hero.assignedArea === areaIndex);
    }

    getAvailableHeroes() {
      return this.getHeroes().filter(hero => {
        return this.isHeroUnlocked(hero.index) && !this.isHeroAssigned(hero.index);
      });
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
      const hero = this.getHero(heroIndex);
      return hero.assignedArea !== null;
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