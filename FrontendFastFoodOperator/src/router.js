import { createRouter, createWebHistory } from 'vue-router';

// Importera dina komponenter (sidor)
import HomePage from './pages/HomePage.vue';
import PizzaPage from './pages/PizzaPage.vue';
import CartPage from './pages/CartPage.vue';

// Skapa dina rutter
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/pizza',
    name: 'Pizza',
    component: PizzaPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  }
];

// Skapa och exportera router-instansen
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
