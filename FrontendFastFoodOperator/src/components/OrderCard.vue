<template>
  <div class="order-card">
    <p class="title">
      <strong>Order #{{ order.orderNr }}</strong><br />
      <span class="eat-here">{{ order.eatHere ? 'Äta här' : 'Ta med' }}</span>
    </p>

    <div v-if="order.orderMenus?.length">
      <ul class="pizza-ul">
        <li v-for="(menuItem, index) in order.orderMenus" :key="index" class="pizza-list">
          <p class="menu-title"><strong>{{ menuItem.menu?.pizza?.name }}-meny</strong></p>
          <ul class="menu-ul">
            <li v-if="menuItem.menu?.pizza">
               {{ menuItem.menu.pizza.name }}
              <div class="pizza-i">{{ menuItem.menu?.pizza?.ingredients?.join(',') }}</div>
            </li>
            <li v-if="menuItem.menu?.drink">
               {{ menuItem.menu.drink.name }} - {{ menuItem.menu.drink.size }}{{ menuItem.menu.drink.unit }} (x{{ menuItem.quantity }})
            </li>
            <li v-if="menuItem.menu?.extra">
               {{ menuItem.menu.extra.name }} (x{{ menuItem.quantity }})
            </li>
          </ul>
          <hr>
        </li>
      </ul>
    </div>
    
    <ul v-if="order.pizzas?.length" class="pizza-ul">
      <li v-for="pizza in order.pizzas" :key="pizza.name" class="pizza-list">
         {{ pizza.name }} (x{{ pizza.quantity }})
        <div class="pizza-i">{{ pizza.ingredients?.join(',') }}</div>
      </li>
      <hr>
    </ul>

    <ul v-if="order.drinks?.length" class="pizza-ul">
      <li v-for="(drink, index) in order.drinks" :key="index" class="pizza-list">
         {{ drink.name }} - {{ drink.size }}{{ drink.unit }} (x{{ drink.quantity }})
      </li>
      <hr>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  order: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.order-card {
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  color: black;
  font-family: sans-serif;
}

.order-card:hover {
  background: #f0f8ff;
}

.pizza-i {
  font-size: 10px;
  color: #666;
}

.pizza-list {
  list-style: none;
  font-size: 13px;
  margin-bottom: 5px;
}

.title {
  text-align: center;
  font-size: 16px;
}

.pizza-ul,
.menu-ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.menu-title {
  font-size: 14px;
  margin-top: 5px;
}

.eat-here {
  font-size: 12px;
  color: #333;
}
</style>
