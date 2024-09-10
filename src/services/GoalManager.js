import StorageManager from "./StorageManager";

class GoalManager {
    constructor() {
        this.assetPath = require.context('@/assets/goals', false, /\.png$/);
    }

    isGoalReached(goalIndex) {
        return StorageManager.getBool(goalIndex);
    }

}

export default new GoalManager();