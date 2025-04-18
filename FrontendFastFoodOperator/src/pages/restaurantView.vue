<template>
    <div class="container">
      <div class="column tillagas">
        <h1>Tillagas</h1>
        <div
          v-for="order in tillagasOrdrar"
          :key="order.id"
          class="order-id"
        >
          Order #{{ order.id }}
        </div>
      </div>
  
      <div class="column pickup">
        <h1>Plocka upp</h1>
        <div
          v-for="order in plockaUppOrdrar"
          :key="order.id"
          class="order-id"
        >
          Order #{{ order.id }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  const allOrders = ref([])
  
  onMounted(async () => {
    const res = await axios.get('https://localhost:7259/orders/allOrders')
    allOrders.value = res.data
  })
  
  const tillagasOrdrar = computed(() =>
    allOrders.value.filter(order => order.isStartedInKitchen && !order.isCooked)
  )
  
  const plockaUppOrdrar = computed(() =>
    allOrders.value.filter(order => order.isCooked && !order.isPickedUp)
  )
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
  