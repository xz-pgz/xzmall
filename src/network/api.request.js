import HttpRequest from './index'

// 设置不同的环境的 baseUrl 
// vue-cli npm run dev 就是开发环境 npm run build 就是生产环境
// node ==> process.env.NODE_ENV
// 106.54.54.237
// 123.207.32.32
const baseURL = process.env.NODE_ENV === 'development' ? 'http://106.54.54.237:8000/api/wh' : 'http://123.207.32.32:8000/api/wh'
const axios = new HttpRequest(baseURL)
export default axios