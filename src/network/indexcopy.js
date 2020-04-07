import axios from 'axios'

// 封装一下 axios 请求代码
// 参数config
export default function request(config) {
  // 创建 axios 实例
  const instance = axios.create({
    baseURL:"http://123.207.32.32:8000/api/hy",
    // baseURL:"http://106.54.54.237:8000/api/hy",
    timeout:5000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {
    return err
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    return err
  })
  return instance(config)
}
