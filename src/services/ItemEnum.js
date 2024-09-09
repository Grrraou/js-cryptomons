import { useToast } from 'vue-toastification';
import ItemManager from './ItemManager';


export const itemsEnum = [
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
        description: '2x Mining efficiency for 2 minutes',
        value: 50,
        type: 'Consumable',
        effect: function () {
             ItemManager.startBuff({
                type: 'miningMultiplier',
                source: 'manual-mining-potion',
                multiplier: 2000,
                expiration: 120000, // 2 minutes from now
            })
        },
    },
  ];
