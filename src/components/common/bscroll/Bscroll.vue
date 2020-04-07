<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 下拉刷新 文字提示 -->
      <div v-if="downtip.isUp">
        <div class="box">
          <div class="tip"><img src="~assets/img/common/loading.svg" alt="" v-if="downtip.icoShow" class="rotation"><span>{{downtip.tip}}</span></div>
        </div>
      </div>
      <slot></slot>
      <!-- 上拉加载 文字提示 -->
      <div v-if="uptip.isUp">
        <div class="box">
          <div class="tip"><img src="~assets/img/common/loading.svg" alt="" v-if="!reqFlag" class="rotation"><span>{{uptip.tip}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Bscroll',
  data() {
    return {
      scroll:null,
      downtip: {
        isDown:false,
        tip:'下拉刷新',
        icoShow:true
      },
      uptip:{
        isUp:false,
        tip:'上拉加载',
        icoShow:true
      },
    }
  },
  props:{
    // 类型 滚动计算类型
    probeType:{
      type:Number,
      default:0
    },
    // 上拉加载派发
    pullUpLoad: {
      type:[Boolean,Object],
      default:false
    },
    // 下拉刷新派发
    pullDownRefresh:{
      type:[Boolean,Object],
      default:false
    },
    // 点击设置
    click:{
      type:Boolean,
      default:true
    },
    // 横向滚动
     scrollX:{
      type:Boolean,
      default:false
    },
    // 是否数据请求回来 要改变文字
    reqFlag: {
      type:Boolean,
      default:false
    }
  },
  mounted() {
    
    // 初始化 scroll 位置
    // 实时监听
    this.initScroll()
  },
  methods:{
    // 初始化方法
    initScroll() {
      if(!this.$refs.wrapper) {
        return 
      }

      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper,
      {
        click:this.click,
        probeType:this.probeType,
        scrollX:this.scrollX,
        pullDownRefresh:this.pullDownRefresh,
        pullUpLoad:this.pullUpLoad
        })

      //初始化位置 
      this.scroll && this.scroll.scrollTo(0,0)

      // 派发滚动事件的监听
      if(this.probeType === 2 || this.probeType === 3) {
        let _that = this
        this.scroll.on('scroll',(pos) => {
          this.$emit('scrollTop',pos)
        })
      }

      // finishPullUp() 需要这个结尾
      // 派发上拉加载事件的监听
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.uptip.isUp = true
          this.$emit('pullingUpMove')
        })
      }

      // finishPullDown() 需要这个结尾
      // 派发下拉刷新事件的监听
      if(this.pullDownRefresh) {
        this.scroll.on('pullingDown',() => {
          this.downtip.isDown = true
          this.$emit('pullingDownMove')
        })
      }

    },

    // 回到顶部的方法
    scrollTo(x,y,time=500) {
     this.scroll && this.scroll.scrollTo(x,y,time)
    },

    // 完成重新刷新
    refresh() {
      console.log(12345)
      this.scroll && this.scroll.refresh()
    },

    // 完成上拉加载
    completeUp() {
     setTimeout(()=> {
       this.scroll && this.scroll.finishPullUp()
       this.uptip.isUp = false
     },3000)
    },

    // 完成下拉刷新
    completeDown() {
       // 完成更新 更改一下 状态
     setTimeout(()=> { 
       this.scroll && this.scroll.finishPullDown()
       this.downtip.isDown = false
     },500)
    }
    
  },
  watch:{
    reqFlag:{
      handler(newval) {
        console.log(newval)
        if(newval) {
          console.log('加载完成')
          this.uptip.tip = '加载完成'
        }else {
          this.uptip.tip = '上拉加载'
        }
      },
      deep:true,
      immediate:true
    }
  }
}
</script>

<style scoped>
  .box {
    position: relative;
  }
  .tip {
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
  }
  .tip img {
    width: 40px;
    height: 40px;
  }
  @keyframes move{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }

  .rotation{
    transform: rotate(360deg);
    animation: move 1.5s infinite linear;
  }
</style>