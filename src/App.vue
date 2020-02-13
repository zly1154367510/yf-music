<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from './store'
export default {
    name: 'App',
    store
}
</script>

<style>
* {
  color: rgb(254, 254, 255);
  padding: 0px;
  margin: 0px;
}
html, body {
    height: 100%;
    margin: 0px;
    padding: 0px;
}
.app{
  height: 100%;
  width: 100%;
}
</style>
