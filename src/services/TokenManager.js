
import StorageManager from "./StorageManager";
import { tokensEnum } from "./TokenEnum";

class TokenManager {
    constructor() {
        this.assetPath = require.context('@/assets/tokens', false, /\.png$/);
        this.tokens = tokensEnum;
    }

    getTokens() {
        return this.tokens;
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

    getBalanceInCryptodollar(tokenIndex) {
        const tokenAmount = this.getBalance(tokenIndex);
        const cryptodollarValue = this.getTokenPrice(tokenIndex);
        const totalValue = tokenAmount * cryptodollarValue;
        return !isNaN(totalValue) ? totalValue.toFixed(2) : 0;
    }

    addToBalance(tokenIndex, amount) {
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

    getTokenPrice(tokenIndex) {
        return StorageManager.getFloat(`cryptodollar_value_${tokenIndex}`) || 0;
    }

    updateTokenPrice(tokenIndex, newValue) {
        StorageManager.update(`cryptodollar_value_${tokenIndex}`, newValue.toFixed(6));
    }

    getToalAssetsValue() {
        let total = 0;
        this.getTokens().forEach(token => {
          const tokenAmount = this.getBalance(token.index) || 0;
          const cryptodollarValue = this.getTokenPrice(token.index) || 0;
          total += tokenAmount * cryptodollarValue;
        });
        return total;
    }

    initCryptodollarValues() {
        
        this.getTokens().forEach((token) => {
            const key = `cryptodollar_value_${token.index}`;
            if (StorageManager.getFloat(key) === 0) {
                StorageManager.update(key, token.cryptodollar);
            }
        });
    }
}

export default new TokenManager();