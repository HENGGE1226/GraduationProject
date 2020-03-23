<template>
  <div id="app">
    <Nav class="nav" v-if="$route.meta.ifNav && isReload"></Nav>
    <router-view v-if="isReload" />
  </div>
</template>

<script>
import Nav from '@/components/nav.vue'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isReload: true
    }
  },
  methods: {
    reload () {
      this.isReload = false
      this.$nextTick(() => {
        this.isReload = true
      })
    }
  },
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
