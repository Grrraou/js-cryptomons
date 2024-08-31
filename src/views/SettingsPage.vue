<template>
    <div class="settings-page">
      <h1>Settings</h1>
      <ExportComponent />
      <ImportComponent />
    </div>
  </template>
  
  <script>
  import ExportComponent from '@/components/ExportComponent.vue'; // Adjust the path as needed
  import ImportComponent from '@/components/ImportComponent.vue'; // Adjust the path as needed
  
  export default {
    name: 'SettingsPage',
    components: {
      ExportComponent,
      ImportComponent,
    },
  };
  </script>
  
  <style scoped>
  .settings-page {
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  </style>
  