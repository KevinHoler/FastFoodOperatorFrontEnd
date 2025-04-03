<template>
    <div class="top-container">
      <h1>Beställ</h1>
      <p>1. Välj Pizza</p>
    </div>
    <NavComponent/>
    <DrinksSidesComponent @add-to-cart="addToCart" />
    <button @click="goToCartPage">Go to Cart Page</button>
</template>


<script>
import DrinksSidesComponent from '@/components/DrinksSidesComponent.vue';
import NavComponent from '@/components/NavComponent.vue';


export default {
name: 'DrinksSides',
props: {
cart: Array
},
components: {
DrinksSidesComponent,
NavComponent
},
methods: {
addToCart(drink) {
  this.cart.push(drink);
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