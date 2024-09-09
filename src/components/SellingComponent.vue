<template>
    <div class="selling-container" @drop="handleDrop" @dragover.prevent>
      <h3>Drag Items to Sell</h3>
      <div class="sell-area">Drop here to sell</div>
    </div>
  </template>
  
  <script>
  // Import the eventBus to communicate between components
  import eventBus from '@/eventBus';
import ItemManager from '@/services/ItemManager';
  
  export default {
    methods: {
      handleDrop(event) {
        event.preventDefault();
  
        const itemData = event.dataTransfer.getData('item');
        const inventoryIndex = event.dataTransfer.getData('inventoryIndex');
        const slotType = event.dataTransfer.getData('slotType'); // Retrieve the equipment slot (if any)
        const item = JSON.parse(itemData);
  
        if (item && item.value) {
          const currentCryptodollar = parseFloat(localStorage.getItem('token_cryptodollar')) || 0;
          const newCryptodollar = currentCryptodollar + item.value;
          localStorage.setItem('token_cryptodollar', newCryptodollar.toFixed(2));
  
          // If the item came from equipment, notify the equipment to clear the slot
          if (slotType) {
            eventBus.emit('inventory-item-sold', slotType); // Notify EquipementComponent to clear the slot
          }
  
          // Remove the item from the inventory if it's in there
          ItemManager.removeFromInventory(inventoryIndex);

        } else {
          console.error('Item data is invalid or has no value.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .selling-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 10px;
    border: 2px solid #444;
    border-radius: 10px;
  }
  
  .sell-area {
    width: 80%;
    height: 50px;
    border: 2px dashed #444;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  </style>
  