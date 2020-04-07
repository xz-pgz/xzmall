import HttpRequest from './api.request'
let DetailHttpConfig = {
  getDetail(data,method='get',url='/detail') {
    return HttpRequest.request({
      url,
      method,
      data
    })
  },
  getRecommend(data,method='get',url='/recommend') {
    return HttpRequest.request({
      url,
      method,
      data
    })
  }
}
export default DetailHttpConfig