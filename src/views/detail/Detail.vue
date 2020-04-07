<template>
  <div id="Detail">
    <detail-nav @detClick="detClick"></detail-nav>
    <bscroll class="detail-scroll" ref="bscroll">
      <detail-swiper :DeatilBanner="topImg"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImgload="detailImgload"></detail-goods-info>
      <detail-param-info ref="dParam" :paramInfo="paramsData"></detail-param-info>
      <detail-comments-info ref="dComments" :commentInfo="commentInfo"></detail-comments-info>
      <good-list :list="recommendInfo" ref="dRecommend"></good-list>
    </bscroll>
  </div>
</template>

<script>
import { Goods,GoodsParam,Shop } from "network/data.js"
import {debounce} from "common/utils.js"
import {myMixin} from "common/mixin.js"

import DetailNav from "./childComponents/DetailNav"
import DetailSwiper from "./childComponents/DetailSwiper"
import DetailBaseInfo from "./childComponents/DetailBaseInfo"
import DetailShopInfo from "./childComponents/DetailShopInfo"
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo"
import DetailParamInfo from "./childComponents/DetailParamInfo"
import DetailCommentsInfo from "./childComponents/DetailCommentInfo"

import GoodList from "components/content/goods/GoodList"
export default {
  name: "Detail",
  mixins: [myMixin],
  data() {
    return {
      iid: null,
      // 轮播图
      topImg: [],
      // 店铺介绍数据
      goods:{},
      // 店铺信息
      shopInfo:{},
      // 商品详情
      detailInfo:{},
      // 参数信息
      paramsData:{},
      // 评论信息
      commentInfo:{},
      // 推荐信息
      recommendInfo:[],
      // 滚动位置
      themeTop:[],
    };
  },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailParamInfo,
    DetailCommentsInfo,
    GoodList
  },
  created() {
    this.iid = this.$route.params.iid;
    this.initDetail();
  },
  methods: {
    initDetail() {
      this.$axios.getDetail({ iid: this.iid }).then(res => {
        const result = res.result;
        this.topImg = result.itemInfo.topImages;
        this.goods = new Goods(result.itemInfo,result.columns,result.shopInfo.services)
        this.shopInfo = new Shop(result.shopInfo)
        this.detailInfo = result.detailInfo
        this.paramsData = new GoodsParam(result.itemParams.info,result.itemParams.rule)
        this.commentInfo = result.rate.cRate === 0? {}:result.rate.list[0]
        // 等下次dom 渲染完再执行 但是自己图片还没被加载 所以还是有问题
        // this.$nextTick(()=> {
        //   this.themeTop.push(0)
        //   this.themeTop.push(this.$refs.dParam.$el.offsetTop)
        //   this.themeTop.push(this.$refs.dComments.$el.offsetTop)
        //   this.themeTop.push(this.$refs.dRecommend.$el.offsetTop)
        // })
      });
      this.$axios.getRecommend().then(res => {
        this.recommendInfo = res.data.list
        console.log(this.recommendInfo)
      })
    },
    // 加载图片 浪费性能 但是就算发出去两个事件也是合理的
    detailImgload() {
      this.$refs.bscroll.refresh()
      // 防抖
      debounce(()=> {
          this.themeTop = []
          this.themeTop.push(0)
          this.themeTop.push(this.$refs.dParam.$el.offsetTop - 44)
          this.themeTop.push(this.$refs.dComments.$el.offsetTop - 44)
          this.themeTop.push(this.$refs.dRecommend.$el.offsetTop - 44)
      },1000)()
    },
    // 导航栏事件
    detClick(index) {
      console.log(index)
      this.$refs.bscroll.scrollTo(0,-this.themeTop[index])
    },
    //封装函数
    themeTopfn() {
      debounce(()=> {
          this.themeTop = []
          this.themeTop.push(0)
          this.themeTop.push(this.$refs.dParam.$el.offsetTop)
          this.themeTop.push(this.$refs.dComments.$el.offsetTop)
          this.themeTop.push(this.$refs.dRecommend.$el.offsetTop)
          },1000)()
    }
  },
  mounted(){
    this.loadImg()
  },
  beforeDestroy () {
    this.$bus.$off('loadImg',this.listenerRefresh)
  },
};
</script>

<style scoped>
#Detail {
  position: relative;
  z-index: 99;
  background-color: #ffffff;
  height: 100vh;
}
.detail-scroll {
  height:calc(100vh - 49px);
  overflow: auto;
}
</style>