import { createRouter, createWebHistory } from 'vue-router';

// Importera dina komponenter (sidor)
import HomePage from './pages/HomePage.vue';
import PizzaPage from './pages/PizzaPage.vue';
import CartPage from './pages/CartPage.vue';
import DrinksPage from './pages/DrinksPage.vue';
import PizzaDetails from './components/PizzaDetailComponent.vue';
import { compile } from 'vue';
import KitchenPage from './pages/KitchenView.vue';
import RestaurantPage from './pages/restaurantView.vue';
import ReceiptPage from './pages/ReceiptPage.vue';
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
