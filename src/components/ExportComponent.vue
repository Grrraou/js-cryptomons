<template>
    <div class="export-component">
      <h3>Export Local Storage</h3>
      <button @click="exportData">Download Local Storage Data</button>
    </div>
</template>
  
<script>
import StorageManager from '@/managers/StorageManager';

  export default {
    name: 'ExportComponent',
    methods: {
      exportData() {
        const data = JSON.stringify(StorageManager.storage);
        const blob = new Blob([data], { type: 'text/plain' });
  
        const now = new Date();
        const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
        const time = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS
        const filename = `CryptoMons_${date}_${time}.txt`;
  
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
    },
  };
</script>

<style scoped>
  .export-component {
    margin-bottom: 20px;
  }
</style>
  