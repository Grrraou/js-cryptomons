<template>
  <div>
    <h1>Achievements</h1>
    <AchievementBox
      v-for="achievement in achievements"
      :key="achievement.key"
      :storageKey="achievement.storageKey"
      :title="achievement.title"
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
