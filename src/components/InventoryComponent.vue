<template>
    <div class="inventory-container" @dragover.prevent @drop="handleDrop">
        <ItemThumb 
          class="item" 
          v-for="(item, index) in items" 
          :key="index" 
          :item="item"
          :inventoryIndex="index"
          draggable="true" 
          @dragstart="dragItem(item, index, $event)"
        /> 
    </div>
</template>
  
  <script>
  // Import the eventBus to listen for updates
import eventBus from '@/eventBus';
import ItemManager from '@/services/ItemManager';
import ItemThumb from './ItemThumb.vue';
  // Import the items from ItemService
  
    export default {
      components: {
        ItemThumb,
      },
      setup() {
        return {
          ItemManager,
          StorageManager,
        };
      },
    data() {
      return {
        items: ItemManager.getInventory(), // Inventory items will be loaded from localStorage
      };
    },
    methods: {
      dragItem(item, inventoryIndex, event) {
        event.dataTransfer.setData('item', JSON.stringify(item));
        event.dataTransfer.setData('inventoryIndex', inventoryIndex);
        event.dataTransfer.setData('slotType', null);
      },
      handleDrop(event) {
        //const itemData = event.dataTransfer.getData('item');
        const itemIndex = event.dataTransfer.getData('itemIndex');
        const slotType = event.dataTransfer.getData('slotType');
        //const item = JSON.parse(itemData);
        
        if (slotType !== 'null') {
          ItemManager.addToInventory(itemIndex);
          if (slotType) {
            eventBus.emit('inventory-item-dropped', slotType);
          }

          eventBus.emit('inventory-updated');
        }
      },
      loadInventory() {
        const inventory = ItemManager.getInventory();
  
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
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
    overflow-y: auto;
    height: 100%;
    max-height: 400px;
    border: 2px solid #ccc;
    border-radius: 5px;
  }

  </style>
  