<template>
<w-app>
  <!-- All your app content goes here. -->
  <MyDashboard />
</w-app>
  
</template>

<script>
import MyDashboard from './components/MyDashboard.vue'

export default {
  name: 'App',
  components: {
    MyDashboard,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
