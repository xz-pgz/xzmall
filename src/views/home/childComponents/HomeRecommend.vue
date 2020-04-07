<template>
  <div id="homerecommend">
    <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'HomeRecommend',
  props:{
    recommend:{
      type:Array,
      default() {
        return []
      }
    }
  },
  watch: {
    recommend: {
      handler(newVal,oldVal) {
        this.recommend = newVal
      },
      immediate:true,
      deep:true
    }
  }
}
</script>

<style>
#homerecommend {
  display: flex;
  text-align: center;
  padding: 10px 0 15px;
  border-bottom: 5px solid #f6f2f2
}
.recommend-item {
  flex:1;
}
.recommend-item a {
  display: block
}
.recommend-item img {
  width: 70px;
  margin: 0 auto;
}
.recommend-item p {
  font-size:14px;
  margin-top: 5px;
} 
</style>