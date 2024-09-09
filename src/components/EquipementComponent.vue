<template>
    <div class="equipement-container">
      <!-- Head Slot -->
      <div
        class="slot"
        @dragover.prevent
        @drop="handleDrop('Head', $event)"
        @dragenter.prevent
      >
        <p>Head</p>
        <ItemThumb
          class="equip-slot"
          :class="{ occupied: equippedItems.Head }"
          :item="equippedItems.Head"
          v-if="equippedItems.Head"
          draggable="true"
          @dragstart="dragItem(equippedItems.Head, 'Head', $event)"
        />
      </div>
  
      <!-- Chest Slot -->
      <div
        class="slot"
        @dragover.prevent
        @drop="handleDrop('Chest', $event)"
        @dragenter.prevent
      >
        <p>Chest</p>
        <ItemThumb
          class="equip-slot"
          :class="{ occupied: equippedItems.Chest }"
          :item="equippedItems.Chest"
          v-if="equippedItems.Chest"
          draggable="true"
          @dragstart="dragItem(equippedItems.Chest, 'Chest', $event)"
        />
      </div>
  
      <!-- Weapon Slot -->
      <div
        class="slot"
        @dragover.prevent
        @drop="handleDrop('Weapon', $event)"
        @dragenter.prevent
      >
        <p>Weapon</p>
        <ItemThumb
          class="equip-slot"
          :class="{ occupied: equippedItems.Weapon }"
          :item="equippedItems.Weapon"
          v-if="equippedItems.Weapon"
          draggable="true"
          @dragstart="dragItem(equippedItems.Weapon, 'Weapon', $event)"
        />
      </div>
    </div>
  </template>
  
<script>
import eventBus from '@/eventBus';
import ItemManager from '@/services/ItemManager';
import ItemThumb from './ItemThumb.vue';
  
export default {
    components: {
        ItemThumb,
    },
    data() {
      return {
        equippedItems: ItemManager.getEquipement(),
      };
    },
    methods: {
      dragItem(item, slotType, event) {
        event.dataTransfer.setData('item', JSON.stringify(item));
        event.dataTransfer.setData('itemIndex', item.index);
        event.dataTransfer.setData('slotType', slotType);
      },
      handleDrop(slotType, event) {
        event.preventDefault();
        const itemData = event.dataTransfer.getData('item');
        const inventoryIndex = event.dataTransfer.getData('inventoryIndex');
        const item = JSON.parse(itemData);
  
        if (item && item.type === slotType) {
          ItemManager.equipItem(item.index, item.type);
          ItemManager.removeFromInventory(inventoryIndex);
        } else {
          console.error(`Cannot equip ${item.name} in the ${slotType} slot (type mismatch).`);
        }
      },
    },
    mounted() {
      eventBus.on('equipment-updated', () => {
        this.equippedItems = { ...this.equippedItems, ...ItemManager.getEquipement() };
      });
      eventBus.on('inventory-item-sold', (slotType) => {
        ItemManager.unequipItem(slotType)
      });
      eventBus.on('inventory-item-dropped', (slotType) => {
        ItemManager.unequipItem(slotType)
      });
    },
};
</script>
  
  <style scoped>
  .equipement-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 10px;
  }
  
  .slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #fff;
  }
  
  .equip-slot {
    width: 100px;
    height: 100px;
    background-color: #ddd;
    margin-top: 10px;
    border-radius: 5px;
  }
  
  .equip-slot.occupied {
    background-color: #ffeb3b;
  }
  </style>
  