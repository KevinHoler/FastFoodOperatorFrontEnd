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
    gap: 20px;
  }
  
  .column {
    flex: 1;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
  }
  
  .tillagas {
    border: 3px solid orange;
  }
  
  .pickup {
    border: 3px solid green;
  }
  
  .order-id {
    font-size: 1.2em;
    margin-bottom: 10px;
    font-weight: bold;
  }
  </style>