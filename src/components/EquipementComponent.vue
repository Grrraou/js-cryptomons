<template>
    <div class="equipement-container">
      <!-- Head Slot -->
      <div 
        class="slot" 
        @dragover.prevent 
        @drop="handleDrop('Head', $event)" 
        @dragenter.prevent>
        <p>Head</p>
        <div class="equip-slot" :class="{ occupied: equippedItems.Head }">
          <p v-if="equippedItems.Head">{{ equippedItems.Head.name }}</p>
        </div>
      </div>
  
      <!-- Chest Slot -->
      <div 
        class="slot" 
        @dragover.prevent 
        @drop="handleDrop('Chest', $event)" 
        @dragenter.prevent>
        <p>Chest</p>
        <div class="equip-slot" :class="{ occupied: equippedItems.Chest }">
          <p v-if="equippedItems.Chest">{{ equippedItems.Chest.name }}</p>
        </div>
      </div>
  
      <!-- Weapon Slot -->
      <div 
        class="slot" 
        @dragover.prevent 
        @drop="handleDrop('Weapon', $event)" 
        @dragenter.prevent>
        <p>Weapon</p>
        <div class="equip-slot" :class="{ occupied: equippedItems.Weapon }">
          <p v-if="equippedItems.Weapon">{{ equippedItems.Weapon.name }}</p>
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
      handleDrop(slotType, event) {
        event.preventDefault();
        const itemData = event.dataTransfer.getData('item');
        const item = JSON.parse(itemData);
  
        console.log(`Dropped item: ${item.name} (Type: ${item.type}) onto ${slotType} slot`); // Log the dropped item and target slot
  
        // Check if the item matches the slot type
        if (item && item.type === slotType) {
          console.log(`Equipping ${item.name} in the ${slotType} slot`);
  
          // If there is already an item in this slot, move it back to the inventory
          if (this.equippedItems[slotType]) {
            console.log(`Moving ${this.equippedItems[slotType].name} back to inventory`);
            this.moveToInventory(this.equippedItems[slotType]);
          }
  
          // Equip the new item
          this.equippedItems[slotType] = item;
          this.removeFromInventory(item);
          this.saveEquipment();
        } else {
          console.error(`Cannot equip ${item.name} in the ${slotType} slot (type mismatch).`);
        }
      },
  
      moveToInventory(item) {
        console.log(`Returning ${item.name} to inventory`);
        let playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
        playerInventory.push(item);
        localStorage.setItem('playerInventory', JSON.stringify(playerInventory));
        eventBus.emit('inventory-updated');
      },
  
      removeFromInventory(item) {
        let playerInventory = JSON.parse(localStorage.getItem('playerInventory')) || [];
        const itemIndex = playerInventory.findIndex(invItem => invItem.index === item.index);
  
        if (itemIndex !== -1) {
          console.log(`Removing ${item.name} from inventory`);
          playerInventory.splice(itemIndex, 1);
          localStorage.setItem('playerInventory', JSON.stringify(playerInventory));
          eventBus.emit('inventory-updated');
        } else {
          console.error(`${item.name} not found in inventory`);
        }
      },
  
      saveEquipment() {
        console.log('Saving equipped items to localStorage', this.equippedItems);
        localStorage.setItem('playerEquipement', JSON.stringify(this.equippedItems));
      },
  
      loadEquipment() {
        const savedEquipment = JSON.parse(localStorage.getItem('playerEquipement')) || {};
        console.log('Loaded equipped items from localStorage:', savedEquipment);
        this.equippedItems = { ...this.equippedItems, ...savedEquipment };
      },
    },
    mounted() {
      this.loadEquipment();
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
  