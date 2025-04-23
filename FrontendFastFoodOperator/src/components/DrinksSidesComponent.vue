<template>
    <div class="orderPizzaContainer">
      <div class="pizzaContainer">
        <ul>
          <li v-for="drink in drinks" :key="drink.id">
            <h3>{{ drink.name }}</h3>
            <p>Price: {{ drink.price }}kr</p> 
            <img :src="'./src/assets/pizzaimg/drink' + drink.id + '.jpg'" :alt="drink.name" />
            
            <button @click.stop="$emit('add-to-cart',  { ...drink, type: 'drink' })">Add to Cart</button>
          </li>
        </ul>
        <ul>
          <li v-for="extra in extras" :key="extra.id">
            <h3>{{ extra.name }}</h3>
            <p>{{ extra.info }}</p>
            <p>Price: {{ extra.price }}kr</p> 
            
            <button @click.stop="$emit('add-to-cart',  { ...extra, type: 'extra' })">Add to Cart</button>
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
        drinks: [] ,
        extras: []
      };
    },
    created() {
      this.fetchDrinks(),
      this.fetchExtras();
    },
    methods: {
      async fetchDrinks() {
        try {
          const response = await axios.get("https://localhost:7259/drinks"); 
          this.drinks = response.data; 
        } catch (error) {
          console.error("Error fetching drinks:", error); 
        }
      },
      async fetchExtras(){
        try{
          const response = await axios.get("https://localhost:7259/extras");
          this.extras = response.data;
        } catch (error) {
          console.error("Error fetching extras", error)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .orderPizzaContainer {
    color:black;
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
  