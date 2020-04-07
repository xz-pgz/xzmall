<template>
  <div id="good-list">
    <ul>
      <good-item v-for="item in list" :key="item.index" :data-item="item" @itemClick="itemClick"></good-item>
    </ul>
  </div>
</template>

<script>
import GoodItem from './GoodItem'
export default {
  name:"GoodList",
  props:{
    list: {
      type:Array,
      default() {
        return []
      }
    }
  },
  components:{
    GoodItem
  },
  watch:{
    list:{
      handler(newval) {
        this.list = newval
      },
      immediate:true,
      deep:true
    }
  },
  methods:{
    // 跳装商品详情
    itemClick(item) {
      this.$router.push('/detail/' + item.iid)
    },
  }
}
</script>

<style scoped>
  #good-list {
    display: flex;
    width: 100%
  }
  #good-list ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%
  }
</style>