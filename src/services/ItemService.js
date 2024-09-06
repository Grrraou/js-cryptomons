export const items = [
    {
      index: 'iron-helmet', // Manually slugified name
      name: 'Iron Helmet',
      description: 'A sturdy helmet made of iron that protects the head.',
      value: 100,
      type: 'Head',
      effect: null, // Equipment generally won't have an "effect" function
    },
    {
      index: 'steel-chestplate', // Manually slugified name
      name: 'Steel Chestplate',
      description: 'A heavy steel chestplate that provides excellent protection.',
      value: 250,
      type: 'Chest',
      effect: null, // No effect, it's a piece of armor
    },
    {
      index: 'fire-sword', // Manually slugified name
      name: 'Fire Sword',
      description: 'A sword imbued with fire, increasing attack power.',
      value: 500,
      type: 'Weapon',
      effect: null, // Equipment doesn't use effect
    },
    {
      index: 'healing-potion', // Manually slugified name
      name: 'Healing Potion',
      description: 'A magical potion that restores 50 HP.',
      value: 50,
      type: 'Consumable',
      effect: function () {
        alert('healing potion consumed');
      }, // Effect function for a consumable
    },
    {
      index: 'speed-elixir', // Manually slugified name
      name: 'Speed Elixir',
      description: 'An elixir that increases speed for 30 seconds.',
      value: 75,
      type: 'Consumable',
      effect: function () {
        alert('speed elixir consumed');
      }, // Effect for speed boost
    },
  ];
  