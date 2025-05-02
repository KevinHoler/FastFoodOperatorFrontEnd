<template>
  <div class="productWrapper">
      <ul class="productContainer">
        <li @click="openPopup(pizza)" class="product" v-for="pizza in pizzas" :key="pizza.id">
          <div>
            <img :src="'./src/assets/pizzaimg/pizza' + pizza.id + '.jpeg'" :alt="pizza.name" @click="goToPizzaPage(pizza.id)" />
          </div>
          <div class="productInfo">
            <h3 class="productName">{{ pizza.name }}</h3>
            <p class="productPrice">Price: {{ pizza.price }}kr</p>
            <!-- <button @click="$emit('add-to-cart', pizza)">Add to Cart</button> -->

            <!-- Dropdown to select the pizza base (Thin, Thick, Gluten-Free) -->
            <div class="base-selector">
          <label for="base">Choose Base:</label>
          <select v-model="pizza.selectedBase">
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
            <option value="Gluten-Free">Gluten-Free</option>
          </select>
        </div>

        <button @click.stop="$emit('add-to-cart',  { ...pizza, type: 'pizza' })">Add to Cart</button>
          </div>
        </li>
      </ul>

      <div v-if="activePizza" class="popup-bottom" @click.self="closePopup">
        <div class="topInfoContainer">
          <div>
            <button class="closePopupBtn" @click="closePopup">X</button>
          </div>
          <div>
            <p>{{ activePizza.name }} - {{ activePizza.price }} kr</p>
          </div>
        </div>

        <div class="bottomContainer">

          <h3>Ta bort ingredienser</h3>
          <div class="extrasContainer">
            <!-- <div v-for="ingredient in ingredients" :key="ingredient.id">
              <label for="tomatosauce"> Utan {{ ingredient.name }}</label>
            <input id="tomatosauce" name="tomatosauce" type="checkbox">
            </div> -->
            <div v-for="ingredient in ingredients" :key="ingredient.id">
              <div>
                <label :for="'remove-' + ingredient.id">Utan {{ ingredient.name }}</label>
              </div>
              <div class="priceAndCheckbox">
                <input
                  type="checkbox"
                  :id="'remove-' + ingredient.id"
                  :value="ingredient.name"
                  v-model="selectedIngredientsToRemove"
                />
              </div>
            </div>

            
            <!-- <div>
              <label for="cheese"> Utan {{ ingredient.name }}</label>
              <input id="cheese" name="cheese" type="checkbox">
            </div> -->
          </div>

          <h3>Extra</h3>
          <div class="extrasContainer">
            <div>
              <label for="tomatosauce"> Extra {{ activePizza.ingredients[0] }}</label>
            <input id="tomatosauce" name="tomatosauce" type="checkbox">
            </div>
            
            <div>
              <label for="cheese"> Extra {{ activePizza.ingredients[1] }}</label>
              <input id="cheese" name="cheese" type="checkbox">
            </div>
          </div>

          <h3>Kombinera med</h3>
          <div class="extrasContainer">
            <div v-for="extra in Extras" :key="extra.id">
              <div>
                <label for="tomatosauce"> {{ extra.name }}</label>
              </div>
              <div class="priceAndCheckbox">
                <p> {{ extra.price }} kr</p>
                <input id="tomatosauce" name="tomatosauce" type="checkbox">
              </div>
            </div>
            
            <!-- <div>
              <label for="cheese"> Extra {{  }}</label>
              <input id="cheese" name="cheese" type="checkbox">
            </div> -->
          </div>
        </div>
        <div class="addToCartContainer">
        <button @click="$emit('add-to-cart', activePizza)" class="addToCartBtn">Lägg till i varukorg</button>
        </div>
      </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pizzas: [],
      activePizza: null,
      Extras: [],
      ingredients: [],
    };
  },
  created() {
    this.fetchPizzas();
    this.fetchExtras(); 
    this.fetchIngredients();
  },
  methods: {
    async fetchPizzas() {
      try {
        const response = await axios.get("https://localhost:7259/pizzas"); 
        this.pizzas = response.data;
        this.pizzas = response.data.map(pizza => ({
  ...pizza,
  selectedBase: 'Thin'
}));

      } catch (error) {
        console.error("Error fetching pizzas:", error);
      } 
    },
    async fetchExtras() {
      try {
        const response = await axios.get("https://localhost:7259/extras"); 
        this.Extras = response.data; 
      } catch (error) {
        console.error("Error fetching extras:", error); 
      }
    },
    async fetchIngredients() {
      try {
        const response = await axios.get("https://localhost:7259/ingredients"); 
        this.ingredients = response.data; 
      } catch (error) {
        console.error("Error fetching extras:", error); 
      }
    },
    openPopup(pizza) {
      this.activePizza = pizza;
    },
    closePopup() {
      this.activePizza = null;
    },
    goToPizzaPage() {
        this.$router.push({ name: 'Pizza' });
    },
    goToCartPage() {
        this.$router.push({ name: 'Cart' });
    },
    goToDrinkPage() {
        this.$router.push({name: 'DrinksSides'}) 
      },
  }
};
</script>


<style scoped>

.productWrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.product {
  display: flex;
  background: rgb(210, 210, 210);
  height: 135px;
  cursor: pointer;
  transition: 0.3s;
}

.product:hover {
  height: 160px;
}

.productContainer {
  height: 100%;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
  overflow-y: scroll;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
}

.productContainer::-webkit-scrollbar {
  width: 12px;
}

.productContainer::-webkit-scrollbar-track {
  background-color: #333;
}

.productContainer::-webkit-scrollbar-thumb {
  background-color: rgba(0, 189, 126, 0.730)

}

img {
  width: 180px;
  height: 100%;
  object-fit: cover;
}

.productInfo {
  padding: 15px;
}

.productName {
  font-size: 19px;
  color: black;
}

.productPrice {
  font-size: 14px;
}

.popup-bottom {
  position: absolute;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background: rgb(255, 255, 255);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.closePopupBtn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #333;
  font-size: 25px;
  cursor: pointer;
  color: rgba(0, 189, 126, 0.730)
}

.topInfoContainer {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 15px;
}

.topInfoContainer p {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
  color: black;
}

.bottomContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  padding-right: 5px;
}


.bottomContainer::-webkit-scrollbar {
  width: 12px;
}

.bottomContainer::-webkit-scrollbar-track {
  background-color: #333;
}

.bottomContainer::-webkit-scrollbar-thumb {
  background-color: #727272;
}

.extrasContainer {
 border: 1px solid black;
 border-radius: 5px;
 padding: 0.7rem;
 display: flex;
 flex-direction: column;
 gap: 10px;
}

.extrasContainer div {
  display: flex;
  justify-content: space-between;
}

.priceAndCheckbox {
  gap: 10px;
}

.addToCartContainer {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 1rem;
  height: 80px;
}

.addToCartBtn {
  border: none;
  background: #333;
  height: 40px;
  border-radius: 5px;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
  color: rgba(0, 189, 126, 0.730);
  cursor: pointer;
}

</style>