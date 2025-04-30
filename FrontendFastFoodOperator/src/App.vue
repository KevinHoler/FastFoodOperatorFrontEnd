<script setup>
import Cart from './components/CartComponent.vue';
import PizzaList from './components/PizzaList.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import HomePage from './pages/HomePage.vue';

const cart = ref([]);
</script>

<template>
  <main>
    <router-view :cart="cart" />
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

/* header {
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
} */

main {
  background: white;
  height: 100%;
  width: 500px;
  display: flex;
  flex-direction: column;
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
