import Vue from 'vue'
import VueRouter from 'vue-router'
// 安装插件
Vue.use(VueRouter)

// 解决push 两次相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 引入组建 使用路由懒加载
const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Categroy = () => import('views/categroy/Categroy')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
// 抽取路由配置对象
const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/categroy',
    component:Categroy
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

// 创建路由对象
const router = new VueRouter({
  routes,
  mode:'history'
})
export default router