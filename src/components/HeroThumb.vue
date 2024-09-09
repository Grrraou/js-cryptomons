<template>
    <div class="hero">
        <img :src="HeroManager.getHeroPicture(hero.index)" :alt="hero.name" class="hero-image" draggable="true" @dragstart="dragStart($event, hero)" />
        <p class="hero-name">{{ hero.name }}</p>
    </div>
</template>

<script>
import HeroManager from '@/services/HeroManager';

export default {
    props: {
      hero: Object,
    },
    data() {
      return {
        
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
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}

.hero-image {
  width: 80px;
  height: 80px;
  border-radius: 50%; /* Circular hero image */
  margin-bottom: 10px;
  border: 3px solid #ffa500; /* Border around hero image */
}

.hero-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style>