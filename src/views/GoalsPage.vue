<template>
    <div class="goals-page">
      <h1 class="page-title">Goals <InfoBubble page="goals" /></h1>
      <p>It is recommanded to unlock them in order but i don't really care, you're free !</p>
      <div v-for="goal in goals" :key="goal.index">
        <GoalBox :goal="goal" />
      </div>
    </div>
</template>
  
<script>
import GoalBox from '@/components/GoalBox.vue';
import InfoBubble from '@/components/InfoBubble.vue';
import GoalManager from '@/managers/GoalManager';
  
  export default {
    components: {
      GoalBox,
      InfoBubble,
    },
    data() {
      return {
        goals: GoalManager.getGoals(),
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
  display:flex;
  justify-content: center;
  align-items: center;
}
  .goals-page {
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
</style>
  