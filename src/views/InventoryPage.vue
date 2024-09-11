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
  font-size: 28px;
  font-weight: bold;
  color: #444;
  text-align: center;
  top: 0;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 2px solid #ffa500;
}

  .inventory-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .top-section {
    display: flex;
    width: 100%;
    height: 40%;
    margin-bottom: 10px;
  }
  
  .equipement-section {
    width: 90%;
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
    width: 10%;
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #f5c6cb;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)) center center / cover, url('@/assets/inventory/sellingBG.png');
  }
  
  .inventory-section {
    width: 100%;
    height: 50%;
    border: 2px solid #444;
    border-radius: 10px;
    background-color: #e0f7fa;
    overflow-y: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    background-size: cover;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)) center center / cover, url('@/assets/inventory/inventoryBG.png');
  }
</style>
  