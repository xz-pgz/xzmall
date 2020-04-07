import HttpRequest from './api.request'
let HomeHttpConfig = {
  getHomeMultidata(data,method='get',url='/home/multidata') {
    return HttpRequest.request({
      url,
      method,
      data
    })
  },
  getHomeGoods(data,method='get',url='/home/data') {
    return HttpRequest.request({
        url,
        method,
        data
    })
  }
}

export default HomeHttpConfig