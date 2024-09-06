<template>
    <h1 class="page-title">Inventory</h1>
    <div class="inventory-page">
      <!-- Top Section: Equipement and Selling -->
      <div class="top-section">
        <div class="equipement-section">
          <EquipementComponent />
        </div>
        <div class="selling-section">
          <SellingComponent />
        </div>
      </div>
  
      <!-- Bottom Section: Inventory Component (Full Width) -->
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

.page-title {
  position: relative;
  font-size: 28px; /* Slightly larger font size for emphasis */
  font-weight: bold;
  color: #444; /* Keep the white color for contrast */
  text-align: center;
  top: 0;
  margin-bottom: 20px; /* Increase the bottom margin for better spacing */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6); /* Softer, larger shadow for depth */
  background-color: transparent; /* Remove background color to avoid button-like appearance */
  padding: 0; /* Remove padding to avoid button-like appearance */
  border-radius: 0; /* Remove border radius to make it more like a title */
  letter-spacing: 1px; /* Slight letter spacing for elegance */
  text-transform: uppercase; /* Uppercase letters for a more formal look */
  border-bottom: 2px solid #ffa500; /* Add a subtle underline for emphasis */
}

  .inventory-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 10px;
    box-sizing: border-box;
  }
  
  /* Top Section: Split Equipement (90%) and Selling (10%) */
  .top-section {
    display: flex;
    width: 100%;
    height: 40%; /* Top section takes 40% of the page height */
    margin-bottom: 10px;
  }
  
  .equipement-section {
    width: 90%; /* Equipment takes 90% of the width */
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    background-size: cover;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)) center center / cover, url('@/assets/inventory/equipmentBG.png');
  }
  
  .selling-section {
    width: 10%; /* Selling takes 10% of the width */
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #f5c6cb;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)) center center / cover, url('@/assets/inventory/sellingBG.png');
  }
  
  /* Bottom Section: Full Width Scrollable Inventory */
  .inventory-section {
    width: 100%; /* Full width */
    height: 50%; /* Inventory section takes 60% of the page height */
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #e0f7fa;
    overflow-y: auto; /* Scrollable */
    display: flex;
    align-items: flex-start; /* Align items to the top */
    justify-content: flex-start; /* Align items to the left */
    flex-wrap: wrap; /* Wrap items to the next line if necessary */
    padding: 10px;
    box-sizing: border-box;
    background-size: cover;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)) center center / cover, url('@/assets/inventory/inventoryBG.png');
  }
  </style>
  