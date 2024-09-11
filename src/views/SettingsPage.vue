<template>
    <div class="settings-page game-container">
      <h1 class="page-title">Settings <InfoBubble page="settings" /></h1>
      <ExportComponent />
      <ImportComponent />
    </div>
</template>
  
<script>
import ExportComponent from '@/components/ExportComponent.vue';
import ImportComponent from '@/components/ImportComponent.vue';
import InfoBubble from '@/components/InfoBubble.vue';
  
  export default {
    name: 'SettingsPage',
    components: {
      ExportComponent,
      ImportComponent,
      InfoBubble,
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
    display:flex;
  justify-content: center;
  align-items: center;
  }

  .settings-page {
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
  }
</style>
  