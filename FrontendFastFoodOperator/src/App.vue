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
  width: 100%;
  /* max-width: 500px; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  gap: 20px;
  height: inherit;
}

@media (max-width: 768px) {
  main {
    width: 100%;
    /* max-width: none; */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  main {
    width: 98vw;
  }
}

@media (min-width: 1025px) {
  main {
    width: 500px;
  }
}
</style>
