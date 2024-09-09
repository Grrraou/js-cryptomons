import StorageManager from "./StorageManager";

class TokenManager {
    constructor() {
        this.assetPath = require.context('@/assets/tokens', false, /\.png$/);
    }

    getTokenIcon(tokenIndex) {
        try {
            return this.assetPath(`./${tokenIndex}.png`);
        } catch (error) {
            return this.assetPath('./default.png');
        }
    }

    getBalance(tokenIndex) {
        return StorageManager.getFloat(`token_${tokenIndex}`, 0);
    }

    addToBalance(tokenIndex, amount) {
        console.log(tokenIndex + ' - ' + amount)
        const storedAmmount = this.getBalance(tokenIndex);
        const newAmount = parseFloat(storedAmmount + amount);
        StorageManager.update(`token_${tokenIndex}`, newAmount);

        const tokenIndexTotal = `total_token_${tokenIndex}`;
        const currentAmountTotal = parseFloat(StorageManager.getFloat(tokenIndexTotal));
        StorageManager.update(tokenIndexTotal, currentAmountTotal + amount);
    }

    removeToBalance(tokenIndex, amount) {
        const storedAmmount = this.getBalance(tokenIndex);
        const newAmount = parseFloat(storedAmmount - amount);
        StorageManager.update(tokenIndex, newAmount);
    }
}

export default new TokenManager();