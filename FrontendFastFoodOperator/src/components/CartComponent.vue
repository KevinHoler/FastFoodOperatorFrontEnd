<template>
  <div class="cartcontainer">
    <ul>
      <li v-for="(item, index) in cartStore.cart" :key="index">
        <h3>
          {{ item.name }} {{ item.size }}{{ item.unit }}
          <button class="remove-item" @click="removeItem(index)">×</button>
        </h3>
        <p v-if="item.type === 'menu'">
          Dryck: {{ item.drink.name }} ({{ item.drink.size }}{{ item.drink.unit }})<br>
          Tillbehör: {{ item.extra.name }}
        </p>
        <p>Price: {{ item.price }}kr</p>
      </li>
    </ul>
    <p v-if="cartStore.totalPrice > 0">Pris: {{ cartStore.totalPrice }}kr</p>
    <p v-else>Varukorg tom</p>
    <button v-if="cartStore.totalPrice > 0" @click="createOrder">Slutför beställning</button>
  </div>
</template>


<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'
import axios from 'axios'

const cartStore = useCartStore()
const router = useRouter()

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

async function createOrder() {
  const pizzaIds = cartStore.cart.filter(item => item.type === 'pizza').map(item => item.id);
  const drinkIds = cartStore.cart.filter(item => item.type === 'drink').map(item => item.id);
  const extraIds = cartStore.cart.filter(item => item.type === 'extra').map(item => item.id);
  const menus = cartStore.cart.filter(item => item.type === 'menu').map(item => ({
    pizzaId: item.pizzaId,
    drinkId: item.drinkId,
    extraId: item.extraId,
    quantity: 1
  }));
  const eatHere = getCookie('diningOption') === 'eatHere';

  const orderRequest = {
    pizzaIds,
    drinkIds,
    extraIds,
    menus,
    EatHere: eatHere,
    totalPrice: cartStore.totalPrice
  };

  try {
    const response = await axios.post("https://localhost:7259/orders", orderRequest);
    const createdOrder = response.data;
    console.log("Skapad order:", createdOrder);

    cartStore.clearCart();

    router.push({
      name: 'ReceiptPage',
      params: { id: createdOrder.orderNr.toString() }
    });
  } catch (err) {
    console.error("Failed to create order:", err);
    alert("Det gick inte att skapa din beställning.");
  }
}

function removeItem(index) {
  cartStore.removeFromCart(index)
}
</script>


<style scoped>
.cartcontainer {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f9f9f9;
  border: 2px dashed #ccc;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  color: black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-height: 647px;
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
  padding: 6px 0;
}

.cartcontainer h3 {
  font-size: 14px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cartcontainer p {
  margin: 2px 0 4px;
  font-size: 12px; 
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