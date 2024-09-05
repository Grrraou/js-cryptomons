<template>
    <div class="selling-container" @drop="handleDrop" @dragover.prevent>
      <h3>Drag Items to Sell</h3>
      <div class="sell-area">Drop here to sell</div>
    </div>
  </template>
  
  <script>
  import eventBus from '@/eventBus';
  
  export default {
    methods: {
      handleDrop(event) {
        event.preventDefault();
  
        const itemData = event.dataTransfer.getData('item');
        const slotType = event.dataTransfer.getData('slotType'); // Retrieve the equipment slot (if any)
        const item = JSON.parse(itemData);
  
        if (item && item.value) {
          // Update the player's cryptodollar balance
          const currentCryptodollar = parseFloat(localStorage.getItem('token_cryptodollar')) || 0;
          const newCryptodollar = currentCryptodollar + item.value;
          localStorage.setItem('token_cryptodollar', newCryptodollar.toFixed(2));
  
          // Check if the item came from equipment (via slotType)
          if (slotType) {
            // Notify EquipementComponent to clear the slot
            eventBus.emit('inventory-item-sold', slotType);
          } else {
            // Remove the item from inventory only if it comes from inventory
            let playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
            const itemIndex = playerInventory.findIndex(invItem => invItem.index === item.index);
  
            if (itemIndex !== -1) {
              playerInventory.splice(itemIndex, 1);
              localStorage.setItem('playerInventory', JSON.stringify(playerInventory));
              // Emit an event to notify InventoryComponent to update the UI
              eventBus.emit('inventory-updated');
            } else {
              console.error('Item not found in the inventory.');
            }
          }
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
    background-color: #ffcccb;
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
  