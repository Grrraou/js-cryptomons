<template>
    <div class="side-menu">
      <div class="side-menu-container">
        <nav>
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/mines">Mines</router-link>
            </li>
            <li>
              <router-link to="/staking">Staking</router-link>
            </li>
            <li>
              <router-link to="/vault">Vault</router-link>
            </li>
            <li>
              <router-link to="/swap">Swap</router-link>
            </li>
            <li>
              <router-link to="/achievements">Achievements</router-link>
            </li>
            <li>
              <router-link to="/stats">Stats</router-link>
            </li>
            <li>
              <router-link to="/settings">Settings</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SideMenu',
  };
  </script>
  
  <style scoped>
  .side-menu {
    width: 250px;
    padding: 20px;
  }

  .side-menu-container {
    position: fixed;
    height: 100vh;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav ul li {
    margin: 10px 0;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  
  nav ul li a.router-link-active {
    color: #42b983;
  }
  </style>
  