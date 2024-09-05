<template>
  <div class="inventory-container" @dragover.prevent @drop="handleDrop">
    <div 
      class="item" 
      v-for="(item, index) in items" 
      :key="index" 
      draggable="true" 
      @dragstart="dragItem(item, $event)">
      <p>{{ item.name }} ({{ item.type }})</p>
    </div>
  </div>
</template>

<script>
// Import the eventBus to listen for updates
import eventBus from '@/eventBus';

export default {
  data() {
    return {
      items: [], // Inventory items will be loaded from localStorage
    };
  },
  methods: {
    dragItem(item, event) {
      event.dataTransfer.setData('item', JSON.stringify(item));
      // We assume items from the inventory don't need slotType, so no slotType is added here
    },

    handleDrop(event) {
      const itemData = event.dataTransfer.getData('item');
      const slotType = event.dataTransfer.getData('slotType'); // Get slotType if the item came from equipment
      const item = JSON.parse(itemData);

      // Add the item back to the inventory
      let playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
      playerInventory.push(item);
      localStorage.setItem('playerInventory', JSON.stringify(playerInventory));

      // If the item came from the equipment, notify EquipementComponent to clear the slot
      if (slotType) {
        eventBus.emit('inventory-item-dropped', slotType); // Notify EquipementComponent to clear the slot
      }

      // Emit event to notify other components if necessary
      eventBus.emit('inventory-updated');

      // Reload the inventory after the item is added
      this.loadInventory();
    },

    loadInventory() {
      const inventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
      this.items = inventory;
    },
  },
  mounted() {
    this.loadInventory();

    // Listen for inventory updates
    eventBus.on('inventory-updated', this.loadInventory);
  },
  beforeUnmount() {
    // Clean up the event listener when the component is destroyed
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
</style>
