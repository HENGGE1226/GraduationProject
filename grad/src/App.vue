<template>
  <div id="app">
    <Nav class="nav" v-if="$route.meta.ifNav"></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/nav.vue'
export default {
  name: 'App',
  components: { Nav }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background: #f1f7f9;
  }
</style>
