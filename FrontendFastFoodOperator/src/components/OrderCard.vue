<template>
    <div class="order-card">
      <p class="title"><strong>Order #{{ order.id }} </strong><br><span class="eat-here"> {{ order.eatHere ? 'Äta här' : 'Ta med' }}
      </span></p>

      <div v-if="order.menus && order.menus.length">
  <ul class="pizza-ul">
    <li v-for="(menu, index) in order.menus" :key="index" class="pizza-list">
      <p class="menu-title"><strong>{{ menu.pizza.name }}-meny:</strong></p>
      <div class="pizza-i"><strong>{{ menu.name }}</strong></div>
      <ul class="menu-ul">
        <li>
          {{ menu.pizza.name }}
          <div class="pizza-i">{{ menu.pizza.ingredients.join(', ') }}</div>
        </li>
        <li v-if="menu.drink">
          {{ menu.drink.name }} - <span class="pizza-i">{{ menu.drink.size }}{{ menu.drink.unit }}</span>
        </li>
        <li v-if="menu.extra">
          {{ menu.extra.name }}
        </li>
      </ul>
      <hr>
    </li>
  </ul>
</div>

    
      <p v-if="order.pizzas && order.pizzas.length"></p>
      <ul v-if="order.pizzas && order.pizzas.length" class="pizza-ul"> 
        <li v-for="pizza in order.pizzas" :key="pizza.name" class="pizza-list">
          {{ pizza.name }} <div class="pizza-i">{{ pizza.ingredients.join(', ') }}</div>
        </li>
        <hr>
      </ul>
      <ul v-if="order.drinks && order.drinks.length" class="pizza-ul">
        <li v-for="(drink, index) in order.drinks" :key="index" class="pizza-list">
        {{ drink.name }} - <span class="pizza-i">{{ drink.size }}{{ drink.unit }}</span>
         </li>
         <hr>
      </ul>
      <ul v-if="order.extras && order.extras.length" class="pizza-ul">
        <li v-for="(extra, index) in order.extras" :key="index" class="pizza-list">
        {{ extra.name }}
         </li>
         <hr>
      </ul>
    </div>
  </template>
  
  <script setup>
  defineProps({
    order: {
      type: Object,
      default: () => ({
        pizzas: [],
        drinks: [],
        extras: [],
        notes: null,
        isStartedInKitchen: false,
        isCooked: false,
        isPickedUp: false,
        EatHere: true
      })
    }
  })
  </script>
  
  <style scoped>
  .order-card {
    background: white;
    border: 1px solid #ccc;
    padding: 1px;
    border-radius: 0px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: 0.2s ease;
    color: black;
    
  }
  .order-card:hover {
    background: #e6f7ff;
  }
  .pizza-i{
    font-size: 8px;
  }
  .pizza-list{
    list-style: none;
    font-size: 12px;
    text-align: left;
  }
  .title {
    text-align: center;
    font-weight: bold;

  }
  .pizza-ul {
  text-align: left;
  padding-left: 0;
  margin: 0;
}
.menu-ul{
  text-align: left;
  padding-left: 0;
  margin: 0;
  list-style: none;
}
.eat-here{
  font-weight: bold;
  font-size: 12px;
  color:black;
  border: solid, 1px;
}
.menu-title {
  font-size: 13px;
  margin-bottom: 2px;
}

  </style>