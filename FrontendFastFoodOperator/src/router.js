import { createRouter, createWebHistory } from 'vue-router';

// Importera dina komponenter (sidor)
import HomePage from './pages/HomePage.vue';
import PizzaPage from './pages/PizzaPage.vue';
import CartPage from './pages/CartPage.vue';
import DrinksPage from './pages/DrinksPage.vue';
import { compile } from 'vue';
import SidesPage from './pages/SidesPage.vue';


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
  },
  {
    path: '/drinks',
    name: 'Drinks',
    component: DrinksPage
  },
  {
    path: '/sides',
    name: 'Sides',
    component: SidesPage
  }
];

// Skapa och exportera router-instansen
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
