<template>
  <div class="navbar">
    <div class="navbar-left">
      <slot name="left"></slot>
    </div>
    <div class="navbar-center">
      <slot name="center"></slot>
    </div>
    <div class="navbar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"NavBar"
}
</script>

<style scoped>
.navbar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0,3px,0,rgba(100,100,100,.2)
}
.navbar-left,
.navbar-right {
  width: 60px;
}
.navbar-center {
  flex:1;
}
</style>