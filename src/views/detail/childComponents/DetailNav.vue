<template>
  <div id="DetailNav">
    <nav-bar>
      <div slot="left" class="nav-imgbox"><img src="~assets/img/common/back.svg" alt="" class="nav-img" @click="goBack"></div>
      <div slot="center">
        <ul class="nav-ul">
          <li v-for="(item,index) in detailNav" :key="index" class="nav-li" @click="detClick(item,index)" :class="[currentIndex==index?'active':'']">{{item}}</li>
        </ul>
      </div>
    </nav-bar> 
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:"DetailNav",
  data() {
    return {
      detailNav:['商品','参数','评论','推荐'],
      currentIndex : 0
    }
  },
  components:{
    NavBar
  },
  methods:{
    detClick(item,index) {
      this.currentIndex = index
      this.$emit('detClick',index)
    },
    goBack() {
      history.go(-1)
    }
  }
}
</script>

<style scoped>
  .nav-ul {
    display: flex;
  }
  .nav-li {
    flex: 1;
  }
  .nav-imgbox {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .nav-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 40%;
    cursor: pointer;
  }
  .active {
    color: var(--color-high-text);
  }
</style>