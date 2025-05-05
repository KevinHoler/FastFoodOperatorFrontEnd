// src/stores/useCartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const addToCart = (item) => {
    cart.value.push(item)
  }

  const removeFromCart = (index) => {
    cart.value.splice(index, 1)
  }

  const clearCart = () => {
    cart.value = []
  }

  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price, 0)
  )

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice
  }
})
