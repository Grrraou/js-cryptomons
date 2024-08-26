<template>
    <div class="menu">
      <button @click="resetStats">Reset Stats</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      resetStats() {
        this.$emit('reset-stats'); // Emit the reset event to the parent
      },
    },
  };
  </script>
  
  <style scoped>
  .menu {
    text-align: center;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #ff0000;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #cc0000;
  }
  </style>
  