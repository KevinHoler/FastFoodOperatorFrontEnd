<template>
    <!-- <div class="receipt" v-if="order"> <div>
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
    </div> -->
    <div class="receipt" v-if="order">
      <div>
        <h2>Tack för din beställning!</h2>
        <p>Ordernummer: {{ order.orderNr }}</p>
      </div>
      <span class="divider"></span>
      <div class="orgInfoContainer">
        <div>
          <h3>FastFoodOperator AB</h3>
        </div>
        <div class="dateAndOrgNr">
          <p>Datum: {{ new Date(order.dateOfOrder).toLocaleString() }}</p>
          <p>Org nr</p>
        </div>
      </div>
      <span class="divider"></span>
      <div>
        <p>Varor</p>
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
      </div>
    <span class="divider"></span>
      <div class="priceAndTaxContainer">
        <div class="row">
          <p>Totalt:</p>
          <p> {{ totalPrice }}kr</p>
        </div>
        <div class="row">
          <p>Varav moms 0%</p>
          <p>0 kr</p>
        </div>
        <div class="row">
          <p>Varav moms 6%</p>
          <p>0 kr</p>
        </div>
        <div class="row">
          <p>Varav moms 12%</p>
          <p>{{ vatAmount }} kr</p>
        </div>
        <div class="row">
          <p>Varav moms 25%</p>
          <p>0 kr</p>
        </div>
      </div>
      <span class="divider"></span>
      <div>
        <p> {{ order.eatHere ? 'Äter här' : 'Tas med' }}</p>
        <button @click="goToHome">Ny beställning</button>
      </div>
    </div>

  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ReceiptPage',
    data() {
      return {
        order: null,
        vatAmount: 0,
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
  const totalPrice = this.totalPrice;
  try {
    const res = await axios.get(`https://localhost:7259/api/tax/vat/${totalPrice}`);
    this.vatAmount = res.data;
  } catch (error) {
    console.error("Could not fetch VAT:", error);
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
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .orgInfoContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .dateAndOrgNr {
    display: flex;
    justify-content: space-between;
  }

  .divider {
    display: block;
    height: 0.5px;
    width: 100%;
    background-color: rgb(143, 143, 143);
    margin: 20px 0;
  }

  .priceAndTaxContainer {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }
  </style>
  