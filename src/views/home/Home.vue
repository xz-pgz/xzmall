<template>
  <div id="mallhome">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :navtext="['流行','新款','精选']" @changeColor="changeData" ref="tabcontrol1" class="tab-fixed" v-show="tabisShow"></tab-control>
    <bscroll class="bscroll" ref="bscroll" :probe-type="3" :pullUpLoad="pullUp" :reqFlag="reqResult" @scrollTop="scrollTop"
    @pullingUpMove="pullingMove">
      <home-swiper :banner="banner" @swiperImg="swiperImg"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-frature></home-frature>
      <tab-control :navtext="['流行','新款','精选']" @changeColor="changeData" ref="tabcontrol2"></tab-control>
      <good-list :list="showGoods"></good-list>
    </bscroll>
    <!-- 显示小图标 -->
    <BackTop @click.native="goback" v-show="showtop"/>
  </div>

</template>

<script>
import {myMixin} from "common/mixin.js"

import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommend from "./childComponents/HomeRecommend";
import HomeFrature from "./childComponents/HomeFeature";

import GoodList from "components/content/goods/GoodList"
import BackTop from "components/content/backtop/BackTop"
export default {
  mixins: [myMixin],
  name: "home",
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFrature,
    GoodList,
    BackTop
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: {
          page:0,
          list:[]
        },
        new: {
          page:0,
          list:[]
        },
        sell: {
          page:0,
          list:[]
        }
      },
      current:'pop',
      showtop:false,
      pullUp:{
        threshold:90,
        stop: 40
      },
      reqResult:false,
      tabTop:0,
      tabisShow:false,
      saveY:0,
    };
  },
  methods: {
    /****事件函数 */
    // 切换数据
    changeData(index) {
      switch(index) {
        case 0:this.current='pop';break;
        case 1:this.current='new';break;
        case 2:this.current='sell';break;
      }
      console.log(this.$refs.tabcontrol1)
      this.$refs.tabcontrol1.current = index
      this.$refs.tabcontrol2.current = index
    },
    // 轮播图加载完成
    swiperImg() {
      this.tabTop = this.$refs.tabcontrol2.$el.offsetTop
      console.log(this.tabTop)
    },
    // 返回顶部
    goback() {
      this.$refs.bscroll.scrollTo(0,0)
    },
    // 出现小图标
    scrollTop(position){ 
      this.showtop = position.y <= -1000?true:false
      this.tabisShow = position.y <= -this.tabTop?true:false
    },
    // 上拉加载更多
    pullingMove() {
      setTimeout(()=> {
        this.getHomeGoods(this.current)
      },1000)
    },
    /*** 网络请求函数*/
    // 封装第一个请求数据
    getHomeMultidata() {
      this.$axios.getHomeMultidata().then(res => {
        this.recommend = res.data.recommend.list;
        this.banner = res.data.banner.list;
      });
    },
    // 封装商品数据请求
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      this.$axios.getHomeGoods({page:page,type:type}).then(res => {
        // 这个时机变化 text
        this.reqResult = true
        setTimeout(()=>{
          if(res.data.total <= this.goods[type].list.length) {
            return this.$refs.bscroll.completeUp()
          }
          // ...写法 相当于遍历出来数组数据 push 到数组中 
          this.goods[type].list.push(...res.data.list)
          // 改变页码
          this.goods[type].page += 1
          // 完成上啦加载
          this.$nextTick(()=> {
            this.reqResult = false
            this.$refs.bscroll.refresh()
            this.$refs.bscroll.completeUp()
          })
          },1000) 
      })
    },
  },
  computed:{
    showGoods(){
      return this.goods[this.current].list
    }
  },
  created() {
    // 模块带过来相当于一个全局变量 只有访问 不用加this
    // 请求多个数据
    this.getHomeMultidata()
    // 请求选项卡商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // 重新刷新高度 created 写ref 是有问题的 是没有挂载成功的问题
  },
  mounted() {
    this.loadImg()
  },
  destroyed() {
    console.log('home is destroyed')
  },
  activated() {
    this.$refs.bscroll.scrollTo(0,-this.saveY,0)
    this.$refs.bscroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.bscroll.scroll.scrollY
    // 取消全局事件绑定 为什么要取消监听 不取消的话 你详情页加载完也会告诉首页也会监听
    this.$bus.$off('loadImg',this.listenerRefresh)
  }
};
</script>

<style scoped>
#mallhome {
  padding-top: 44px;
  padding-bottom: 49px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
}
.bscroll {
  /* height: 100% */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-fixed {
  position: relative;
  z-index: 10;
}
</style>