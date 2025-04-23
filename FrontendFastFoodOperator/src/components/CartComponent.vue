<template>
  <div class="cartcontainer">
    <h2>Cart</h2>
    <ul>
      <li v-for="(item, index) in cart" :key="index">
        <h3>{{ item.name }}</h3>
        <p>Price: {{ item.price }}kr</p>
        <button @click="$emit('remove', index)">Ta bort</button>
      </li>
    </ul>
    <p>Total price: {{ totalPrice }}kr</p>
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
        EatHere: eatHere
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
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  width: 300px;
  color: black;
}
</style>
