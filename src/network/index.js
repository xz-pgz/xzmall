// 改为es6 类的方法去封装 axios
import axios from 'axios'

// 定出请求类
class HttpRequest {
  // 设置baseUrl
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  // 设置一些axios 的参数
  getInsideConfig() {
    const config = {
      baseURL:this.baseURL,
      timeout:10000,
    }
    // 抛出参数
    return config
  }

  // 设置拦截 参数是 axios实例对象
  interceptors(instance) {
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
  }

  // 真实请求函数
  request({data={},method,url}) {
    // assign 将对象中 可以枚举的属性进行合并
    let options = Object.assign(this.getInsideConfig())
    let instance = axios.create(options)
    this.interceptors(instance)
    // 首先判断是get请求还是post请求
    let params = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
    return instance({
      method,
      url,
      [params]:data,
    }).then(res => {
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  }
} 
export default HttpRequest