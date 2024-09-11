import { goalsEnum } from "@/enums/GoalEnum";
import StorageManager from "@/managers/StorageManager";
import TokenManager from "@/managers/TokenManager";
import UXManager from "@/managers/UXManager";

class GoalManager {
    constructor() {
        this.assetPath = require.context('@/assets/goals', false, /\.png$/);
        this.goals = goalsEnum;
    }

    getGoals() {
        return this.goals;
    }

    getGoal(goalIndex) {
        return this.getGoals().find(goal => goal.index === goalIndex);
    }

    isGoalReached(goalIndex) {
        return StorageManager.getBool(`goal_${goalIndex}_unlocked`);
    }

    getCost(goalIndex, tokenIndex) {
        const goal = this.getGoal(goalIndex);
        return goal ? goal.costs.find(cost => cost.token === tokenIndex) : null;
    }

    isCostPaid(goalIndex, tokenIndex) {
        const cost = this.getCost(goalIndex, tokenIndex);
        const paidAmount = StorageManager.getFloat(`goal_${goalIndex}_paid_${tokenIndex}`)
        return paidAmount >= cost.value;
    }

    canPayCost(goalIndex, tokenIndex) {
        const cost = this.getCost(goalIndex, tokenIndex);
        const balance = TokenManager.getBalance(tokenIndex);
        return balance >= cost.value;
    }

    payCost(goalIndex, tokenIndex) {
        const goal = this.getGoal(goalIndex);
        const storedAmount = TokenManager.getBalance(tokenIndex);
        const cost = this.getCost(goalIndex, tokenIndex)
        const isPaid = this.isCostPaid(goal.index, tokenIndex);
        
        if (storedAmount >= cost.value && !isPaid) {
            StorageManager.update(`token_${tokenIndex}`, (storedAmount - cost.value));
            StorageManager.update(`goal_${goal.index}_paid_${tokenIndex}`, cost.value);
            const isReached = this.isGoalReached(goal.index);
            const isAllCostPaid = !goal.costs.find(cost => !this.isCostPaid(goal.index, cost.token));
            console.log(goal.costs.find(cost => this.isCostPaid(goal.index, cost.token)))
            if (!isReached && isAllCostPaid) {
                StorageManager.update(`goal_${goal.index}_unlocked`, true);
                UXManager.showSuccess(`🎉 Goal "${goal.name}" Unlocked! 🎉`);
            }
        }
    }

    getBackgroundImage(goalIndex) {
        try {
            return this.assetPath(`./${goalIndex}.png`);
        } catch (error) {
            return this.assetPath('./default.png');
        }
    }
}

export default new GoalManager();