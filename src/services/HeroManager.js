class HeroManager {
    constructor() {
        this.assetPath = require.context('@/assets/heroes', false, /\.png$/);
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