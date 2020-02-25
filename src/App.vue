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
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.click-item:hover{
  /* background-color:rgb(50, 113, 172); */
  cursor: pointer;
}
.cell:hover{
  /* background-color:rgb(50, 113, 172); */
  cursor: pointer;
}
.el-table__row:hover{
  /* background-color:rgb(50, 113, 172); */
  cursor: pointer;
}
.cell:hover{
  /* background-color:rgb(50, 113, 172); */
  cursor: pointer;
}
.el-dialog,.el-card,.el-collapse,.el-collapse-item,.el-table,.el-collapse-item__header{
  background-color: #2B2B2B;
  color: azure
}
hr{
  height:0px;
  border-top:1px solid #999;
  border-right:0px;
  border-bottom:0px;
  border-left:0px;
}
li {
  list-style-type:none;
}
</style>
