<template>

    <div class="homeContainer">
      <div class="greetingContainer">
        <h1 class="greeting">Välkommen</h1>
        <p class="startOrderText">Börja beställning här!</p>
      </div>
      <div class="buttonContainer">
        <button class="eatHereBtn" @click="goToPizzaPage">Ät här</button>
        <span class="lineBetweenButtons"></span>
        <button class="bringHomeBtn" @click="goToPizzaPage">Ta med</button>
      </div>
    </div>


</template>



<script>
export default {
  name: 'HomePage',
  methods: {
    goToPizzaPage() {
      this.$router.push({ name: 'Pizza' });
    }
  }
}
</script>

<style>
.homeContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
}

.greetingContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}

.greeting {
  font-size: 40px;
  font-weight: 900;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
}

.startOrderText {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
}

.buttonContainer {
  display: flex;
  align-items: center;
}

.buttonContainer button {
  border: none;
  width: 130px;
  height: 70px;
  background: rgb(232, 232, 232);
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
  font-family: 'Courier New', Courier, monospace;
}

.eatHereBtn {
  border-top-left-radius: 20px;  border-bottom-left-radius: 20px;
}

.bringHomeBtn {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.lineBetweenButtons {
  width: 2px; /* Adjust thickness of the line */
  height: 68px; /* Adjust height to match button size */
  background: rgb(69, 69, 69); /* Line color */
}


</style>
