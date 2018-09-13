<template>
  <div class="l-header">
    <h1>Just Todo List Header</h1>
    <ul class="l-header__ul">
      <li class="l-header__ul_buy">buy</li>
      <li>drink</li>
      <li>common</li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.l-header {
  font-size: 25px;
  text-align: center;

  &__ul {
    list-style: none;
    background: #fff;
    width: 80%;
    margin: 0 auto;
    &_buy {
      font-size: 18px;
    }
  }
}
</style>
