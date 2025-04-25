<template>
    <div class="receipt" v-if="order"> <div>
      <h2>Tack för din beställning!</h2>
      <p>Ordernummer: {{ order.orderNr }}</p>
  
      <ul>
        <li v-for="(pizza, index) in order.pizzas" :key="'pizza-' + index">
          🍕 {{ pizza.name }} - {{ pizza.price }} kr
        </li>
        <li v-for="(drink, index) in order.drinks" :key="'drink-' + index">
          🥤 {{ drink.name }} - {{ drink.size }}{{ drink.unit }} - {{drink.price}}kr
        </li>
        <li v-for="(extra, index) in order.extras" :key="'extra-' + index">
          🧀  {{ extra.name }} - {{ extra.price }}kr
        </li>
      </ul>
  
      <p><strong>Totalt pris:</strong> {{ totalPrice }} kr</p>
      <p> {{ order.eatHere ? 'Äter här' : 'Tas med' }}</p>
    </div>
    <button @click="goToHome">Ny beställning</button>
    </div>
    <div v-else>
      <p>Hämtar kvitto...</p>
    </div>

  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ReceiptPage',
    data() {
      return {
        order: null
      };
    },
    computed: {
      totalPrice() {
        if (!this.order) return 0;
        const pizzaTotal = this.order.pizzas?.reduce((sum, p) => sum + (p.price || 0), 0) || 0;
        const drinkTotal = this.order.drinks?.reduce((sum, d) => sum + (d.price || 0), 0) || 0;
        const extrasTotal = this.order.extras?.reduce((sum, i) => sum + (i.price || 0), 0) || 0;
        return pizzaTotal + drinkTotal + extrasTotal;
      }
    },
    async created() {
  const orderId = this.$route.params.id;
  if (!orderId) return;

  try {
    const res = await axios.get(`https://localhost:7259/orders/${orderId}`);
    this.order = res.data;
    console.log(this.order)
  } catch (err) {
    console.error("Kunde inte hämta ordern:", err);
  }
},
methods: {
    goToHome() {
      this.$router.push({ name: 'Home'});
    }
}

  };
  </script>
  
  <style scoped>
  .receipt {
    padding: 20px;
    border: 1px solid #ccc;
    color: black;
  }
  </style>
  