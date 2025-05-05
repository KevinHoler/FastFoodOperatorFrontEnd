<template>
  <div class="topInfoContainer">
      <h1 class="orderText">Meny</h1>
      <p class="choosePizzaText">Anpassa meny</p>
    </div>

  <NavComponent />
<div class="outer-frame">
  <div class="giga-container">
  <div v-if="pizza" class="detailcontainer">
    
    <div class="choosen-pizza">
  <img
    :src="'/src/assets/pizzaimg/pizza' + pizza.id + '.jpeg'"
    :alt="pizza.name"
  />
  <div class="pizza-details">
    <h1>{{ pizza.name }}</h1>
    <ul>
      <li v-for="ingredient in pizza.ingredients" :key="ingredient">{{ ingredient }}</li>
    </ul>
  </div>
</div>


    <div class="selectionRow">
  <div class="dropdown">
    <h2>Välj dryck</h2>
    <select class="dropdown-menu" v-model="selectedDrink">
      <option disabled value="">-- Välj dryck --</option>
      <option v-for="drink in drinks" :key="drink.id" :value="drink.id">
        {{ drink.name }} ({{ drink.size }}{{ drink.unit }})
      </option>
    </select> 
    <p>Vald dryck: {{ selectedDrinkName }}</p>
  </div>

  <div class="dropdown">
    <h2>Välj tillbehör</h2>
    <select  class="dropdown-menu" v-model="selectedExtra">
      <option disabled value="">-- Välj tillbehör --</option>
      <option v-for="extra in filteredExtras" :key="extra.id" :value="extra.id">
        {{ extra.name }}
      </option>
    </select>
    <p>Valt tillbehör: {{ selectedExtraName }}</p>
  </div>
</div>

<button class="cart-btn" @click="addMenuToCart" :disabled="!selectedDrink || !selectedExtra">
  Lägg till meny i varukorgen
</button>
    <p>Meny pris: {{ pizza.price + 20}} kr</p>
  </div>

  <div v-else>
    <p>Loading pizza details...</p>
  </div>
</div>
</div>
</template>

<script>
import axios from "axios";
import NavComponent from '@/components/NavComponent.vue';
import { useCartStore } from '@/stores/useCartStore'

export default {
  components: {
    NavComponent
  },
  data() {
    return {
      pizza: null,
      drinks: [],
      Extras: [],
      selectedDrink: null,
      selectedExtra: null,
    };
  },
  computed: {
    selectedDrinkName() {
      const selected = this.drinks.find(drink => drink.id === this.selectedDrink);
      return selected ? selected.name : "Ingen vald";
    },
    selectedExtraName() {
      const selected = this.Extras.find(extra => extra.id === this.selectedExtra);
      return selected ? selected.name : "Ingen vald";
    },
    filteredExtras() {
      return this.Extras.filter(extra => [1, 2, 3].includes(extra.id));
    }
  },
  created() {
    this.fetchPizzaDetails();
    this.fetchDrinks();
    this.fetchExtras();
  },
  methods: {
    async fetchPizzaDetails() {
      const pizzaId = this.$route.params.id;
      const response = await axios.get(`https://localhost:7259/pizza/${pizzaId}`);
      this.pizza = response.data;
    },
    async fetchDrinks() {
      const response = await axios.get("https://localhost:7259/drinks");
      this.drinks = response.data;
    },
    async fetchExtras() {
      const response = await axios.get("https://localhost:7259/extras");
      this.Extras = response.data;
    },
    addMenuToCart() {
      if (!this.pizza || !this.selectedDrink || !this.selectedExtra) {
        alert("Du måste välja en dryck och ett tillbehör.");
        return;
      }

      const cartStore = useCartStore(); 
      const selectedDrink = this.drinks.find(d => d.id === this.selectedDrink);
      const selectedExtra = this.Extras.find(e => e.id === this.selectedExtra);

      const menuItem = {
        type: 'menu',
        name: `Meny: ${this.pizza.name}`,
        pizzaId: this.pizza.id,
        drinkId: selectedDrink.id,
        extraId: selectedExtra.id,
        price: this.pizza.price + 20,
        drink: selectedDrink,
        extra: selectedExtra
      };

      cartStore.addToCart(menuItem);
      this.goToCartPage();
    },
    goToCartPage() {
        this.$router.push({ name: 'Cart' });
      }
    
  }
}

</script>

<style scoped>
.outer-frame{
  border: solid white 6px;
}
.choosen-pizza {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  
  padding: 10px;
  background-color: rgb(210, 210, 210);
}
.pizza-details {
  display: flex;
  flex-direction: column; 
  justify-content: flex-start;
}

.pizza-details h1 {
  margin-bottom: 0.5rem;
  font-size: 16px;
  font-weight: bold;
  gap: 0;
  
}

.pizza-details ul {
  margin: 0;
  padding-left: 1rem;
  list-style-type: disc; 
}
.pizza-details li {
  font-size: 14px;
  line-height: 1.4;
  list-style-type: none;
}


.giga-container{
  background: rgb(210, 210, 210);
  height: 100vh;
  font-family: 'Courier New', Courier, monospace;
}
.detailcontainer {
  color: black;
}

img {
  width: 180px;
  height: 100%;
}
.top-container {
  color: black;
}
.productContainer {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
  
}
.product {
  border: 1px solid #ccc;
  padding: 0.5rem;
  list-style-type: none;
}
.selectionRow {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.dropdown {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  align-items: center;
}
.dropdown-menu{
  font-size: 12px;
  padding: 4px 8px;
  height: 30px;
  width: auto;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
}
.cart-btn{
  background-color: rgba(0, 189, 126, 0.730);
  border: none;
  padding: 5px 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: inherit;
  color: white;
  margin-top: 5px;
  cursor: pointer;
  margin: 10px auto;
  display: block;
}
.cart-btn:active{
  transform: scale(0.95);
  box-shadow: inset 2px 4px  rgba(0, 189, 126, 0.228);

}
.cart-btn:disabled{
  cursor:not-allowed;
  color: #666;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
  opacity: 0.7;
}
.topInfoContainer {
  padding: 20px;
  color: #333;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
}
.orderText {
  font-size: 33px;
  font-weight: 900;
  text-decoration-line: underline;
}

.choosePizzaText {
  font-size: 18px;
}
</style>
