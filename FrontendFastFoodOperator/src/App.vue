<script setup>
import Cart from './components/CartComponent.vue';
import PizzaList from './components/PizzaList.vue';
import { ref } from 'vue';

const cart = ref([]);
const showPizzaList = ref(false);
const showCart = ref(false);

const togglePizzaList = () => {
  showPizzaList.value = !showPizzaList.value;
  showCart.value = false; 
};

const toggleCart = () => {
  showCart.value = !showCart.value;
  showPizzaList.value = false; 
};
</script>

<template>
  <header>
    <img alt="FFO logo" class="logo" src="./assets/ffo.png" width="125" height="125" />
    <div class="header-content">
      <h1>Welcome to Fast Food Operator</h1>
      <div class="button-container">
        <button @click="togglePizzaList">Menu</button>
        <button @click="toggleCart">Cart</button>
      </div>
    </div>
  </header>

  <main>
    <div class="content">
      <PizzaList v-if="showPizzaList" @add-to-cart="cart.push($event)" />
      <Cart v-if="showCart" :cart="cart" @remove="cart.splice($event, 1)" />
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

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

header button {
  flex: 1;
  margin: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px; 
}

header button:hover {
  background-color: #45a049;
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
