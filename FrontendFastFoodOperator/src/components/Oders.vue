<template>
    <div class="orders-container">
        <div class="order-list">
            <h2>New Orders</h2>
            <ul>
                <li v-for="order in newOrders" :key="order.id" class="new" @click="moveToCooking(order.id)" >
                    <p>Order number: {{ order.id }}</p>
                    <p>Pizzas:</p>
                    <ul>
                        <li v-for="pizza in order.pizzas" :key="pizza.id">{{ pizza.name }}</li>
                    </ul>
                    <p>Drinks:</p>
                    <ul>
                        <li v-for="drink in order.drinks" :key="drink.name">{{ drink.name }} - {{ drink.size }}{{ drink.unit }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="order-list">
            <h2>Cooking Orders</h2>
            <ul>
                <li v-for="order in cookingOrders" :key="order.id">
                    <p>Order number: {{ order.id }}</p>
                    <p>Pizzas:</p>
                    <ul>
                        <li v-for="pizza in order.pizzas" :key="pizza.id">{{ pizza.name }}</li>
                    </ul>
                    <p>Drinks:</p>
                    <ul>
                        <li v-for="drink in order.drinks" :key="drink.name">{{ drink.name }} - {{ drink.size }}{{ drink.unit }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="order-list">
            <h2>Done Orders</h2>
            <ul>
                <li v-for="order in doneOrders" :key="order.id">
                    <p>Order number: {{ order.id }}</p>
                    <p>Pizzas:</p>
                    <ul>
                        <li v-for="pizza in order.pizzas" :key="pizza.id">{{ pizza.name }}</li>
                    </ul>
                    <p>Drinks:</p>
                    <ul>
                        <li v-for="drink in order.drinks" :key="drink.name">{{ drink.name }} - {{ drink.size }}{{ drink.unit }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            orders: [],
            newOrders: [],
            cookingOrders: [],
            doneOrders: []
        };
    },
    created() {
        this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await axios.get('https://localhost:7259/orders/allOrders');
                this.orders = response.data;
                this.filterOrders();
            } catch (error) {
                console.error('ERRORRRR', error);
            }
        },
        filterOrders() {
            this.newOrders = this.orders.filter(order => !order.isCooked && !order.isPickedUp);
            this.cookingOrders = this.orders.filter(order => order.isCooked && !order.isPickedUp);
            this.doneOrders = this.orders.filter(order => order.isCooked && order.isPickedUp);
        }
    }
};
</script>

<style scoped>
.orders-container {
    display: flex;
    justify-content: space-between;
    color: black;
    font-size: 10px;
    width: 100vh;
    height: 100vh;
    max-width: 500px;
}
.order-list {
    width: 30%;
}
.new {
    border-style: solid;
    border-color: red;
}
</style>
