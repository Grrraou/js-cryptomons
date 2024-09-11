<template>
    <div class="staking-page game-container">
      <h1 class="page-title">Crypto Staking <InfoBubble page="staking" /></h1>
      <p>Stake your crypto assets here.</p>
      <div class="staking-list" v-for="staking in StakingManager.getAvailableStakings()" :key="staking.index">
        <StakingWidget
          :key="staking.index"
          :staking="staking"
        />
      </div>
    </div>
</template>
  
<script>
import InfoBubble from '@/components/InfoBubble.vue';
import StakingWidget from '@/components/StakingWidget.vue';
import StakingManager from '@/managers/StakingManager';
  
  export default {
    name: 'StakingPage',
    components: {
      StakingWidget,
      InfoBubble,
    },
    data() {
      return {
        stakings: StakingManager.getStakings(),
      };
    },
    setup() {
      return {
        StakingManager,
      }
    },
    computed: {
    }
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

  .staking-page {
    padding-left: 220px;
    margin-top: 50px;
  }
  
  .staking-list {
    margin-top: 20px;
  }
</style>
  