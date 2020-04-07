<template>
  <div id="tabbar">
    <ul class="tabbar-box">
      <li
        class="tabbar-item"
        v-for="(item,index) in tabbarData"
        :key="index"
        @click="toPath(item.link,index)"
      >
        <img :src="currentIndex == index?item.activeImg:item.img" alt />
        <span :style="{color:(currentIndex==index?activeColor:'')}">{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    tabbarData: {
      type: Array,
      required: true
    },
    activeColor: {
      type: String,
      default: "red"
    }
  },
  methods: {
    toPath(link) {
      this.$router.push(link);
    }
  },
  watch: {
    $route: {
      handler(newval) {
        var tag = 0;
        this.tabbarData.some((val, index) => {
          if (newval.path === val.link) {
            this.currentIndex = index;
            return true; // some ruturn true 退出整个循环
          }
          tag++
        });
        console.log(tag)
        if (tag === this.tabbarData.length) {
          if (newval.path === "/") {
            this.currentIndex = 0;
          } else {
            this.currentIndex = -1;
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped>
#tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.tabbar-box {
  display: flex;
  background-color: #f4f4f4;
}
.tabbar-item {
  flex: 1;
  height: 49px;
  box-shadow: 0 -3px 0px rgba(100, 100, 100, 0.1);
  text-align: center;
}
.tabbar-item img {
  margin: 3px auto 0px;
  height: 24px;
  width: 24px;
}
.tabbar-item span {
  font-size: 12px;
}
.currentcolor {
  color: red;
}
ul,
li {
  list-style: none;
}
img {
  display: block;
  font-size: 0;
}
</style>