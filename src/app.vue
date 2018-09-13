<template>
  <div id="app">
    <div class="l-wrapper">
      <Header></Header>
    </div>
  </div>
</template>

<script>
import Header from './todo/header.vue'
export default {
  data () {
    return {
      msg: 'vue-webpack todolist'
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
  .l-wrapper {
    background: url('image.png');
    height: -webkit-fill-available;
  }
</style>


