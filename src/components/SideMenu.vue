<template>
    <div class="side-menu">
      <div class="side-menu-container">
        <div class="logo-container">
          <img src="@/assets/mainLogo.png" alt="Cryptomons Logo" class="logo" />
        </div>
        <nav>
          <ul>
            <li>
              <router-link to="/">🏠 Home</router-link>
            </li>
            <li>
              <router-link to="/mines">⛏️ Mines</router-link>
            </li>
            <li>
              <router-link to="/staking">🔒 Staking</router-link>
            </li>
            <li>
              <router-link to="/vault">🏛️ Vault</router-link>
            </li>
            <li>
              <router-link to="/battle">⚔️ Battle</router-link>
            </li>
            <li>
              <router-link to="/inventory">📦 Inventory</router-link>
            </li>
            <li>
              <router-link to="/swap">🔄 Swap</router-link>
            </li>
            <li>
              <router-link to="/achievements">🏆 Achievements</router-link>
            </li>
            <li>
              <router-link to="/stats">📊 Stats</router-link>
            </li>
            <li>
              <router-link to="/settings">⚙️ Settings</router-link>
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
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, #1a1a1d, #4e4e50);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  margin-bottom: 20px;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
}

.logo-container:hover .logo {
  transform: scale(1.1);
}

  .side-menu {
    width: 160px;
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

  nav ul li a:hover {
    font-size: 1.2em;
  }
  
  nav ul li a.router-link-active {
    color: #42b983;
  }
  </style>
  