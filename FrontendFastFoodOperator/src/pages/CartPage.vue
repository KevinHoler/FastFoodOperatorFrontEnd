<template>
    <div class="top-container">
          <h1>Kassa</h1>
          <p>Din beställning</p>
    </div>
    <NavComponent/>
    <Cart :cart="cart" @remove="removeFromCart" />

</template>

<script>
import Cart from '@/components/CartComponent.vue';
import NavComponent from '@/components/NavComponent.vue';

export default {
  name: 'CartPage',
  components: {
    Cart,
    NavComponent
  },
  props: {
    cart: Array
  },
  methods: {
    removeFromCart(index) {
      this.cart.splice(index, 1);
    }
  },
  props: {
    cart: Array
  },
}
</script>

<style>
.top-container{
  color: black;
}
</style>

