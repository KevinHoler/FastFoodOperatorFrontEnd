<template>
  <div class="orderPizzaContainer">
    
   
    <div class="pizzaContainer">
      <ul class="productContainer">
        <li class="product" v-for="pizza in pizzas" :key="pizza.id">
          <div>
            <img :src="'./src/assets/pizzaimg/pizza' + pizza.id + '.jpeg'" :alt="pizza.name" />
          </div>
          <div class="productInfo">
            <h3 class="pizzaName">{{ pizza.name }}</h3>
            <p>Price: {{ pizza.price }}kr</p>
            <!-- <button @click="$emit('add-to-cart', pizza)">Add to Cart</button> TA INTE BORT DENNA -->
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
      pizzas: []
    };
  },
  created() {
    this.fetchPizzas();
  },
  methods: {
    async fetchPizzas() {
      try {
        const response = await axios.get("https://localhost:7259/pizzas"); // Change this if the backend URL is different
        this.pizzas = response.data;
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    },
    goToPizzaPage() {
        this.$router.push({ name: 'Pizza' });
    },
    goToCartPage() {
        this.$router.push({ name: 'Cart' });
    },
    goToDrinkPage() {
        this.$router.push({name: 'DrinksSides'}) 
      }
  }
};
</script>

<style scoped>
.orderPizzaContainer {
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
}

/* .pizzaContainer {
}  */

.product {
  display: flex;
  background: rgb(210, 210, 210);
  height: 150px;
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
  width: 200px;
  height: 150px;
  object-fit: cover;
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
</style>