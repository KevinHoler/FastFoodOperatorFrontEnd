<template>
  <div class="cartcontainer">
    <h2>Cart</h2>
    <ul>
      <li v-for="(item, index) in cart" :key="index">
        <h3>{{ item.name }}</h3>
        <p>Price: ${{ item.price }}</p>
        <button @click="$emit('remove', index)">Remove</button>
      </li>
      <p>Total price: {{ totalPrice }}</p>
    </ul>
  </div>
</template>

<script>
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
  }
}

</script>

<style scoped>
.cartcontainer {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}
</style>