<template>
    <div class="achievement-box" :class="{ unlocked: isUnlocked }">
      <div class="achievement-content">
        <h3>{{ title }}</h3>
        <p v-if="!isUnlocked">Locked</p>
        <p v-else>Unlocked!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      storageKey: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      target: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        isUnlocked: false,
      };
    },
    mounted() {
      this.checkIfUnlocked();
    },
    methods: {
      checkIfUnlocked() {
        const unlocked = localStorage.getItem(`${this.storageKey}_${this.target}_unlocked`);
        if (unlocked) {
          this.isUnlocked = true;
        } else {
          const value = parseInt(localStorage.getItem(this.storageKey), 10) || 0;
          if (value >= this.target) {
            this.isUnlocked = true;
            localStorage.setItem(`${this.storageKey}_${this.target}_unlocked`, "true");
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .achievement-box {
    border: 2px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    transition: background-color 0.3s ease;
  }
  
  .achievement-box.unlocked {
    background-color: gold;
    color: white;
  }
  
  .achievement-content {
    font-size: 1.2em;
  }
  </style>
  