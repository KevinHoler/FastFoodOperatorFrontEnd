<template>
    <div class="kitchen-view">
      <div class="order-column">
        <h2>Inkomna Ordrar</h2>
        <OrderCard class="order-column-incoming"
          v-for="order in store.inkomnaOrdrar"
          :key="order.id"
          :order="order"
          @click="store.startOrder(order.id)"
        />
      </div>
  
      <div class="order-column">
        <h2>Påbörjade Ordrar</h2>
        <OrderCard class="order-column-started"
          v-for="order in store.paborjadeOrdrar"
          :key="order.id"
          :order="order"
          @click="store.completeOrder(order.id)"
        />
      </div>
  
      <div class="order-column">
        <h2>Färdiga Ordrar</h2>
        <OrderCard class="order-column-done"
          v-for="order in store.fardigaOrdrar"
          :key="order.id"
          :order="order"
          @click="store.pickupOrder(order.id)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useOrdersStore } from '@/stores/useOrdersStore.js'
  import OrderCard from '@/components/OrderCard.vue'
  
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
  .kitchen-view {
    display: flex;
    justify-content: space-between;
    gap: 0px;
    color: black;
  }
  
  .order-column {
    flex: 1;
    background: #f2f2f2;
    padding: 1px;
    border-radius: 0px;
    text-align: left;
  }
  .order-column-incoming {
    border: solid red 2px;
  }
  .order-column-started {
    border: solid yellow 2px;
  }
  .order-column-done {
    border: solid green 2px;
  }
  h2{
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
  </style>