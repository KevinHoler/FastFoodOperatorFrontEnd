<template>
        <div class="topInfoContainer">
      <h1 class="orderText">Beställ</h1>
      <p class="choosePizzaText">1. Välj Pizza</p>
    </div>
        <NavComponent/>
        <PizzaList @add-to-cart="addToCart" />
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
.topInfoContainer {
  padding: 20px;
  color:black;
}
.orderText {
  font-size: 35px;
  font-weight: 900;
  text-decoration-line: underline;
}

.choosePizzaText {
  font-size: 20px;
}
</style>