import AchievementManager from "./AchievementManager";
import { itemsEnum } from "./ItemEnum";
import StorageManager from "./StorageManager";
import eventBus from "@/eventBus";
import UXManager from "./UXManager";

class ItemManager {
    constructor() {
        this.assetPath = require.context('@/assets/items', false, /\.png$/);
        this.items = itemsEnum;
        this.currentBuff = [];
    }

    getItems() {
        return this.items;
    }

    getItem(itemIndex) {
        return this.items.find(item => item.index === itemIndex)
    }

    getInventory() {
        return StorageManager.getArray('playerInventory');
    }

    addToInventory(itemIndex) {
        const item = this.getItem(itemIndex);
        if (item) {
          let inventory = this.getInventory();
          inventory.push(item.index);
          StorageManager.update('playerInventory', JSON.stringify(inventory));
        }
    }

    initInventory() {
        let playerInventory = this.getInventory();
        const isInventoryUnlocked = AchievementManager.getAchievement('goal_shopping_on_silk_road_unlocked');
        if (playerInventory.length === 0 && !isInventoryUnlocked) {
            this.addToInventory('good_new_btc');
        }
    }

    getBuff(buffType) {
        return this.currentBuff.findIndex(buff => buff.type === buffType);
    }

    startBuff(buff) {
        //alert('Manual Mining Potion consumed! Double mining power for 2 minutes.');

        this.currentBuff.push(buff);
        UXManager.showSuccess(`${buff.msg} started`);

        // Emit an event to notify the application about the buff
        eventBus.emit('buff-applied', `${buff.type}Buff`);

        // Set a timeout to remove the buff after 2 minutes
        setTimeout(() => {
            // Remove the buff from currentBuff when the effect expires
            const index = this.getBuff('miningMultiplier');
            if (index !== -1) {
                this.currentBuff.splice(index, 1);
                UXManager.showError(`${buff.msg} ended`);
                eventBus.emit('buff-expired', `${buff.type}Buff`);
            }
        }, buff.expiration);
    }
}

export default new ItemManager();