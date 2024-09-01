<template>
    <div class="home-page game-container">
      <h1 class="page-title">Cryptomons clicker</h1>
      <p>Welcome to the game!</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
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

  .home-page {
    padding-left: 220px; /* Space for the side menu */
    margin-top: 50px;
  }
  </style>
  