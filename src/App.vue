<template>
  <div id="app">
    <NavBar />
    <router-view></router-view> <!--component to display content on each page-->
  </div>
</template>

<script>
/**import date from '.utils/dateFunctions.js';*/
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: { NavBar }
}

</script>

<style></style>