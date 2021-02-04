<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Table</router-link> |
      <router-link to="/symbols">Symbols</router-link>
    </div>
    <router-view class="container" />
    <div>{{ data.numba }} {{ data.gumba }}</div>
  </div>
</template>

<script>
import mainStore from './store/mainStore';

export default {
  name: 'App',
  data() {
    return {
      data: mainStore,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  max-width: 60%;
  margin: 0 auto;
}
</style>
