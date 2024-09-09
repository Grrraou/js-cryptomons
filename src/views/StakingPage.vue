<template>
    <div class="staking-page game-container">
      <h1 class="page-title">Crypto Staking</h1>
      <p>Stake your crypto assets here.</p>
      <div class="staking-list" v-for="staking in filteredStaking" :key="staking.index">
        <StakingWidget
          :key="staking.index"
          :staking="staking"
        />
      </div>
    </div>
  </template>
  
<script>
import StakingWidget from '@/components/StakingWidget.vue';
import StakingManager from '@/services/StakingManager';
  
  export default {
    name: 'StakingPage',
    components: {
      StakingWidget,
    },
    data() {
      return {
        stakings: StakingManager.getStakings(),
      };
    },
    computed: {
      filteredStaking() {
      return this.stakings.filter(staking => {
        // Check if the mine has a requirement
        if (staking.requirement) {
          // Check if the required goal is unlocked in localStorage
          return localStorage.getItem(`goal_${staking.requirement}_unlocked`) === 'true';
        }
        // If no requirement, always show the area
        return true;
      });
    },
    }
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

  .staking-page {
    padding-left: 220px; /* Space for the side menu */
    margin-top: 50px;
  }
  
  .staking-list {
    margin-top: 20px;
  }
  </style>
  