import AchievementManager from "@/managers/AchievementManager";
import { itemsEnum } from "@/enums/ItemEnum";
import StorageManager from "@/managers/StorageManager";
import eventBus from "@/eventBus";
import UXManager from "@/managers/UXManager";

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

    getInventory(raw = false) {
        const inventory = StorageManager.getArray('playerInventory');
        return raw ? inventory : inventory.map(index => this.getItem(index));
    }

    addToInventory(itemIndex) {
        const item = this.getItem(itemIndex);
        if (item) {
          let inventory = this.getInventory(true);
          inventory.push(item.index);
          StorageManager.update('playerInventory', JSON.stringify(inventory));
        }
    }

    removeFromInventory(inventoryIndex) {
        let inventory = this.getInventory(true);

        if (inventoryIndex !== -1) {
            inventory.splice(inventoryIndex, 1);
            StorageManager.update('playerInventory', JSON.stringify(inventory))
            eventBus.emit('inventory-updated'); // Notify the InventoryComponent to update
        }
    }

    getEquipement(raw = false) {
        const equipement = JSON.parse(localStorage.getItem('playerEquipement')) || {};
        return raw ? equipement : Object.keys(equipement).reduce((acc, key) => {
            const index = equipement[key]; // Get the current value (which could be null or a valid index)
            
            // If there's a valid index, use this.getItem() to replace it
            acc[key] = index !== null ? this.getItem(index) : null;
            
            return acc;
          }, {});
    }

    getEquipedItem(slot) {
        const equipment = this.getEquipement(false);
        const item = equipment[slot];
        
        if (item !== null) {
            return item;
        }

        return null;
      }

    equipItem(itemIndex, slot) {
        let equipement = this.getEquipement(true);
        equipement[slot] = itemIndex;
        StorageManager.update('playerEquipement', JSON.stringify(equipement));
        eventBus.emit('equipment-updated');
    }

    unequipItem(slot) {
        let equipement = this.getEquipement(true);
        if (equipement[slot]) {
            equipement[slot] = null;
            StorageManager.update('playerEquipement', JSON.stringify(equipement));
            eventBus.emit('equipment-updated');
        }
    }

    consumeItem(itemIndex) {
        const item = this.getItem(itemIndex);
        if (typeof item.effect === 'function') {
          item.effect(); // Execute the item's effect function
        }
  
        // Remove the item from the inventory
        let inventory = this.getInventory(true);
        inventory.splice(itemIndex, 1);
        localStorage.setItem('playerInventory', JSON.stringify(inventory));
        eventBus.emit('inventory-updated');
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
        const sourceItem = this.getItem(buff.source)
    
        this.currentBuff.push(buff);
        UXManager.showSuccess(`${sourceItem.name} effect started: ${sourceItem.description}`);

        // Emit an event to notify the application about the buff
        eventBus.emit('buff-applied', `${buff.type}Buff`);

        // Set a timeout to remove the buff after 2 minutes
        setTimeout(() => {
            // Remove the buff from currentBuff when the effect expires
            const index = this.getBuff('miningMultiplier');
            if (index !== -1) {
                this.currentBuff.splice(index, 1);
                UXManager.showError(`${sourceItem.name} effect ended.`);
                eventBus.emit('buff-expired', `${buff.type}Buff`);
            }
        }, buff.expiration);
    }
}

export default new ItemManager();