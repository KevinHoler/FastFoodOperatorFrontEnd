import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useOrdersStore = defineStore('orders', () => {
  const allOrders = ref([])
  const socket = ref(null)

  const connectWebSocket = () => {
    socket.value = new WebSocket('wss://localhost:7259/ws/orders')

    socket.value.onopen = () => {
      console.log('WebSocket connected')
    }

    socket.value.onmessage = (event) => {
      const updatedOrder = JSON.parse(event.data)
      const index = allOrders.value.findIndex(o => o.id === updatedOrder.id)
      if (index !== -1) {
        allOrders.value[index] = updatedOrder
      } else {
        allOrders.value.push(updatedOrder)
      }
    }

    socket.value.onclose = () => {
      console.log('WebSocket closed')
    }

    socket.value.onerror = (err) => {
      console.error('WebSocket error', err)
    }
  }

  const fetchOrders = async () => {
    const res = await axios.get('https://localhost:7259/orders/allOrders')
    allOrders.value = res.data
  }

  const updateOrder = (updatedOrder) => {
    allOrders.value = allOrders.value.map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    )
  }

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

  const inkomnaOrdrar = computed(() => allOrders.value.filter(o => !o.isStartedInKitchen && !o.isCooked))
  const paborjadeOrdrar = computed(() => allOrders.value.filter(o => o.isStartedInKitchen && !o.isCooked))
  const fardigaOrdrar = computed(() => allOrders.value.filter(o => o.isCooked && !o.isPickedUp))
  const plockaUppOrdrar = computed(() => allOrders.value.filter(o => o.isCooked && !o.isPickedUp))
  const tillagasOrdrar = computed(() => allOrders.value.filter(o => o.isStartedInKitchen && !o.isCooked))

  return {
    allOrders,
    inkomnaOrdrar,
    paborjadeOrdrar,
    fardigaOrdrar,
    tillagasOrdrar,
    plockaUppOrdrar,
    fetchOrders,
    connectWebSocket,
    startOrder,

    completeOrder,
    pickupOrder,
  }
})