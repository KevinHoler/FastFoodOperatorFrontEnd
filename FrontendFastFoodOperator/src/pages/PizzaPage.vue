<template>
    <div class="topInfoContainer">
      <h1 class="orderText">Beställ</h1>
      <p class="choosePizzaText">1. Välj Pizza</p>
    </div>
        <NavComponent/>
        <PizzaList @add-to-cart="addToCart" />
        <!-- <button @click="goToCartPage">Go to Cart Page</button> -->
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