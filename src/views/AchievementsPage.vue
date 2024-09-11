<template>
  <div class="game-container">
    <h1 class="page-title">Achievements</h1>
    <AchievementBox
      v-for="achievement in achievements"
      :key="achievement.key"
      :indexKey="achievement.key"
      :achievement="achievement"
      :storageKey="achievement.storageKey"
      :target="achievement.target"
    />
  </div>
</template>

<script>
import AchievementBox from '@/components/AchievementBox.vue';
import AchievementManager from '@/managers/AchievementManager';

export default {
  components: {
    AchievementBox,
  },
  data() {
    return {
      achievements: AchievementManager.getAchievements(),
    };
  },
};
</script>

<style scoped>
.page-title {
  position: relative;
  font-size: 28px;
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
  border-bottom: 2px solid #ffa500;
}
</style>