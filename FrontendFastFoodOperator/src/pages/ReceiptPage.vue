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
      <div class="orderNrContainer">
        <h2>Tack för din beställning!</h2>
        <p>Ordernummer: {{ order.id }}</p>
        <span class="divider"></span>
      </div>
      <div class="orgInfoContainer">
        <div>
          <h3>FastFoodOperator AB</h3>
        </div>
        <div class="dateAndOrgNr">
          <p>Datum: {{ new Date(order.timeOfOrder).toLocaleString() }}</p>
          <p>Org: 559123-3838</p>
        </div>
        <span class="divider"></span>
      </div>
      
      <div>
        <p>Varor</p>
        <ul>
        
      <li v-for="(pizza, index) in order.pizzas" :key="'pizza-' + index">
        
        <div v-if="pizza.quantity > 1">
          🍕  {{ pizza.name }} (x{{ pizza.quantity }}) - {{ pizza.price * pizza.quantity }} kr
        </div>
        <div v-else>
          🍕  {{ pizza.name }} - {{ pizza.price }} kr
  </div>
</li>

<li v-for="(drink, index) in order.drinks" :key="'drink-' + index">
   
  <div v-if="drink.quantity > 1">
    🥤 {{ drink.name }} - {{ drink.size }}{{ drink.unit }} (x{{ drink.quantity }}) - {{ drink.price * drink.quantity }} kr
  </div>
  <div v-else>
    🥤 {{ drink.name }} - {{ drink.size }}{{ drink.unit }} - {{ drink.price }} kr
  </div>
</li>

<li v-for="(extra, index) in order.extras" :key="'extra-' + index">
  
  <div v-if="extra.quantity > 1">
    🧀 {{ extra.name }} (x{{ extra.quantity }}) - {{ extra.price * extra.quantity }} kr
  </div>
  <div v-else>
    🧀 {{ extra.name }} - {{ extra.price }} kr
  </div>
</li>

          <li v-for="(menu, index) in order.orderMenus" :key="'menu-' + index">
            <div v-if="menu.quantity > 1">
            <p><strong>🍕{{ menu.menu.pizza?.name }}-meny - (x{{menu.quantity}}) {{ menu.menu.price * menu.quantity }} kr</strong></p>
          </div>
          <div v-else> 
            <p><strong>🍕{{ menu.menu.pizza?.name }}-meny - {{ menu.menu.price }} kr</strong></p>
          </div>
        <ul class="menu-ul">
          <li v-if="menu.menu.pizza">
             {{ menu.menu.pizza.name }}
            <div class="pizza-i">{{ menu.menu.pizza.ingredients?.join(', ') }}</div>
          </li>
          <li v-if="menu.menu.drink">
             {{ menu.menu.drink.name }} - {{ menu.menu.drink.size }}{{ menu.menu.drink.unit }} 
          </li>
          <li v-if="menu.menu.extra">
             {{ menu.menu.extra.name }}
          </li>
        </ul>

          <hr>
        </li>
        </ul>
        <span class="divider"></span>
      </div>
    
      <div class="priceAndTaxContainer">
        <div class="row">
          <p>Totalt {{ totalAmountItems}} varor:</p>
          <p> {{ totalPrice }} kr</p>
        </div>
        <div class="row">
          <p>Varav moms 12%</p>
          <p>{{ vatAmount }} kr</p>
        </div>
        <span class="divider"></span>
       
      </div>
      
      
      <div class="lastRowOfReceipt">
        <p> {{ order.eatHere ? 'Äter här' : 'Tas med' }}</p>
        <button @click="goToHome">Ny beställning</button>
        <button @click="printReceipt">Skriv ut kvitto</button>
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
        const pizzaTotal = this.order.pizzas?.reduce((sum, p) => sum + (p.price * p.quantity || 0), 0) || 0;
        const drinkTotal = this.order.drinks?.reduce((sum, d) => sum + (d.price * d.quantity|| 0), 0) || 0;
        const extrasTotal = this.order.extras?.reduce((sum, i) => sum + (i.price * i.quantity|| 0), 0) || 0;
        const menuTotal = this.order.orderMenus?.reduce((sum, m) => sum + (m.menu?.price * m.quantity || 0), 0) || 0;
        return pizzaTotal + drinkTotal + extrasTotal + menuTotal;
      },
      totalAmountItems() {
  const totalPizzas = this.order.pizzas?.reduce((sum, p) => sum + (p.quantity || 0), 0) || 0;
  const totalDrinks = this.order.drinks?.reduce((sum, d) => sum + (d.quantity || 0), 0) || 0;
  const totalExtras = this.order.extras?.reduce((sum, e) => sum + (e.quantity || 0), 0) || 0;
  const totalMenus = this.order.orderMenus?.reduce((sum, m) => sum + (m.quantity || 0), 0) || 0;

  return totalPizzas + totalDrinks + totalExtras + totalMenus;
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
    },
    printReceipt() {
      alert("Kvitto skrivs ut....")
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
    overflow-y: auto;
    max-height: 90vh;

  }
  .receipt div{
    width: 100%;
  }
  .pizza-i{
    font-size: 10px;
   color: #666;
  }

  .orderNrContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .orgInfoContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .dateAndOrgNr {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .divider {
    display: block;
    height: 1px;
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

  .lastRowOfReceipt {
    display: flex;
    gap: 50px;
    justify-content: space-between;
  }
  .lastRowOfReceipt button {
  padding: 5px 10px;
  background-color: #555; 
  color: white;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.lastRowOfReceipt button:hover {
  background-color: #333; 
}

.lastRowOfReceipt button:active {
  transform: scale(0.98); 
}

  </style>
  