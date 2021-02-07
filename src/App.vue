<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Table</router-link> |
      <router-link to="/symbols">Symbols</router-link>
    </div>
    <router-view class="app__container" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

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

.app__container {
  max-width: 80%;
  margin: 0 auto;
}
</style>
