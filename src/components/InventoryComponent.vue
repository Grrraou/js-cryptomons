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
import eventBus from '@/eventBus';
import ItemManager from '@/managers/ItemManager';
import ItemThumb from '@/components/ItemThumb.vue';
  
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
        items: ItemManager.getInventory(),
      };
    },
    methods: {
      dragItem(item, inventoryIndex, event) {
        event.dataTransfer.setData('item', JSON.stringify(item));
        event.dataTransfer.setData('inventoryIndex', inventoryIndex);
        event.dataTransfer.setData('slotType', null);
      },
      handleDrop(event) {
        const itemIndex = event.dataTransfer.getData('itemIndex');
        const slotType = event.dataTransfer.getData('slotType');
        
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
        this.items = inventory.map(item => {
          const originalItem = ItemManager.getItem(item.index);

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
  