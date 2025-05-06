<template>
  <ul class="productContainer">
    <li class="product" v-for="extra in Extras" :key="extra.id">
      <div class="imgContainer">
        <img :src="'./src/assets/pizzaimg/extra' + extra.id + '.jpg'" :alt="extra.name" />
      </div>
      <div class="productInfo">
        <h3 class="productName">{{ extra.name }}</h3>
        <p class="productPrice">Pris: {{ extra.price }}kr</p> 
        <button class="cartBtn" @click="$emit('add-to-cart', { ...extra, type: 'extra' })">Lägg till i varukorg</button>
      </div>
    </li>
  </ul>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      Extras: [] 
    };
  },
  created() {
    this.fetchExtras(); 
  },
  methods: {
    async fetchExtras() {
      try {
        const response = await axios.get("https://localhost:7259/extras"); 
        this.Extras = response.data; 
      } catch (error) {
        console.error("Error fetching extras:", error); 
      }
    }
  }
};
</script>

<style scoped>
.product {
  display: flex;
  background: rgb(210, 210, 210);
  height: 135px;  cursor: pointer;
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
  object-fit: cover;
}

.productInfo {
  padding: 15px 0 15px 15px;
}

.productName {
  font-size: 19px;
  color: black;
}

.productPrice {
  font-size: 14px;
}

.cartBtn {
  border: 2px solid #333;
  width: 150px;
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
  color: #333;
  cursor: pointer;
}

.cartBtn:hover {
  background: rgb(193, 193, 193);
}
</style>