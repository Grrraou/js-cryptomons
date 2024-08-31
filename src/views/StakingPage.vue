<template>
    <div class="staking-page">
      <h1>Crypto Staking</h1>
      <p>Stake your crypto assets here.</p>
      <div class="staking-list">
        <StakingWidget
          v-for="staking in stakings"
          :key="staking.index"
          :staking="staking"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { stakings } from '@/services/StakingService.js'; // Ensure the path is correct
  import StakingWidget from '@/components/StakingWidget.vue'; // Ensure the path is correct
  
  export default {
    name: 'StakingPage',
    components: {
      StakingWidget,
    },
    data() {
      return {
        stakings,
      };
    },
  };
  </script>
  
  <style scoped>
  .staking-page {
    padding-left: 220px; /* Space for the side menu */
    margin-top: 50px;
  }
  
  .staking-list {
    margin-top: 20px;
  }
  </style>
  