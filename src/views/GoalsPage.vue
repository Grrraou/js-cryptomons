<template>
    <div class="goals-page">
      <h1>Goals</h1>
      <p>It is recommanded to unlock them in order but i don't really care, you're free !</p>
      <div v-for="goal in goals" :key="goal.index">
        <GoalBox :goal="goal" />
      </div>
    </div>
</template>
  
<script>
import GoalBox from '@/components/GoalBox.vue';
import GoalManager from '@/managers/GoalManager';
  
  export default {
    components: {
      GoalBox,
    },
    data() {
      return {
        goals: GoalManager.getGoals(),
      };
    },
  };
</script>
  
<style scoped>
  .goals-page {
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
</style>
  