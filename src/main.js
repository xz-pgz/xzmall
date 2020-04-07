import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 引入路由
// 虽然 是抛出啦 但命名就是用router 因为你需要用到 this.$router 和 this.route
// 跟 vuex 一样 也要用store 命名
import router from './router'

// 引入axios 请求文件 配置 全局请求
import httpConfig from 'network/request'
Vue.prototype.$axios = httpConfig
// 事件总线 可以拿到比较深的组件跑出来的事件
Vue.prototype.$bus = new Vue()

// 引入全局组件
import components from 'common/components.js'
Vue.use(components)
new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount('#app')
