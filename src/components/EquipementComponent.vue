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
        <div
          class="equip-slot"
          :class="{ occupied: equippedItems.Head }"
          v-if="equippedItems.Head"
          draggable="true"
          @dragstart="dragItem(equippedItems.Head, 'Head', $event)" 
        >
          <p>{{ equippedItems.Head.name }}</p>
        </div>
      </div>
  
      <!-- Chest Slot -->
      <div
        class="slot"
        @dragover.prevent
        @drop="handleDrop('Chest', $event)"
        @dragenter.prevent
      >
        <p>Chest</p>
        <div
          class="equip-slot"
          :class="{ occupied: equippedItems.Chest }"
          v-if="equippedItems.Chest"
          draggable="true"
          @dragstart="dragItem(equippedItems.Chest, 'Chest', $event)" 
        >
          <p>{{ equippedItems.Chest.name }}</p>
        </div>
      </div>
  
      <!-- Weapon Slot -->
      <div
        class="slot"
        @dragover.prevent
        @drop="handleDrop('Weapon', $event)"
        @dragenter.prevent
      >
        <p>Weapon</p>
        <div
          class="equip-slot"
          :class="{ occupied: equippedItems.Weapon }"
          v-if="equippedItems.Weapon"
          draggable="true"
          @dragstart="dragItem(equippedItems.Weapon, 'Weapon', $event)" 
        >
          <p>{{ equippedItems.Weapon.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import eventBus from '@/eventBus';
  
  export default {
    data() {
      return {
        equippedItems: {
          Head: null,
          Chest: null,
          Weapon: null,
        },
      };
    },
    methods: {
      // This method handles the dragging of items from equipment
      dragItem(item, slotType, event) {
        console.log(`Dragging item: ${item.name} from ${slotType}`);
        event.dataTransfer.setData('item', JSON.stringify(item)); // Save item data for transfer
        event.dataTransfer.setData('slotType', slotType); // Save slotType to know where the item came from
      },
  
      // This method handles dropping items into the equipment slots
      handleDrop(slotType, event) {
        event.preventDefault();
        const itemData = event.dataTransfer.getData('item');
        const item = JSON.parse(itemData);
  
        console.log(`Dropped item: ${item.name} into ${slotType}`);
  
        if (item && item.type === slotType) {
          // If there's already an item in this slot, move it to the inventory
          if (this.equippedItems[slotType]) {
            this.moveToInventory(this.equippedItems[slotType]);
          }
          // Equip the new item
          this.equippedItems[slotType] = item;
          this.saveEquipment();
        } else {
          console.error(`Cannot equip ${item.name} in the ${slotType} slot (type mismatch).`);
        }
      },
  
      // Move the item back to the inventory
      moveToInventory(item) {
        let playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
        playerInventory.push(item);
        localStorage.setItem('playerInventory', JSON.stringify(playerInventory));
        eventBus.emit('inventory-updated');
      },
  
      // Save the current equipment to localStorage
      saveEquipment() {
        localStorage.setItem('playerEquipement', JSON.stringify(this.equippedItems));
      },
  
      // Load previously equipped items from localStorage
      loadEquipment() {
        const savedEquipment = JSON.parse(localStorage.getItem('playerEquipement')) || {};
        this.equippedItems = { ...this.equippedItems, ...savedEquipment };
      },
  
      // Clear the equipment slot when an item is sold
      removeFromEquipment(slotType) {
        if (this.equippedItems[slotType]) {
          console.log(`Removing item from ${slotType} slot`);
          this.equippedItems[slotType] = null;
          this.saveEquipment();
          eventBus.emit('equipment-updated');
        }
      },
    },
  
    mounted() {
      this.loadEquipment();
  
      // Listen for the item being sold from the equipment
      eventBus.on('inventory-item-sold', (slotType) => {
        this.removeFromEquipment(slotType); // Clear the equipment slot
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
    width: 15%;
    height: 15%;
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
  