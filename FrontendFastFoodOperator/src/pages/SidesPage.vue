
<template>
    <div class="topInfoContainer">
      <h1 class="orderText">Beställ</h1>
      <p class="choosePizzaText">3. Välj tillbehör</p>
    </div>
        <NavComponent/>
        <SidesComponent @add-to-cart="addToCart" />
</template>

<script>
import SidesComponent from '@/components/SidesComponent.vue';
import NavComponent from '@/components/NavComponent.vue';


export default {
    name: 'SidesPage',
    props: {
    cart: Array
  },
  components: {
    SidesComponent,
    NavComponent
  },
  methods: {
    addToCart(extra) {
      this.cart.push(extra);
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