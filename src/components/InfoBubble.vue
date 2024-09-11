<template>
  <div>
    <!-- Info Bubble -->
    <div class="info-bubble" @click="toggleOverlay">
      <span class="info-icon">?</span>
    </div>

    <!-- Overlay -->
    <div v-if="isOverlayVisible" class="overlay">
      <div class="overlay-content">
        <span class="close-btn" @click="hideOverlay">&times;</span>
        
        <!-- Conditionally render content based on prop page -->
        <div v-if="page === 'mines'">
          <h3>Mines Information</h3>
          <p>Mines allow users to stake assets in return for rewards over time. The longer you leave your assets in the mine, the more rewards you can accumulate. Different mines may have varying reward rates and durations.</p>
        </div>

        <div v-if="page === 'staking'">
          <h3>Staking Information</h3>
          <p>Staking is a way to earn rewards by locking your assets into a staking pool. Different pools offer different rewards based on the assets staked and the lock-up period. Ensure you choose a pool that matches your investment strategy.</p>
        </div>

        <div v-if="page === 'vault'">
          <h3>Vault Information</h3>
          <p>The vault is a secure storage for your assets, where they earn interest passively. Vaults are typically low-risk and are a good choice for long-term holding of assets with stable returns.</p>
        </div>

        <div v-if="page === 'battle'">
          <h3>battle Information</h3>
          <p>The vault is a secure storage for your assets, where they earn interest passively. Vaults are typically low-risk and are a good choice for long-term holding of assets with stable returns.</p>
        </div>

        <div v-if="page === 'inventory'">
          <h3>Inventory Information</h3>
          <p>The inves is a secure storage for your assets, where they earn interest passively. Vaults are typically low-risk and are a good choice for long-term holding of assets with stable returns.</p>
        </div>

        <div v-if="page === 'swap'">
          <h3>Inventory Information</h3>
          <p>The inves is a secure storage for your assets, where they earn interest passively. Vaults are typically low-risk and are a good choice for long-term holding of assets with stable returns.</p>
        </div>

        <div v-if="page === 'goals'">
          <h3>Inventory Information</h3>
          <p>The inves is a secure storage for your assets, where they earn interest passively. Vaults are typically low-risk and are a good choice for long-term holding of assets with stable returns.</p>
        </div>

        <div v-if="page === 'achievements'">
          <h3>Inventory Information</h3>
          <p>The inves is a secure storage for your assets, where they earn interest passively. Vaults are typically low-risk and are a good choice for long-term holding of assets with stable returns.</p>
        </div>

        <div v-if="page === 'stats'">
          <h3>Inventory Information</h3>
          <p>The inves is a secure storage for your assets, where they earn interest passively. Vaults are typically low-risk and are a good choice for long-term holding of assets with stable returns.</p>
        </div>

        <div v-if="page === 'settings'">
          <h3>Inventory Information</h3>
          <p>The inves is a secure storage for your assets, where they earn interest passively. Vaults are typically low-risk and are a good choice for long-term holding of assets with stable returns.</p>
        </div>

        <!-- Add more sections if needed -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOverlayVisible: false,
    };
  },
  methods: {
    toggleOverlay() {
      this.isOverlayVisible = !this.isOverlayVisible;
    },
    hideOverlay() {
      this.isOverlayVisible = false;
    },
  },
};
</script>

  

<style scoped>
  .info-bubble {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #17a2b8;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 15px;
    margin-bottom: 10px;
  }
  
  .info-icon {
    color: white;
  }
  
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* Dark background with opacity */
    z-index: 1000;
  }
  
  .overlay-content {
    position: relative;
    background-color: white;
    padding: 20px;
    width: 60%;
    border-radius: 10px;
    text-align: left;
    font-size: 1.2em;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 28px;
    font-weight: bold;
    color: black;
    cursor: pointer;
  }
  
  .close-btn:hover {
    color: red;
  }
</style>
  