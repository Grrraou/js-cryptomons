<template>
    <div class="swap-page">
      <SwapBox />
    </div>
  </template>
  
  <script>
  import SwapBox from '../components/SwapBox.vue';
  
  export default {
    components: {
      SwapBox,
    },
  };
  </script>
  
  <style scoped>
  .swap-page {
    padding: 20px;
  }
  </style>
  