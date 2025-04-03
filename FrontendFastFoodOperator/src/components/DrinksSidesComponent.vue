<template>
    <div class="orderPizzaContainer">
      <div class="pizzaContainer">
        <ul>
          <li v-for="drink in drinks" :key="drink.id">
            <h3>{{ drink.name }}</h3>
            <p>Price: {{ drink.price }}kr</p> 
            <img :src="'./src/assets/pizzaimg/drink' + drink.id + '.jpg'" :alt="drink.name" />
            <button @click="$emit('add-to-cart', drink)">Add to Cart</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        drinks: [] 
      };
    },
    created() {
      this.fetchDrinks(); 
    },
    methods: {
      async fetchDrinks() {
        try {
          const response = await axios.get("https://localhost:7259/drinks"); 
          this.drinks = response.data; 
        } catch (error) {
          console.error("Error fetching drinks:", error); 
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .orderPizzaContainer {
    /* Add any necessary styles */
  }
  
  .pizzaContainer ul {
    padding: 0;
    list-style-type: none;
  }
  
  .pizzaContainer li {
    box-sizing: border-box;
  }
  
  img {
    width: 100px;
  }
  </style>
  