<template>
    <div class="import-component">
      <h3>Import Local Storage</h3>
      <input type="file" @change="importData" />
    </div>
</template>
  
<script>
import StorageManager from '@/managers/StorageManager';

  export default {
    name: 'ImportComponent',
    methods: {
      importData(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const data = JSON.parse(e.target.result);
              if (typeof data === 'object') {
                StorageManager.clear();
                Object.keys(data).forEach((key) => {
                  StorageManager.update(key, data[key]);
                });
                alert('Local storage data has been successfully imported.');
              } else {
                alert('Invalid file format.');
              }
            } catch (err) {
              alert('Error parsing the file.');
            }
          };
          reader.readAsText(file);
        }
      },
    },
  };
</script>
  
<style scoped>
  .import-component {
    margin-bottom: 20px;
  }
</style>
  