<template>
    <div class="nav-content">
      <div class="buttonContainer">
        <button @click="goToPizzaPage">Pizza</button>
        <button @click="goToCartPage">Kassa</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavMenu',
    methods: {
      goToPizzaPage() {
        this.$router.push({ name: 'Pizza' });
      },
      goToCartPage() {
        this.$router.push({ name: 'Cart' });
      }
    }
  }
  </script>
  
  <style scoped>
  .nav-content {
    width: 100%;
    background-color: #989898; /* Darker gray background */
    padding: 5px 0;
    display: flex;
    justify-content: center;
    height: 35px; /* Set a fixed height */
  }
  
  .buttonContainer {
    display: flex;
    gap: 10px;
  }
  
  .buttonContainer button {
    background-color: #989898; /* Slightly lighter gray for buttons */
    color: white; /* White text */
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    height: 100%; 
  }
  
  .buttonContainer button:hover {
    background-color: #555; /* Even lighter gray on hover */
  }
  </style>
  