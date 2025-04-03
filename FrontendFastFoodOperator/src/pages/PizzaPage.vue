<template>
        <PizzaList @add-to-cart="addToCart" />
        <button @click="goToCartPage">Go to Cart Page</button>
</template>


<script>
import PizzaList from '@/components/PizzaList.vue';


export default {
    name: 'PizzaPage',
    props: {
    cart: Array
  },
  components: {
    PizzaList
  },
  methods: {
    addToCart(pizza) {
      this.cart.push(pizza);
    },
    goToCartPage() {
        this.$router.push({ name: 'Cart' });
    }
  }
}
</script>