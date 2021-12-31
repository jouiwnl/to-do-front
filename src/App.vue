<template>
  <div id="app" class="wrapper">
    <Header />
    <AppList />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import AppList from './components/AppList.vue'
import 'jquery-ui-touch-punch';

export default {
  name: 'App',
  components: {
    Header,
    AppList
  },
}
</script>

<style scoped>
  .wrapper {
    height: 100vh;
    background-color: var(--color-green-light);
    background-image: url(../assets/background.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
</style>
