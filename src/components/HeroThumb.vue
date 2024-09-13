<template>
    <div class="hero">
      <div class="hero-icons">
      <div class="mining-icon">
        ⛏️ <span>{{ miningPower }}</span>
      </div>
      <div class="combat-icon">
        <span>{{ combatPower }}</span> ⚔️
      </div>
    </div>
        <img :src="HeroManager.getHeroPicture(hero.index)" :alt="hero.name" class="hero-image" draggable="true" @dragstart="dragStart($event, hero)" />
        <p class="hero-name">{{ hero.name }}</p>
        <div class="xp-container">
          <div class="xp-bar">
            <div class="xp-bar-fill" :style="{ width: xp + '%' }">
              <span class="xp-text">{{ HeroManager.getXP(hero.index) }}% XP</span>
            </div>
          </div>
          <button @click="increaseXp">Gain XP</button>
        </div>
    </div>
</template>

<script>
import HeroManager from '@/managers/HeroManager';

export default {
    props: {
      hero: Object,
    },
    data() {
      return {
        xp: HeroManager.getXP(this.hero.index),
        miningPower: 2, // Assuming these methods exist
        combatPower: 4, // Adjust as necessary
      };
    },
    setup() {
      return {
        HeroManager,
      };
    },
    methods: {
      dragStart(event, hero) {
        event.dataTransfer.setData('heroData', JSON.stringify(hero));
      },
      increaseXp() {
        if (this.xp < 100) {
          const xpGain = 1;
          HeroManager.gainXP(this.hero.index, xpGain);
          return this.xp += xpGain; // Adjust XP increment as desired
        }
      },
    },
    mounted() {
      HeroManager.UIrefs[this.hero.index] = this;
    },
};
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative; /* Ensures icons are positioned relative to hero */
}

.hero:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.hero-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #ffa500;
}

.hero-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

/* Icons Styling - always visible */
.hero-icons {
  position: absolute;
  top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 2; /* Ensure icons are above other elements */
}

.mining-icon, .combat-icon {
  font-size: 14px;
  color: #444;
  display: flex;
  align-items: center;
}

.mining-icon span, .combat-icon span {
  margin-left: 5px; /* Space between icon and number */
}

.mining-icon {
  /* Top-left corner */
}

.combat-icon {
  /* Top-right corner */
  justify-content: flex-end;
}

/** XP BAR */
.xp-container {
  width: 100%;
  max-width: 500px; /* Optional: Set a maximum width */
  text-align: center;
}

.xp-bar {
  position: relative;
  width: 100%;
  height: 25px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.xp-bar-fill {
  height: 100%;
  background-color: #76c7c0;
  transition: width 0.4s ease;
  border-radius: 10px;
}

.xp-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #444;
  pointer-events: none;
}

</style>