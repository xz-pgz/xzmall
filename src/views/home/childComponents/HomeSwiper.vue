<template>
  <div id="homeswiper">
    <swiper>
      <swiper-item v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt @load="swiperImg"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
  name:"HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return {
      isLoad:false
    }
  },
  props:{
    banner:{
      type:Array,
      default() {
        return []
      }
    }
  },
  watch:{
    banner: {
      handler(newVal,oldVal) {
        this.banner = newVal
      },
      immediate:true,
      deep:true
    }
  },
  methods:{
    swiperImg() {
      if(!this.isLoad) {
        this.$emit('swiperImg')
        this.isLoad = true
      }
    },
  }
};
</script>

<style>
</style>