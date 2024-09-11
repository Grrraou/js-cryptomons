<template>
    <div class="selling-container" @drop="handleDrop" @dragover.prevent>
      <h3>Drag Items to Sell</h3>
      <div class="sell-area">Drop here to sell</div>
    </div>
</template>
  
<script>
import eventBus from '@/eventBus';
import ItemManager from '@/managers/ItemManager';
import TokenManager from '@/managers/TokenManager';
  
  export default {
    methods: {
      handleDrop(event) {
        event.preventDefault();
  
        const itemData = event.dataTransfer.getData('item');
        const inventoryIndex = event.dataTransfer.getData('inventoryIndex');
        const slotType = event.dataTransfer.getData('slotType');
        const item = JSON.parse(itemData);
  
        if (item && item.value) {
          TokenManager.addToBalance(item.value);
  
          if (slotType) {
            eventBus.emit('inventory-item-sold', slotType);
          }
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
  