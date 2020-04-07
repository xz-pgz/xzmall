<template>
  <div id="good-item">
    <li @click="itemClick">
      <div class="good-img">
        <!-- 监听图片加载完成 -->
        <img :src="showImg" alt="" @load="loadItem">
      </div>
      <div class="good-text">
      <p class="good-p">{{dataItem.title}}</p>
      <div class="good-num">
        <span class="price">{{dataItem.price}}</span>
        <span class="collect">{{dataItem.cfav}}</span>
      </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name:"GoodItem",
  props:{
    dataItem:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    showImg() {
      // 这种写法 再继续往下点 就报错了 因为this.dataItem.show 不是个对象
      // this.dataItem.show && this.dataItem.show.img 所以是两步判断
      return this.dataItem.show && this.dataItem.show.img || this.dataItem.image
    }
  },
  methods:{
    // 加载图片完毕
    loadItem() {
      this.$bus.$emit('loadImg')
    },
    itemClick() {
      this.$emit('itemClick',this.dataItem)
    }
  },
  watch:{
    dataItem:{
      handler(newVal){
        this.dataItem = newVal
      },
      immediate:true,
      deep:true
    }
  }
}
</script>

<style scoped>
    #good-item {
      width: 48%;
      margin: 1%;
    }
    #good-item li {
      width: 100%
    }
    .good-img {
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 5px gainsboro;
      width: 100%;
    }
    .good-img img {
      width: 100%
    }
    .good-p {
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      margin: 5px 0px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 12px
    }
    .good-text {
      width: 100%
    }
    .good-num {
      display: flex;
      margin: 0 5px;
      justify-content:flex-start; 
    }
    .price {
      color: var(--color-tint)
    }
    .collect {
      margin-left: auto;
      font-size: 12px;
      color: #999999
    }
</style>