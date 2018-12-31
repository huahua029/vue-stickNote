<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Content from './components/Content/Content.vue'

export default {

  name: 'app',
  components: {
    Header,
    Content
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: #F4F5F5;
  }
  ul{
    list-style: none;
  }
  .icon {
    width: 1.5em; height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
