<template>
    <div class="topInfoContainer">
      <h1 class="orderText">Varukorg</h1>
      <p class="chooseDrinkText">Slutför beställning</p>
    </div>
  <NavComponent/>
  <Cart 
    :cart="cart" 
    @remove="removeFromCart" 
    @clear-cart="clearCart" 
  />

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
  },
}
}
</script>

<style>
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

.chooseDrinkText {
  font-size: 18px;
}
</style>