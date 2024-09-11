<template>
    <div class="achievement-box" :class="{ unlocked: isUnlocked }" :style="backgroundStyle">
      <div class="achievement-content">
        <h3>{{ achievement.title }}</h3>
        <p>{{ achievement.description }}</p>
        <p v-if="achievement.loot">{{ achievement.loot }}</p>
        <p v-if="!isUnlocked">Locked</p>
        <p v-else>Unlocked!</p>
      </div>
    </div>
  </template>
  
  <script>
import AchievementManager from '@/managers/AchievementManager';

  export default {
    props: {
      achievement: {
        type: Object,
        required: true,
      },
      storageKey: {
        type: String,
        required: true,
      },
      target: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        isUnlocked: false,
      };
    },
    computed: {
      backgroundStyle() {
        let backgroundUrl = AchievementManager.getBackgroundImage(this.achievement.index);

        return {
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9)), 
              url(${backgroundUrl}) center/cover no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      },
    },
    mounted() {
      this.checkIfUnlocked();
    },
    methods: {
      checkIfUnlocked() {
        this.isUnlocked = AchievementManager.isAchievementReached(this.achievement.index);
      },
    },
  };
  </script>
  
<style scoped>
  .achievement-box {
    margin: 10px;
    padding: 20px;
    width: 10%;
    border: 2px solid #444;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7em;
    font-weight: bold;
    color: #444;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }

  .achievement-box:hover {
    transform: translateY(-4px);
  }
  
  .achievement-box.unlocked {
    color: #ffa500;
    border: 6px solid #ffa500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  }
  
  .achievement-content {
    font-size: 1.2em;
  }
</style>
