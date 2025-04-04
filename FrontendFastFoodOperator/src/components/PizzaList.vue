<template>
  <div class="orderPizzaContainer">
    
    <div class="pizzaContainer">
      <ul>
        <li v-for="pizza in pizzas" :key="pizza.id">
          <h3>{{ pizza.name }}</h3>
          <p>Price: {{ pizza.price }}kr</p>
          <img :src="'./src/assets/pizzaimg/pizza' + pizza.id + '.jpeg'" :alt="pizza.name" />
          <button @click="$emit('add-to-cart', pizza)">Add to Cart</button>
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
