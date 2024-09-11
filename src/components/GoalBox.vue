<template>
    <div :style="backgroundStyle" class="goal-box">
      <div class="goal-header">
        <div class="goal-info">
          <h3 class="goal-name">{{ goal.name }}</h3>
          <p class="goal-description">{{ goal.description }}</p>
          <p class="goal-reward">🏅 {{ goal.reward }}</p>
        </div>
        <div>
          <img :src="GoalManager.getBackgroundImage(goal.index)" class="goal-logo">
        </div>
      </div>
  
      <!-- Costs section: Show only if the goal is not unlocked -->
      <div v-if="!GoalManager.isGoalReached(goal.index)" class="goal-costs">
        <div v-for="(cost, index) in goal.costs" :key="index" class="cost">
          <div v-if="GoalManager.isCostPaid(goal.index, cost.token)">
            <p class="paid-message">✅ Paid</p>
          </div>
          <button
            v-else
            @click="payCost(cost.token)"
            :disabled="!GoalManager.canPayCost(goal.index, cost.token)"
            class="pay-button"
          >
          <div class="cost-details">
            
            <p>{{ cost.value }} <img :src="TokenManager.getTokenIcon(cost.token)" class="token-icon" alt="Token Icon" /></p>
          </div>
          </button>
        </div>
      </div>
  
      <!-- Unlocked section: Show when the goal is unlocked -->
      <div v-else class="goal-unlocked-message">
        <p class="unlocked-text">🎉 This Goal is Unlocked! 🎉</p>
      </div>
    </div>
</template>
  
<script>
import GoalManager from '@/managers/GoalManager';
import TokenManager from '@/managers/TokenManager';

export default {
    props: {
      goal: Object,
    },
    data() {
      return {
        paidCosts: {},
      };
    },
    setup() {
      return {
        GoalManager,
        TokenManager,
      };
    },
    computed: {
      backgroundStyle() {
        const backgroundImage = GoalManager.getBackgroundImage(this.goal.index);
        return {
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.5)), url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      },
    },
    methods: {
      hasPaidCost(tokenIndex, value) {
        return GoalManager.isCostPaid(this.goal.index, tokenIndex) >= value;
      },
      payCost(tokenIndex) {
        GoalManager.payCost(this.goal.index, tokenIndex);
        this.$forceUpdate();
      },
      updateGoalState() {
        if (GoalManager.isGoalReached(this.goal.index)) {
          this.$forceUpdate();
        }
      },
    },
    mounted() {
      // Continuously check if the goal is unlocked and update UI live
      this.intervalId = setInterval(() => {
        this.updateGoalState();
      }, 1000);
  
      // Listen to storage changes (this ensures that any change is caught)
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
    border: 2px solid #ffa500;
    padding: 20px;
    margin: 15px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: black;
    text-align: center;
  }
  
  .goal-header {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444;
  }

  .goal-logo {
    width: 160px;
    height: 160px;
    border: 3px solid #ffa500;
    border-radius: 33%;
    margin-left: 15px;
  }
  
  .goal-header h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .goal-header p {
    font-size: 16px;
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
    font-weight: bold;
    font-size: 20px;
  }

  .cost-details img {
    width: 20px;
    height: 20px;
    margin-bottom: -2px;
  }
  
  .token-icon {
    width: 30px;
    height: 30px;
  }
  
  .pay-button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 0px 10px;
    border-radius: 5px;
    cursor: pointer;
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
  
  .goal-unlocked-message, .goal-costs {
    text-align: center;
    padding: 20px;
    background-color: rgba(240, 240, 240, 0.8);
    border-radius: 10px;
    border: 2px solid #444;
  }
  
  .unlocked-text {
    font-size: 22px;
    color: #28a745;
  }
  
  .unlocked-description {
    font-size: 16px;
    color: #333;
  }

  .goal-info {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 15px;
    padding: 15px;
    font-weight: bold;
    border: 2px solid #444;
  }

  .goal-name {
    text-decoration: underline;
    text-transform: uppercase;
  }

  .goal-reward {
    font-style: italic;
    color: #177EB2;
    font-weight: bold;
  }
</style>
  