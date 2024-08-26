<template>
  <div id="app">
    <CryptoMons />
  </div>
</template>

<script>
import CryptoMons from './components/CryptoMons.vue';

export default {
  components: {
    CryptoMons,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
