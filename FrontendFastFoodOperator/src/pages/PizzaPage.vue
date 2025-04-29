<template>
        <div class="topInfoContainer">
      <h1 class="orderText">Beställ</h1>
      <p class="choosePizzaText">1. Välj Pizza</p>
    </div>
        <NavComponent/>
        <PizzaList @add-to-cart="addToCart" />

>
<div v-if="pizza">
    <h2>Ingredienser:</h2>
    <ul>
      <li v-for="ingredient in pizza.ingredients" :key="ingredient.id">
        <input 
          type="checkbox" 
          :value="ingredient.id" 
          v-model="selectedIngredients" 
          :id="'ingredient-' + ingredient.id" 
        />
        <label :for="'ingredient-' + ingredient.id">{{ ingredient.name }} ({{ ingredient.price }}kr)</label>
      </li>
    </ul>
    <button @click="addToppingsToPizza">Lägg till toppingar</button>
  </div>
</template>


<script>
import NavComponent from '@/components/NavComponent.vue';
import PizzaList from '@/components/PizzaList.vue';
import axios from 'axios';


export default {

    name: 'PizzaPage',
    props: {
    cart: Array
  },

  components: {
    PizzaList,
    NavComponent
  },
  data() {
    return {
      pizza: null, // Pizza seleccionada
      selectedIngredients: [] // Ingredientes seleccionados por el usuario para toppings
    };
  },
  created() {
    this.fetchPizzaDetails();
  },
  methods: {
    
    async fetchPizzaDetails() {
      const pizzaId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:5062/pizza/${pizzaId}`);
        this.pizza = response.data;
      } catch (error) {
        console.error('Error fetching pizza details:', error);
      }
    },
    async addToppingsToPizza() {
      const pizzaId = this.pizza.id;
      try {
        
        const response = await axios.put(`http://localhost:5062/orders/1/pizzas/${pizzaId}/toppings`, {
          toppingIds: this.selectedIngredients
        });
        alert('Toppingar tillagda!');  
      } catch (error) {
        alert('Det gick inte att lägga till toppingar.');   
      }
    },
  
  
  
    addToCart(pizza) {
      this.cart.push(pizza);
    },
    goToCartPage() {
        this.$router.push({ name: 'Cart' });
    }
  }
}

</script>
<style>
.top-container{
  color: black;
}
.topInfoContainer {
  padding: 20px;
  color:black;
}
.orderText {
  font-size: 35px;
  font-weight: 900;
  text-decoration-line: underline;
}

.choosePizzaText {
  font-size: 20px;
}
</style>