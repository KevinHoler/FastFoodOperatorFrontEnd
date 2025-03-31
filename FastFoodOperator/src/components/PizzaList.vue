<template>
  <div class="pizzacontainer">
    <h1>Pizzas</h1>
    <ul>
      <li v-for="pizza in pizzas" :key="pizza.id">
        <h3>{{ pizza.name }}</h3>
        <p>Price: ${{ pizza.price }}</p>
        <img :src="'./src/assets/pizzaimg/pizza' + pizza.id + '.jpeg'" :alt="pizza.name" />
        <button @click="$emit('add-to-cart', pizza)">Add to Cart</button>
      </li>
    </ul>
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
.pizzacontainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  justify-content: center;
  border-color: rgb(0, 255, 55);
  border-style: solid;
  border-width: 2px;
  color: aquamarine;
  padding: 10px;
}

.pizzacontainer ul {
  padding: 0;
  list-style-type: none;
  margin: 0;
}

.pizzacontainer li {
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}

img {
  width: 100%;
  height: auto;
  max-width: 100px;
  display: block;
  margin: 0 auto;
}

button {
  display: block;
  margin: 10px auto;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>