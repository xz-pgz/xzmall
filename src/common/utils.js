/***封装共用函数 */
// 防抖动函数 原理 就是你定时里面的函数还没做完 你下一次新的函数已经来了
export function debounce(func,delay){
  var timer = null
  // 防止 timer 这个变量每次都被初始化 为 null
  return function(...args) {
    // 闭包 跟 普通函数 最大的区别就是 调用的时候 只会初始化 内部函数的 变量 不用初始化 全局变量
    // 闭包 最直观的理解就是一个函数 返回一个函数
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      // 闭包的this 指向 内部函数 跟 外部函数 是不一样的 所以这里用箭头函数 找不到父级的this 指向 所以就是undefined 
      func.apply(this,args) // 修正this的指向 把 vue 实例转给fun 
    },delay)
  }
}

/**格式化日期 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
