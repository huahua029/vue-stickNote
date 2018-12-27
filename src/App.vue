<template>
  <div id="app">
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Content from './components/Content.vue'

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
</style>
