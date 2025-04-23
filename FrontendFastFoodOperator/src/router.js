import { createRouter, createWebHistory } from 'vue-router';

// Importera dina komponenter (sidor)
import HomePage from './pages/HomePage.vue';
import PizzaPage from './pages/PizzaPage.vue';
import CartPage from './pages/CartPage.vue';
import DrinkSidesPage from './pages/DrinkSidesPage.vue';
import PizzaDetails from './components/PizzaDetailComponent.vue';
import { compile } from 'vue';
import KitchenPage from './pages/KitchenView.vue';
import RestaurantPage from './pages/restaurantView.vue';
import ReceiptPage from './pages/ReceiptPage.vue';

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
    path: '/drinksides',
    name: 'DrinksSides',
    component: DrinkSidesPage
  },
  {
    path: '/pizza/:id',
    name: 'PizzaDetails',
    component: PizzaDetails
  },
  {
    path: '/kitchen',
    name: 'KitchenView',
    component: KitchenPage
  },
  {
  path: '/restaurant',
  name: 'restaurantView',
  component: RestaurantPage
  },
  {
    path: '/receipt/:id',
    name: 'ReceiptPage',
    component: ReceiptPage
  }
  


];

// Skapa och exportera router-instansen
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
