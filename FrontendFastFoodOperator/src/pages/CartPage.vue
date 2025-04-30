<template>
  <div class="top-container">
        <h1>Kassa</h1>
        <p>Din beställning</p>
  </div>
  <NavComponent/>
  <Cart :cart="cart" @remove="removeFromCart" @clear-cart="clearCart" />

</template>

<script scoped>
import Cart from '@/components/CartComponent.vue';
import NavComponent from '@/components/NavComponent.vue';
import ReceiptPage from './ReceiptPage.vue';

export default {
name: 'CartPage',
components: {
  Cart,
  NavComponent,
  ReceiptPage
},
props: {
  cart: Array
},
methods: {
  removeFromCart(index) {
    this.cart.splice(index, 1);
  },
  clearCart() {
    this.cart.splice(0);
  }
}
}
</script>

<style>
.top-container{
color: black;
}
</style>