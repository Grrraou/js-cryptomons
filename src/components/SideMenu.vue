<template>
    <div class="side-menu">
      <nav>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/mines">Mines</router-link>
          </li>
          <li>
            <router-link to="/achievements">Achievements</router-link>
          </li>
          <li>
            <router-link to="/stats">Stats</router-link>
          </li>
        </ul>
      </nav>
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
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
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
  