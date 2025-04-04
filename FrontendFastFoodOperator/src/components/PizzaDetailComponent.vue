<template>
    <div class="top-container">
          <h1>Beställ</h1>
          <p>2. Anpassa ingridienser</p>
        </div>
    <NavComponent/>
    <div v-if="pizza" class="detailcontainer">
      <h1>{{ pizza.name }}</h1>
      <img :src="'/src/assets/pizzaimg/pizza' + pizza.id + '.jpeg'" :alt="pizza.name" />
      <p>Price: {{ pizza.price }}kr</p>
      <p>Description: {{ pizza.description }}</p>
      <h2>Ingredients:</h2>
      <ul>
        <li v-for="ingredient in pizza.ingredients" :key="ingredient.id">{{ ingredient.name }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Loading pizza details...</p>
    </div>
  </template>
  
  
  <script>
import axios from "axios";
import NavComponent from '@/components/NavComponent.vue';

export default {
  data() {
    return {
      pizza: null
    };
  },
  components: {
    NavComponent
  },
  created() {
    this.fetchPizzaDetails();
  },
  methods: {
    async fetchPizzaDetails() {
      try {
        const pizzaId = this.$route.params.id;
        console.log("Fetching details for pizza ID:", pizzaId); // Log the pizza ID
        const response = await axios.get(`https://localhost:7259/pizza/${pizzaId}`); // Adjust the URL if necessary
        console.log("API response:", response.data); // Log the API response
        this.pizza = response.data;
      } catch (error) {
        console.error("Error fetching pizza details:", error);
      }
    }
  }
};
</script>

  <style scoped>
  .detailcontainer{
    color:black;
  }
  img{
    width: 100px;
  }
  .top-container{
  color: black;
}
    </style>
  