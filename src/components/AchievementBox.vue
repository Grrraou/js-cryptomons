<template>
    <div class="achievement-box" :class="{ unlocked: isUnlocked }">
      <div class="achievement-content">
        <h3>{{ title }}</h3>
        <h3 style="display: none;">{{ storageKey }}</h3>
        <h3>{{ target }}</h3>
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
        const unlocked = localStorage.getItem(`${this.storageKey}_${this.target}`);
        if (unlocked) {
          this.isUnlocked = true;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .achievement-box {
    margin: 10px;
    padding: 20px;
    width: 10%;
    border: 2px solid #ffa500;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7em;
    font-weight: bold;
    color: #444; /* White text color */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Dark shadow for contrast */
  }

  .achievement-box:hover {
    border: 6px solid #ffa500;
  }
  
  .achievement-box.unlocked {
    background-color: gold;
    color: white;
  }
  
  .achievement-content {
    font-size: 1.2em;
  }
  </style>
  