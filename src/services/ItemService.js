import eventBus from '@/eventBus.js';
import { useToast } from 'vue-toastification';

// Define the current buffs (this will store active buffs)
export const currentBuff = [];

export const items = [
  {
    index: 'good_new_btc', // Manually slugified name
    name: 'Good News: Bitcoin is secure !',
    description: 'Increase bitcoin value by 5.',
    value: 100,
    type: 'Consumable',
    effect: function () {
      const storageIndex = 'cryptodollar_value_btc';
      const currentValue = parseFloat(localStorage.getItem(storageIndex));
      const newValue = parseFloat(currentValue + 5);
      localStorage.setItem(storageIndex, newValue);
      const toast = useToast();
      toast.success(`🚀 Bitcoin going to the moon ! 🚀`);
    }, // Equipment generally won't have an "effect" function
  },
    {
      index: 'iron-helmet', // Manually slugified name
      name: 'Iron Helmet',
      description: 'A sturdy helmet made of iron that protects the head.',
      value: 100,
      type: 'Head',
      effect: function () {
        return 0.1;
      }, // Equipment generally won't have an "effect" function
    },
    {
      index: 'steel-chestplate', // Manually slugified name
      name: 'Steel Chestplate',
      description: 'A heavy steel chestplate that provides excellent protection.',
      value: 250,
      type: 'Chest',
      effect: function () {
        return 1;
      }, // No effect, it's a piece of armor
    },
    {
      index: 'fire-sword', // Manually slugified name
      name: 'Fire Sword',
      description: 'A sword imbued with fire, increasing attack power.',
      value: 500,
      type: 'Weapon',
      effect: function () {
        return 1;
      }, // Equipment doesn't use effect
    },
    {
        index: 'manual-mining-potion', // Manually slugified name
        name: 'Manual Mining Potion',
        description: '2x Mining efficiency',
        value: 50,
        type: 'Consumable',
        effect: function () {
            alert('Manual Mining Potion consumed! Double mining power for 2 minutes.');

             // Store the mining boost buff in currentBuff
            currentBuff.push({
                buffType: 'miningMultiplier',
                multiplier: 2000,
                expiration: Date.now() + 120000, // 2 minutes from now
            });

            // Emit an event to notify the application about the buff
            eventBus.emit('buff-applied', 'manual-mining-boost');

            // Set a timeout to remove the buff after 2 minutes
            setTimeout(() => {
                // Remove the buff from currentBuff when the effect expires
                const index = currentBuff.findIndex(buff => buff.buffType === 'miningMultiplier');
                if (index !== -1) {
                currentBuff.splice(index, 1);
                }

                // Emit an event to notify the application that the buff has expired
                eventBus.emit('buff-expired', 'manual-mining-boost');
            }, 120000); // 2 minutes (120000 ms)
        },
    },
  ];
  

  export function initInventory() {
    let playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
    const isInventoryUnlocked = localStorage.getItem('goal_shopping_on_silk_road_unlocked')
    if (playerInventory.length === 0 && !isInventoryUnlocked) {
      const lootItem = items.find(item => item.index === 'good_new_btc');
      playerInventory.push(lootItem);
      localStorage.setItem('playerInventory', JSON.stringify(playerInventory));
    }
  }

  export function addToInventory(itemIndex) {
    const item = items.find(item => item.index === itemIndex);
    if (item) {
      let playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
      playerInventory.push(item);
      localStorage.setItem('playerInventory', JSON.stringify(playerInventory));
    }
  }