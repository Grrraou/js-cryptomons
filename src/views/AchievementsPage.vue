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
import { achievements } from '@/services/AchievementService.js';

export default {
  components: {
    AchievementBox,
  },
  data() {
    return {
      achievements,
    };
  },
};
</script>

<style scoped>
.page-title {
  position: relative;
  font-size: 28px; /* Slightly larger font size for emphasis */
  font-weight: bold;
  color: #444; /* Keep the white color for contrast */
  text-align: center;
  top: 0;
  margin-bottom: 20px; /* Increase the bottom margin for better spacing */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6); /* Softer, larger shadow for depth */
  background-color: transparent; /* Remove background color to avoid button-like appearance */
  padding: 0; /* Remove padding to avoid button-like appearance */
  border-radius: 0; /* Remove border radius to make it more like a title */
  letter-spacing: 1px; /* Slight letter spacing for elegance */
  text-transform: uppercase; /* Uppercase letters for a more formal look */
  border-bottom: 2px solid #ffa500; /* Add a subtle underline for emphasis */
}
</style>