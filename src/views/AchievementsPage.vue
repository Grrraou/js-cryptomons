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

export default {
  components: {
    AchievementBox,
  },
  data() {
    return {
      achievements: [
        {
          key: "clicks_area_0_10",
          title: "Clicks Master - 10 Clicks",
          storageKey: "clicks_area_0",
          target: 10
        },
        {
          key: "clicks_area_0_100",
          title: "Clicks Master - 100 Clicks",
          storageKey: "clicks_area_0",
          target: 100
        },
        {
          key: "clicks_area_0_1000",
          title: "Clicks Master - 1000 Clicks",
          storageKey: "clicks_area_0",
          target: 1000
        },
        // Add more achievements as needed
      ],
    };
  },
};
</script>
