<template>
    <Cart :cart="cart" @remove=removeFromCart() />

</template>


<script>
import Cart from '@/components/CartComponent.vue';


export default {
  name: 'CartPage',
  components: {
    Cart
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

