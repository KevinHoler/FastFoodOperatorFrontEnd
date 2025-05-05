<template>
    <div class="topInfoContainer">
      <h1 class="orderText">Beställ</h1>
      <p class="chooseDrinkText">2. Välj dryck</p>
    </div>
    <NavComponent/>
    <DrinksComponent @add-to-cart="addToCart" />
</template>


<script>
import DrinksComponent from '@/components/DrinksComponent.vue';
import NavComponent from '@/components/NavComponent.vue';

export default {
name: 'Drinks',
props: {
cart: Array
},
components: {
DrinksComponent,
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

<style scoped>
.topInfoContainer {
  padding: 20px;
  color:black;
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