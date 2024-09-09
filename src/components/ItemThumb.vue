<template>
    <div class="item">
        <p>{{ item.name }} ({{ item.type }})</p>
  
        <!-- Consumable Button: Visible only for consumable items -->
        <button v-if="item.type === 'Consumable'" class="consume-btn" @click="ItemManager.consumeItem(item.index)">
          Use
        </button>
    </div>
</template>

<script>
import ItemManager from '@/services/ItemManager';


export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        
      };
    },
    setup() {
      return {
        ItemManager,
      };
    },
    methods: {
    /* dragStart(event, hero) {
      event.dataTransfer.setData('heroData', JSON.stringify(hero));
    }, */
  },
};
</script>

<style scoped>
  .item {
    position: relative; /* Enable relative positioning for the consume button */
    width: 150px;
    height: 100px;
    background-color: #ddd;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #444;
    border-radius: 5px;
    cursor: grab;
    text-align: center;
  }
  
  .item:hover {
    background-color: #ccc;
  }
  
  .consume-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 2px 6px;
    font-size: 12px;
    background-color: #ff5c5c;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .consume-btn:hover {
    background-color: #ff0000;
  }
</style>