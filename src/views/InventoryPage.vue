<template>
    <div class="inventory-page">
      <!-- Equipement Component (RPG Equipement Style) -->
      <div class="equipement-section">
        <EquipementComponent />
      </div>
  
      <!-- Selling Component (Drag and Drop to Sell) -->
      <div class="selling-section">
        <SellingComponent />
      </div>
  
      <!-- Inventory Component (Scrollable List of Items) -->
      <div class="inventory-section">
        <InventoryComponent />
      </div>
    </div>
  </template>
  
  <script>
  import EquipementComponent from '@/components/EquipementComponent.vue';
  import SellingComponent from '@/components/SellingComponent.vue';
  import InventoryComponent from '@/components/InventoryComponent.vue';
  
  export default {
    components: {
      EquipementComponent,
      SellingComponent,
      InventoryComponent,
    },
  };
  </script>
  
  <style scoped>
  .inventory-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
  
  .equipement-section {
    width: 70%; /* Adjust as needed */
    height: 40%; /* Equipement section takes 40% of the height */
    background-color: #f0f0f0; /* Just for visualization, adjust as needed */
    margin-bottom: 10px; /* Space between sections */
  }
  
  .selling-section {
    position: absolute;
    right: 0;
    top: 0;
    width: 25%; /* Adjust width of the selling section */
    height: 40%; /* Same height as the equipement section */
    background-color: #f5c6cb; /* Just for visualization, adjust as needed */
    margin-left: 10px;
  }
  
  .inventory-section {
    width: 100%;
    height: 50%; /* Inventory section takes the remaining 50% of the page */
    background-color: #e0f7fa; /* Just for visualization, adjust as needed */
    overflow-y: scroll;
    margin-top: 10px; /* Space between sections */
  }
  </style>
  