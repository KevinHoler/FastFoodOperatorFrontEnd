<template>
  <div class="cartcontainer">
    <h2>Cart</h2>
    <ul>
      <li v-for="(item, index) in cart" :key="index">
        <h3>{{ item.name }}</h3>
        <p>Price: {{ item.price }}kr</p>
        <button @click="$emit('remove', index)">Remove</button>
      </li>
      <p>Total price: {{ totalPrice }}kr</p>
      <button @click="createOrder">Create Order</button>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
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
      this.$emit('update-total', newTotal); // Emit the total price to the parent
    }
  },
  methods: {
  async createOrder() {
    const pizzaIds = this.cart
      .filter(item => item.type === 'pizza')
      .map(item => item.id);

    const drinkIds = this.cart
      .filter(item => item.type === 'drink')
      .map(item => item.id);

    const extraIds = this.cart
      .filter(item => item.type === 'extra')
      .map(item => item.id);

    const orderRequest = {
      pizzaIds,
      drinkIds,
      extraIds
    };

    try {
      const response = await axios.post("https://localhost:7259/orders", orderRequest);
      console.log("Order created:", response.data);
      alert(response.data.toString());

      this.$emit("clear-cart"); // Optional: reset cart
    } catch (err) {
      console.error("Failed to create order", err);
      alert("There was a problem creating the order.");
    }
  }
}

}

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
