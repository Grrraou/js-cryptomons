<template>
    <div class="inventory-container">
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
        console.log(`Dragging item: ${item.name} (Type: ${item.type})`); // Log the item being dragged
        event.dataTransfer.setData('item', JSON.stringify(item));
      },
      loadInventory() {
        const inventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
        console.log('Loaded inventory from localStorage:', inventory); // Log the loaded inventory
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
  