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

  <main>
    <div class="content">
      <PizzaList @add-to-cart="cart.push($event)" />
      <Cart :cart="cart" @remove="cart.splice($event, 1)" />
    </div>
  </main>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

*, *::before, *::after {
  box-sizing: border-box;
}

header {
  position: fixed;
  top: 0;
  left: 0; 
  width: 100%; 
  background-color: #79160dbe;
  z-index: 1000; 
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: rgb(18, 17, 17);
}

main {
  margin-top: 150px; 
  padding: 20px;
}

.content {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
}
</style>
