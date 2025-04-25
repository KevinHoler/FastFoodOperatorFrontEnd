<template>
    <div class="container">
      <div class="column tillagas">
        <h1>Tillagas</h1>
        <div v-for="order in store.tillagasOrdrar" :key="order.id" class="order-id">
          Order #{{ order.id }}
        </div>
      </div>
  
      <div class="column pickup">
        <h1>Hämtas</h1>
        <div v-for="order in store.plockaUppOrdrar" :key="order.id" class="order-id">
          Order #{{ order.id }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useOrdersStore } from '@/stores/useOrdersStore.js'
  
  const store = useOrdersStore()
  
  onMounted(() => {
    store.fetchOrders()
    store.connectWebSocket()
  })
  setInterval(() => {
    store.fetchOrders()
  }, 500)

  </script>
  
  <style scoped>
  .container {
    display: flex;
    color: black;
  }
  
  .column {
    flex: 1;
    background-color: #f9f9f9;
  }
  
  .tillagas {
    height: 100vw;
    border-right: solid 2px black;
    text-align: center;
    color: orange;
  }
  
  .pickup {
    text-align: center;
    color: green;
  }
  
  .order-id {
    font-size: 1.2em;
    margin-bottom: 0px;
    font-weight: bold;
  }
  h1{
    color: black;
  }
  </style>