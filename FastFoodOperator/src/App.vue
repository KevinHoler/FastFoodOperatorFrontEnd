<script setup>
import Cart from './components/CartComponent.vue';
import PizzaList from './components/PizzaList.vue';
import { ref } from 'vue';

const cart = ref([]);
</script>

<template>
  <header>
    <img alt="FFO logo" class="logo" src="./assets/ffo.png" width="125" height="125" />
    <div>
      <h1>Welcome to Fast Food Operator</h1>
    </div>
  </header>

  <div>
    <PizzaList @add-to-cart="cart.push($event)" />
  </div>
  <div>
    <Cart :cart="cart" @remove="cart.splice($event, 1)" />
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Apply box-sizing to make width calculations consistent */
*, *::before, *::after {
  box-sizing: border-box;
}

header {
  position: fixed;
  top: 0;
  left: 0; /* Ensure it starts from the left */
  width: 100%; /* This ensures the header spans the full width */
  background-color: #79160dbe; /* Optional: to give it a background color */
  z-index: 1000; /* Optional: to ensure it stays above other elements */
  display: flex;
  justify-content: space-between;
}
</style>