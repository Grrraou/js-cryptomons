<template>
    <div :style="backgroundStyle" class="goal-box">
      <div class="goal-header">
        <h3>{{ goal.name }}</h3>
        <p>{{ goal.description }}</p>
      </div>
  
      <!-- Costs section: Show only if the goal is not unlocked -->
      <div v-if="!isGoalUnlocked" class="goal-costs">
        <div v-for="(cost, index) in goal.costs" :key="index" class="cost">
          <div class="cost-details">
            <img :src="getTokenIcon(cost.token)" class="token-icon" alt="Token Icon" />
            <p>{{ cost.token.toUpperCase() }}: {{ cost.value }} required</p>
          </div>
          <div v-if="hasPaidCost(cost.token, cost.value)">
            <p class="paid-message">✅ Paid</p>
          </div>
          <button
            v-else
            @click="payCost(cost.token, cost.value)"
            :disabled="!canPayCost(cost.token, cost.value)"
            class="pay-button"
          >
            Pay {{ cost.value }} {{ cost.token.toUpperCase() }}
          </button>
        </div>
      </div>
  
      <!-- Unlocked section: Show when the goal is unlocked -->
      <div v-else class="goal-unlocked-message">
        <p class="unlocked-text">🎉 This Goal is Unlocked! 🎉</p>
        <p class="unlocked-description">You have successfully unlocked the "{{ goal.name }}" goal.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useToast } from 'vue-toastification';


  export default {
    props: {
      goal: Object,
    },
    data() {
      return {
        paidCosts: {}, // Track the costs paid
      };
    },
    computed: {
      isGoalUnlocked() {
        // Check if the goal is unlocked in localStorage or if all costs are paid
        return (
          localStorage.getItem(`goal_${this.goal.index}_unlocked`) === 'true' ||
          this.goal.costs.every((cost) => this.getPaidCost(cost.token) >= cost.value)
        );
      },
      backgroundStyle() {
        return {
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8)), url('${this.getBackgroundImage()}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      },
    },
    methods: {
      getBackgroundImage() {
        try {
          return require(`@/assets/goals/${this.goal.index}.png`);
        } catch (error) {
          return require('@/assets/goals/defaultBG.png');
        }
      },
      hasPaidCost(token, value) {
        return this.getPaidCost(token) >= value;
      },
      getPaidCost(token) {
        return parseFloat(localStorage.getItem(`goal_${this.goal.index}_paid_${token}`)) || 0;
      },
      canPayCost(token, value) {
        const storedAmount = parseFloat(localStorage.getItem(`token_${token}`)) || 0;
        return storedAmount >= value;
      },
      payCost(token, value) {
        const storedAmount = parseFloat(localStorage.getItem(`token_${token}`)) || 0;
        const paidAmount = this.getPaidCost(token);

        if (storedAmount >= value) {
            // Deduct the token amount and mark the cost as paid
            localStorage.setItem(`token_${token}`, (storedAmount - value).toFixed(6));
            const newPaidAmount = paidAmount + value;
            localStorage.setItem(`goal_${this.goal.index}_paid_${token}`, newPaidAmount.toFixed(6));

            // Check if the goal is unlocked after paying
            if (this.goal.costs.every((cost) => this.getPaidCost(cost.token) >= cost.value)) {
            localStorage.setItem(`goal_${this.goal.index}_unlocked`, 'true');
            
            // Show toast notification for unlocking the goal
            const toast = useToast();
            toast.success(`🎉 Goal "${this.goal.name}" Unlocked! 🎉`);

            }

            this.$forceUpdate(); // Force UI update after paying
        }
        },
      getTokenIcon(token) {
        try {
          return require(`@/assets/tokens/${token}.png`);
        } catch (error) {
          return require('@/assets/tokens/default.png');
        }
      },
      updateGoalState() {
        // If goal unlock state changes, force reactivity
        if (this.isGoalUnlocked) {
          this.$forceUpdate(); // Reactively trigger update
        }
      },
    },
    mounted() {
      // Continuously check if the goal is unlocked and update UI live
      this.intervalId = setInterval(() => {
        this.updateGoalState();
      }, 1000); // Check every second
  
      // Listen to storage changes (this ensures that any change in localStorage is caught)
      window.addEventListener('storage', this.updateGoalState);
    },
    beforeUnmount() {
      // Clean up interval when the component is destroyed
      clearInterval(this.intervalId);
      window.removeEventListener('storage', this.updateGoalState);
    },
  };
  </script>
  
  <style scoped>
  .goal-box {
    border-radius: 15px;
    padding: 20px;
    margin: 15px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: black;
    text-align: center;
  }
  
  .goal-header {
    margin-bottom: 20px;
  }
  
  .goal-header h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .goal-header p {
    font-size: 16px;
    font-style: italic;
  }
  
  .goal-costs {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .cost-details {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .token-icon {
    width: 30px;
    height: 30px;
  }
  
  .pay-button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 5px;
    transition: background-color 0.3s ease;
  }
  
  .pay-button:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
  
  .pay-button:hover:not(:disabled) {
    background-color: #45a049;
  }
  
  .goal-unlocked {
    margin-top: 20px;
    font-size: 20px;
    color: #ffd700;
  }
  
  .paid-message {
    color: green;
    font-weight: bold;
    margin-top: 5px;
  }
  
  .goal-unlocked-message {
    text-align: center;
    padding: 20px;
    background-color: rgba(240, 240, 240, 0.8);
    border-radius: 10px;
  }
  
  .unlocked-text {
    font-size: 22px;
    color: #28a745;
  }
  
  .unlocked-description {
    font-size: 16px;
    color: #333;
  }
  </style>
  