<template>
    <div class="inventory-container" @dragover.prevent @drop="handleDrop">
      <div 
        class="item" 
        v-for="(item, index) in items" 
        :key="index" 
        draggable="true" 
        @dragstart="dragItem(item, $event)"
      >
        <p>{{ item.name }} ({{ item.type }})</p>
  
        <!-- Consumable Button: Visible only for consumable items -->
        <button v-if="item.type === 'Consumable'" class="consume-btn" @click="consumeItem(item, index)">
          Use
        </button>
      </div>
    </div>
  </template>
  
  <script>
  // Import the eventBus to listen for updates
  import eventBus from '@/eventBus';
import ItemManager from '@/services/ItemManager';
  // Import the items from ItemService
  
  export default {
    data() {
      return {
        items: [], // Inventory items will be loaded from localStorage
      };
    },
    methods: {
      dragItem(item, event) {
        event.dataTransfer.setData('item', JSON.stringify(item));
        event.dataTransfer.setData('slotType', null);
      },
  
      handleDrop(event) {
        const itemData = event.dataTransfer.getData('item');
        const slotType = event.dataTransfer.getData('slotType');
        const item = JSON.parse(itemData);
  
        let playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
        playerInventory.push(item);
        localStorage.setItem('playerInventory', JSON.stringify(playerInventory));
  
        if (slotType) {
          eventBus.emit('inventory-item-dropped', slotType);
        }
  
        eventBus.emit('inventory-updated');
        this.loadInventory();
      },
  
      loadInventory() {
        const inventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
  
        // Map over the inventory and find the matching item in ItemService.js
        this.items = inventory.map(item => {
          // Find the item by its index
          const originalItem = ItemManager.getItem(item.index);
  
          // If found, restore its effect function
          if (originalItem && originalItem.effect) {
            item.effect = originalItem.effect;
          }
  
          return item;
        });
      },
  
      // Consume a consumable item
      consumeItem(item, index) {
        if (typeof item.effect === 'function') {
          item.effect(); // Execute the item's effect function
        }
  
        // Remove the item from the inventory
        this.items.splice(index, 1);
        localStorage.setItem('playerInventory', JSON.stringify(this.items));
        eventBus.emit('inventory-updated');
      }
    },
    mounted() {
      this.loadInventory();
      eventBus.on('inventory-updated', this.loadInventory);
    },
    beforeUnmount() {
      eventBus.off('inventory-updated', this.loadInventory);
    },
  };
  </script>
  
  <style scoped>
  .inventory-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    overflow-y: auto;
    height: 100%;
    max-height: 400px;
    border: 2px solid #ccc;
    border-radius: 5px;
  }
  
  .item {
    position: relative; /* Enable relative positioning for the consume button */
    width: 150px;
    height: 100px;
    background-color: #ddd;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #444;
    border-radius: 5px;
    cursor: grab;
    text-align: center;
  }
  
  .item:hover {
    background-color: #ccc;
  }
  
  .consume-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 2px 6px;
    font-size: 12px;
    background-color: #ff5c5c;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .consume-btn:hover {
    background-color: #ff0000;
  }
  </style>
  