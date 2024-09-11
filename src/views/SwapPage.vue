<template>
    <div class="swap-page game-container">
        <h1 class="page-title">SWAP</h1>
      <SwapBox />
    </div>
</template>
  
<script>
  import SwapBox from '@/components/SwapBox.vue';
  
  export default {
    components: {
      SwapBox,
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

  .swap-page {
    padding: 20px;
  }
</style>
  