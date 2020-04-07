<template>
  <div class="DetailSwiper">
    <swiper class="swiper-main">
      <swiper-item v-for="(item,index) in DeatilBanner" :key="index">
        <img :src="item" alt />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
  name:"DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data() {
    return {}
  },
  props:{
    DeatilBanner:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-main {
  height: 250px;
  overflow: hidden;
}
</style>