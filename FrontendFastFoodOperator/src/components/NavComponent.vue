<template>
    <div class="nav-content">
      <div class="buttonContainer">
        <button @click="goToPizzaPage">Pizza</button>
        <button @click="goToCartPage">Kassa</button>
        <button @click="goToDrinkPage">Dryck & Tillbehör</button>
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
      },
      goToDrinkPage() {
        this.$router.push({name: 'DrinksSides'}) 
      }
    }
  }
  </script>
  
  <style scoped>
  .nav-content {
    width: 100%;
    background-color: #989898; 
    padding: 5px 0;
    display: flex;
    justify-content: center;
    height: 35px; 
  }
  
  .buttonContainer {
    display: flex;
    gap: 10px;
    width: 100%; 
  }
  
  .buttonContainer button {
    background-color: #989898; 
    color: white; 
    border: none;
    padding: 0 5px; 
    cursor: pointer;
    transition: background-color 0.3s;
    height: 100%; 
    flex-grow: 1; 
    flex-shrink: 1; 
    font-size: 12px; 
    white-space: nowrap;
    text-align: center; 
  }
  
  .buttonContainer button:hover {
    background-color: #555;
  }
  
  </style>
  


  