<template>
  <div class="hero-list-wrapper">

    <div class="hero-container" @dragover.prevent @drop="handleHeroDrop">
      <div class="hero-list-container">
        <div v-if="heroes.length > 0" class="hero-grid">
          <HeroThumb
            class="hero"
            v-for="(hero, index) in heroes"
            :key="index"
            :hero="hero"
            draggable="true"
          />
          </div>
        <p v-else class="no-heroes">No heroes available</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeroManager from '@/managers/HeroManager';
import HeroThumb from '@/components/HeroThumb.vue';
import eventBus from '@/eventBus';


export default {
  components: {
    HeroThumb,
  },
  data() {
    return {
      heroes: HeroManager.getAvailableHeroes(),
    };
  },
  computed: {

  },
  methods: {
    handleHeroDrop(event) {
      try {
        const heroData = event.dataTransfer.getData('heroData');
        if (!heroData) return;
        const hero = JSON.parse(heroData);
        HeroManager.moveHero(hero.index, 'free');
        this.heroes = HeroManager.getAvailableHeroes();
        eventBus.emit('hero-moved');
      } catch (error) {
        console.error('Error parsing hero data on drop to hero list:', error);
      }
    },
  },
  mounted() {
    eventBus.on('hero-moved', () => {
      this.heroes = HeroManager.getAvailableHeroes();
    });
  },
};
</script>

  
<style scoped>
.hero-list-wrapper {
  position: relative;
  max-width: 300px;
  margin: 0 auto;
  scrollbar-width: none;
}

.hero-list-title {
  position: fixed;
  font-size: 15px;
  font-weight: bold;
  color: #444;
  text-align: center;
  top: 0;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 2px solid #444;
}


.hero-container {
  text-align: center;
  padding: 20px;
  position: fixed;
  background-image: url('@/assets/mines/workersMenuBG.png');
  background-size: cover;
  background-position: center;
  scrollbar-width: none;
  background-repeat: no-repeat;
  border: 2px solid #444;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: calc(80vh);
  overflow-y: auto;
  margin-top: 50px;
}

.hero-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-heroes {
  font-size: 18px;
  color: #bbb;
  margin-top: 20px;
}
</style>
  