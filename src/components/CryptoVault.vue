<template>
    <div class="crypto-vault">
      <h3>{{ title }}</h3>
      <p class="value">{{ formattedValue }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CryptoVault',
    props: {
      title: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    computed: {
      formattedValue() {
        // You can format the float value here if needed, for example, to two decimal places
        return this.value.toFixed(2);
      },
    },
  };
  </script>
  
  <style scoped>
  .crypto-vault {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .crypto-vault h3 {
    margin: 0 0 5px;
    font-size: 18px;
  }
  
  .crypto-vault .value {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  </style>
  