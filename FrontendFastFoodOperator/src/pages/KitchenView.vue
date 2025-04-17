
<template>
      <div class="kitchen-view">
        <Oders />
      </div>
    </template>    
<script>
import Oders from '@/components/Oders.vue';

export default {
  name: 'KitchenView',
  components: {
    Oders
  }
}
</script>
<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}
*, *::before, *::after {
  box-sizing: border-box;
}

</style>