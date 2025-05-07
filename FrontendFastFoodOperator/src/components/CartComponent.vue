<template>
  <div class="cartcontainer">
    <ul>
      <li v-for="(item, index) in cart" :key="index">
        <h3>{{ item.name }} {{item.size }}{{ item.unit }}<button class="remove-item" @click="$emit('remove', index)">×</button></h3>
        <p>Pris: {{ item.price }}kr</p>
        
      </li>
    </ul>
    <p v-if="totalPrice > 0">Totalt: {{ totalPrice }}kr</p>
    <p v-else>Varukorg tom</p>
    <button v-if="totalPrice > 0" @click="createOrder">Slutför beställning</button>
  </div>
</template>

<script>
import axios from 'axios';
import { useOrdersStore } from '@/stores/useOrdersStore.js'

export default {
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    }
  },
  watch: {
    totalPrice(newTotal) {
      this.$emit('update-total', newTotal);
    }
  },
  methods: {
    getCookie(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    },
    async createOrder() {
      const pizzaIds = this.cart.filter(item => item.type === 'pizza').map(item => item.id);
      const drinkIds = this.cart.filter(item => item.type === 'drink').map(item => item.id);
      const extraIds = this.cart.filter(item => item.type === 'extra').map(item => item.id);
      const eatHere = this.getCookie('diningOption') === 'eatHere';

      const orderRequest = {
        pizzaIds,
        drinkIds,
        extraIds,
        EatHere: eatHere,
        totalPrice: this.totalPrice
      };

      try {

        const response = await axios.post("https://localhost:7259/orders", orderRequest);
        const createdOrder = response.data;
        console.log("Skapad order:", createdOrder);
        this.$router.push({
        name: 'ReceiptPage',
        params: {
          id: createdOrder.orderNr.toString()
        }
      });
            this.$emit("clear-cart");

      } catch (err) {
        console.error("Failed to create order:", err);
        alert("Det gick inte att skapa din beställning.");
      }
    },
    clearCart() {
      this.cart = [];
    }
  }
};
</script>

<style scoped>
.cartcontainer {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f9f9f9;
  border: 2px dashed #ccc;
  padding: 20px;
  margin-top: 20px;
  width: 100%; /* Full bredd */
  color: black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-height: 647px; /* Samma höjd som productContainer */
  overflow-y: scroll;
}

.cartcontainer::-webkit-scrollbar {
  width: 12px;
}

.cartcontainer::-webkit-scrollbar-track {
  background-color: #333;
}

.cartcontainer::-webkit-scrollbar-thumb {
  background-color: rgba(0, 189, 126, 0.730);
}

.cartcontainer ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.cartcontainer li {
  border-bottom: 1px dotted #aaa;
  padding: 6px 0; /* mindre padding */
}

.cartcontainer h3 {
  font-size: 14px; /* mindre text */
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cartcontainer p {
  margin: 2px 0 4px; /* mindre marginaler */
  font-size: 12px; /* mindre text */
}


.remove-item {
  border: none;
  background: transparent;
  color: red;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.remove-item:hover {
  color: darkred;
}

.cartcontainer button {
  background-color: rgba(0, 189, 126, 0.730);
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: inherit;
  color: white;
  margin-top: 15px;
  cursor: pointer;
}

.cartcontainer button:hover {
  background-color: rgba(0, 189, 126, 1);
}

</style>