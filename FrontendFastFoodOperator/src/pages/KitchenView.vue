<template>
    <div class="kitchen-view">
      <div class="order-column">
        <h2>Inkomna Ordrar</h2>
        <OrderCard class="order-column-incoming"
          v-for="order in inkomnaOrdrar"
          :key="order.id"
          :order="order"
          @click="startOrder(order.id)"
        />
      </div>
  
      <div class="order-column">
        <h2>Påbörjade Ordrar</h2>
        <OrderCard class="order-column-started"
          v-for="order in paborjadeOrdrar"
          :key="order.id"
          :order="order"
          @click="completeOrder(order.id)"
        />
      </div>
  
      <div class="order-column">
        <h2>Färdiga Ordrar</h2>
        <OrderCard class="order-column-done"
          v-for="order in fardigaOrdrar"
          :key="order.id"
          :order="order"
          @click="pickupOrder(order.id)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  import OrderCard from '@/components/OrderCard.vue'
  
  const allOrders = ref([])
  
  onMounted(async () => {
  const res = await axios.get('https://localhost:7259/orders/allOrders')
  allOrders.value = res.data.map(order => ({
    ...order,
    pizzas: order.pizzas || [],
    drinks: order.drinks || [],
    extras: order.extras || [],
    notes: order.notes || null
  }))
})
  
  const inkomnaOrdrar = computed(() =>
  allOrders.value.filter(o => !o.isStartedInKitchen && !o.isCooked)
)

const paborjadeOrdrar = computed(() =>
  allOrders.value.filter(o => o.isStartedInKitchen && !o.isCooked)
)

const fardigaOrdrar = computed(() =>
  allOrders.value.filter(o => o.isCooked && !o.isPickedUp)
)
  const startOrder = async (orderId) => {
  const res = await axios.put(`https://localhost:7259/orders/${orderId}/IsStartedInKitchen`)
  updateOrder(res.data)
}

const completeOrder = async (orderId) => {
  const res = await axios.put(`https://localhost:7259/orders/${orderId}/DoneInKitchen`)
  updateOrder(res.data)
}

const pickupOrder = async (orderId) => {
  const res = await axios.put(`https://localhost:7259/orders/${orderId}/IsCollectedByCustomer`)
  updateOrder(res.data)
}

const updateOrder = (updatedOrder) => {
  console.log('Updating order:', updatedOrder)
  allOrders.value = allOrders.value.map(order =>
    order.id === updatedOrder.id ? updatedOrder : order
  )
  console.log('Updated orders:', allOrders.value)
}


  </script>
  
  <style scoped>
  .kitchen-view {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    color: black;
  }
  
  .order-column {
    flex: 1;
    background: #f2f2f2;
    padding: 10px;
    border-radius: 10px;
  }
  .order-column-incoming {
    border: solid red 5px;
  }
  .order-column-started {
    border: solid yellow 5px;
  }
  .order-column-done {
    border: solid green 5px;
  }
  </style>
  