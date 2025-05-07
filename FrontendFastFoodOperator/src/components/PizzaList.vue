<template>
  <div class="orderPizzaContainer"> 
    <div class="pizzaContainer">
      <ul class="productContainer">
        <li class="product" v-for="pizza in pizzas" :key="pizza.id">
          <div>
            <img :src="'./src/assets/pizzaimg/pizza' + pizza.id + '.jpeg'" :alt="pizza.name" @click="goToPizzaPage(pizza.id)" />
          </div>
          <div class="productInfo">
            <h3 class="pizzaName">{{ pizza.name }}</h3>
            <p>Price: {{ pizza.price }}kr</p>

            <!-- Dropdown to select the pizza base (Thin, Thick, Gluten-Free) -->
            <div class="base-selector">
          <label for="base">Choose Base:</label>
          <select v-model="pizza.selectedBase">
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
            <option value="Gluten-Free">Gluten-Free</option>
          </select>
        </div>

         <!-- Dropdown for selecting toppings -->
         <div class="topping-selector">
              <label for="topping">Choose Toppings:</label>
              <!-- 'multiple' allows selecting multiple toppings -->
              <select v-model="pizza.selectedToppings" multiple @change="handleToppingChange(pizza)">
                <option disabled value="">Choose a topping</option>
                <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
                  {{ ingredient.name }} - {{ ingredient.price }} kr
                </option>
              </select>
            </div>
<!-- Display selected toppings and allow to remove -->
<div class="selected-toppings">
              <strong>Selected Toppings:</strong>
              <ul>
                <li v-for="(topping, index) in pizza.selectedToppings" :key="index">
                  {{ topping }} 
                  <button @click="removeTopping(pizza, index)">Remove</button>
                </li>
              </ul>
            </div>

        <button @click.stop="$emit('add-to-cart',  { ...pizza, type: 'pizza' })">Add to Cart</button>
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
      pizzas: [],
      ingredients: [],
    };
  },
  created() {
    this.fetchPizzas();
    this.fetchIngredients();
  },
  methods: {
    async fetchPizzas() {
      try {
        const response = await axios.get("https://localhost:7259/pizzas"); 
        this.pizzas = response.data;
        this.pizzas = response.data.map(pizza => ({
  ...pizza,
  selectedBase: 'Thin',
  selectedToppings: []
}));

      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    },
// Fetch available toppings (ingredients) from the backend
async fetchIngredients() {
      try {
        const response = await axios.get("https://localhost:7259/ingredients");
        this.ingredients = response.data;
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    },

    // Handle topping change when the user selects/deselects toppings
    handleToppingChange(pizza) {
      // Reset selected toppings first
      pizza.selectedToppings = [];

      // Loop through the selected topping ids and add corresponding names to the pizza's selectedToppings
      pizza.selectedToppings.forEach(toppingId => {
        const selectedIngredient = this.ingredients.find(ingredient => ingredient.id === toppingId);
        if (selectedIngredient && !pizza.selectedToppings.includes(selectedIngredient.name)) {
          pizza.selectedToppings.push(selectedIngredient.name);
        }
      });
    },

    goToPizzaPage(pizzaId) {
      this.$router.push({ name: 'PizzaDetails', params: { id: pizzaId } });
    }
  }
};
</script>


<style scoped>
.orderPizzaContainer {
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
  height: 100vh;
}

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