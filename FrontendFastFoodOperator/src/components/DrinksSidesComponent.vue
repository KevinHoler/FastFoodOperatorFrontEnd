<template>
<div class="orderPizzaContainer"> 
    <div class="pizzaContainer">
      <ul class="productContainer">
        <li class="product" v-for="drink in drinks" :key="drink.id">
          <div>
            <img :src="'./src/assets/pizzaimg/drink' + drink.id + '.jpg'" :alt="drink.name" />
          </div>
          <div class="productInfo">
            <h3 class="pizzaName">{{ drink.name }} {{ drink.size }}{{ drink.unit }}</h3>
            <p>Pris: {{ drink.price }}kr</p>

        <button @click.stop="$emit('add-to-cart',  { ...drink, type: 'drink' })">Add to Cart</button>
          </div>
        </li>
        <hr>
   <p class="break">Tillbehör</p>
   <hr>
   <li class="product" v-for="extra in extras" :key="extra.id">
          <div>
            <img :src="'./src/assets/pizzaimg/extra' + extra.id + '.jpg'" :alt="extra.name" />
          </div>
          <div class="productInfo">
            <h3 class="pizzaName">{{ extra.name }} </h3>
            <p class="info">{{ extra.info }}</p>
            <p>Pris: {{ extra.price }}kr</p>

        <button @click.stop="$emit('add-to-cart',  { ...extra, type: 'extra' })">Add to Cart</button>
          </div>
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
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
  background-color: white;
}

.product {
  display: flex;
  background: rgb(210, 210, 210);
  height: 100vw;
  cursor: pointer;
}

.productContainer {
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  height: 647px;
  color: black;
}

.productContainer::-webkit-scrollbar {
  width: 12px;
}

.productContainer::-webkit-scrollbar-track {
  background-color: #333;
}

.productContainer::-webkit-scrollbar-thumb {
  /* background-color: #666; */
  background-color: rgba(0, 189, 126, 0.730)

}

img {
  width: 150px;
  height: 150px;
  object-fit:fill;
  border-top: solid 2px rgb(210, 210, 210);
  border-bottom: solid 2px rgb(210, 210, 210);
}

.productInfo {
  padding: 15px;
}

.pizzaName {
  font-size: 20px;
  color: black;
}

.categoryContainer a {
  cursor: pointer;
}
.info{
  font-size: 12px;

}
.break{
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}
  </style>
  