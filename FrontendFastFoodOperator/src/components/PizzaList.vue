<template>
  <div class="productWrapper">
    <ul class="productContainer">
      <li
        @click="openPopup(pizza)"
        class="product"
        v-for="pizza in pizzas"
        :key="pizza.id"
      >
        <div>
          <img
            :src="'./src/assets/pizzaimg/pizza' + pizza.id + '.jpeg'"
            :alt="pizza.name"
            @click="goToPizzaPage(pizza.id)"
          />
        </div>
        <div class="productInfo">
          <h3 class="productName">{{ pizza.name }}</h3>
          <p class="productPrice">Pris: {{ pizza.price }} kr</p>
          <button class="cart-btn" @click.stop="addPizzaToCart(pizza)">Lägg till i kundvagn</button>
          <button class="cart-btn" @click="goToPizzaPage(pizza.id)">Gör till meny (+20 kr)</button>
        </div>
      </li>
    </ul>

    <div v-if="activePizza" class="popup-bottom" @click.self="closePopup">
      <div class="topInfoContainer">
        <button class="closePopupBtn" @click="closePopup">X</button>
        <p>{{ activePizza.name }} - {{ activePizza.price }} kr</p>
      </div>

      <div class="bottomContainer">
        <h3>Ta bort ingredienser</h3>
        <div class="extrasContainer">
          <div v-for="ingredient in ingredients" :key="ingredient.id">
            <label :for="'remove-' + ingredient.id">Utan {{ ingredient.name }}</label>
            <div class="priceAndCheckbox">
              <input
                type="checkbox"
                :id="'remove-' + ingredient.id"
                :value="ingredient.name"
                v-model="selectedIngredientsToRemove"
              />
            </div>
          </div>
        </div>

        <h3>Extra</h3>
        <div class="extrasContainer">
          <div>
            <label for="tomatosauce">Extra {{ activePizza.ingredients[0] }}</label>
            <input id="tomatosauce" name="tomatosauce" type="checkbox" />
          </div>
          <div>
            <label for="cheese">Extra {{ activePizza.ingredients[1] }}</label>
            <input id="cheese" name="cheese" type="checkbox" />
          </div>
        </div>

        <h3>Kombinera med</h3>
        <div class="extrasContainer">
          <div v-for="extra in Extras" :key="extra.id">
            <label>{{ extra.name }}</label>
            <div class="priceAndCheckbox">
              <p>{{ extra.price }} kr</p>
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </div>

      <div class="addToCartContainer">
        <button @click="addPizzaToCart(activePizza)" class="addToCartBtn">
          Lägg till i varukorg
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCartStore } from "@/stores/useCartStore";

export default {
  data() {
    return {
      pizzas: [],
      activePizza: null,
      Extras: [],
      ingredients: [],
      selectedIngredientsToRemove: []
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
        console.error("Error fetching ingredients:", error);
      }
    },
    openPopup(pizza) {
      this.activePizza = pizza;
    },
    closePopup() {
      this.activePizza = null;
    },
    goToPizzaPage(pizzaId) {
      this.$router.push({ name: "PizzaDetails", params: { id: pizzaId } });
    },
    addPizzaToCart(pizza) {
      const cartStore = useCartStore();
      cartStore.addToCart({
        ...pizza,
        type: "pizza",
        removedIngredients: [...this.selectedIngredientsToRemove]
      });
      this.selectedIngredientsToRemove = [];
      this.closePopup();
    }
  }
};
</script>

<style scoped>

.productWrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  color: black;
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
}
.cart-btn:active{
  transform: scale(0.95);
  box-shadow: inset 2px 4px  rgba(0, 189, 126, 0.228);
}
</style>