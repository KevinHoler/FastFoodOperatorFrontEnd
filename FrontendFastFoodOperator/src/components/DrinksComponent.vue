<template>
  <ul class="productContainer">
    <li class="product" v-for="drink in drinks" :key="drink.id">
      <div class="imgContainer">
        <img :src="'./src/assets/pizzaimg/drink' + drink.id + '.jpg'" :alt="drink.name" />
      </div>
      <div class="productInfo">
        <h3 class="productName">{{ drink.name }}</h3>
        <p class="productPrice">Pris: {{ drink.price }} kr</p>
        <button class="cart-btn" @click="addDrinkToCart(drink)">Lägg till i kundvagn</button>
      </div>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import { useCartStore } from "@/stores/useCartStore";

export default {
  data() {
    return {
      drinks: []
    };
  },
  created() {
    this.fetchDrinks();
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
    addDrinkToCart(drink) {
      const cartStore = useCartStore();
      cartStore.addToCart({
        ...drink,
        type: "drink"
      });
    }
  }
};
</script>

<style scoped>
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
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
  color: black;
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

.imgContainer {
  background: rgb(255, 255, 255);
  width: 180px;
  height: 100%;
}

img {
  width: 180px;
  height: 100%;
  object-fit: contain;
  border-bottom: 1px solid rgb(210, 210, 210);
  border-top: 1px solid rgb(210, 210, 210);
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
