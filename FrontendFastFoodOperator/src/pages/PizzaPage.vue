<template>
        <!-- <div class="top-container">
          <h1>Beställ</h1>
          <p>1. Välj Pizza</p>
        </div> -->
        <!-- <NavComponent/> -->
        <PizzaList @add-to-cart="addToCart" />
        <button @click="goToCartPage">Go to Cart Page</button>
</template>


<script>
import NavComponent from '@/components/NavComponent.vue';
import PizzaList from '@/components/PizzaList.vue';


export default {
    name: 'PizzaPage',
    props: {
    cart: Array
  },
  components: {
    PizzaList,
    NavComponent
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
<style>
.top-container{
  color: black;
}
</style>