<template>
  <div id="tabcontrol">
    <div v-for="(item,index) in navtext" :key="index" class="tabcontrol-item">
      <span @click="changeColor(index,item)" :class="current==index?'current-click':''">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  data() {
    return {
      current:0
    }
  },
  props:{
    navtext: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods:{
    changeColor(index,item) {
      this.current =index
      this.$emit('changeColor',index)
    }
  },
  watch: {
    navtext: {
      handler(newVal) {
        this.navtext = newVal
      },
      immediate: true,
      deep:true
    }
  }
}
</script>

<style scoped>
#tabcontrol {
  display: flex;
  background-color: #ffffff;
  /* position: sticky; */
  /* top: 44px; */
}
.tabcontrol-item {
  flex:1;
  text-align: center
}
.tabcontrol-item span {
  padding:5px;
  height: 32px;
  display: inline-block;
}
.current-click {
  color: var(--color-tint);
  border-bottom: 2px solid  var(--color-tint);
}
</style>