<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <tab-bar :tabbarData="tabbarData"></tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
export default {
  name: 'App',
  components: {
    TabBar
  },
  data() {
    return {
      tabbarData: [
        {
          text: '首页',
          img: require('assets/img/tabbar/home.svg'),
          activeImg: require('assets/img/tabbar/home_active.svg'),
          link: '/home'
        },
        {
          text: '分类',
          img: require('assets/img/tabbar/category.svg'),
          activeImg: require('assets/img/tabbar/category_active.svg'),
          link: '/categroy'
        },
        {
          text: '购物车',
          img: require('assets/img/tabbar/cart.svg'),
          activeImg: require('assets/img/tabbar/cart_active.svg'),
          link: '/cart'
        },
        {
          text: '我的',
          img: require('assets/img/tabbar/profile.svg'),
          activeImg: require('assets/img/tabbar/profile_active.svg'),
          link: '/profile'
        }
      ],
    }
  }
}
</script>

<style>
@import url('assets/css/base.css');
</style>
