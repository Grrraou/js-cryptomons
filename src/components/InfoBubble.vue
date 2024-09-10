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
          <p>This is the detailed information inside the overlay. You can put as much text as needed here.</p>
        </div>
      </div>
    </div>
  </template>
  

  <script>
  export default {
    name: 'InfoBubble',
    data() {
      return {
        isOverlayVisible: false, // Controls overlay visibility
      };
    },
    methods: {
      toggleOverlay() {
        this.isOverlayVisible = !this.isOverlayVisible; // Toggle overlay visibility on click
      },
      hideOverlay() {
        this.isOverlayVisible = false; // Hide overlay when close button is clicked
      },
    },
  };
  </script>
  

  <style scoped>
  /* Info Bubble */
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
  
  /* Overlay */
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
  