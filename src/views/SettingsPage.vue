<template>
    <div class="settings-page game-container">
      <h1 class="page-title">Settings</h1>
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

  .settings-page {
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  </style>
  