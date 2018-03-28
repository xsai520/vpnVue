<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: url("./assets/img/index-bg.png");
    background-size: cover;
    overflow: hidden;
  }
#app {
  width: 100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  /*@font-face{*/
    /*font-family: BDZYJT;*/
    /*src: url("./assets/fonts/BDZYJT.TTF");*/
  /*}*/
  /*@font-face{*/
    /*font-family: FZCXJT;*/
    /*src: url("./assets/fonts/FZCXJT.TTF");*/
  /*}*/
  /*@font-face{*/
    /*font-family: FZLTHJW;*/
    /*src: url("./assets/fonts/FZLTHJW.TTF");*/
  /*}*/
</style>
