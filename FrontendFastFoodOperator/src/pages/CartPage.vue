<template>
  <div class="topInfoContainer">
      <h1 class="orderText">Kassa</h1>
      <p class="choosePizzaText">Din beställning</p>
    </div>
  <NavComponent />
  <Cart :cart="cartStore.cart" @remove="removeFromCart" @clear-cart="clearCart" />
</template>

<script setup>
import Cart from '@/components/CartComponent.vue'
import NavComponent from '@/components/NavComponent.vue'
import { useCartStore } from '@/stores/useCartStore'

const cartStore = useCartStore()

function removeFromCart(index) {
  cartStore.removeFromCart(index)
}

function clearCart() {
  cartStore.clearCart()
}
</script>
<style scoped>
.topInfoContainer {
  padding: 20px;
  color: #333;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
}
.orderText {
  font-size: 33px;
  font-weight: 900;
  text-decoration-line: underline;
}

.choosePizzaText {
  font-size: 18px;
}
</style>
