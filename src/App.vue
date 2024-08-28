<template>
  <div class="layout">
    <!-- Use the SideMenu component here -->
    <SideMenu />

    <!-- Main content area -->
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import SideMenu from './components/SideMenu.vue';

export default {
  components: {
    SideMenu,
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh; /* Full viewport height */
}

.page-content {
  flex: 1; /* Fills the remaining space */
  padding: 20px;
  background-color: #fff;
}
</style>
