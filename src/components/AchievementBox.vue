<template>
    <div class="achievement-box" :class="{ unlocked: isUnlocked }" :style="backgroundStyle">
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
      indexKey: {
        type: String,
        required: true,
      },
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
    computed: {
      backgroundStyle() {
        let backgroundUrl;
        try {
          // Try to load the background image based on the areaIndex
          backgroundUrl = require(`@/assets/achievements/${this.indexKey}_bg.png`);
        } catch (error) {
          // If the specific background image isn't found, use the default background image
          backgroundUrl = require('@/assets/achievements/default_logo.png');
        }

        return {
          //backgroundImage: `url(${backgroundUrl})`,
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9)), 
              url(${backgroundUrl}) center/cover no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      },
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
    border: 2px solid #444;
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
    transform: translateY(-4px);
  }
  
  .achievement-box.unlocked {
    color: #ffa500;
    border: 6px solid #ffa500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  }
  
  .achievement-content {
    font-size: 1.2em;
  }
  </style>
  