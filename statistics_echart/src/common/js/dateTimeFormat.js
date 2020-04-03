/*
* 时间日期格式转换
* */
const transformfunction = {
  // 转换时间的方法
  transDateTime (n) {
    let date = new Date(n)
    let H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let F = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return (H + F + S)
  },
  // 转换日期时间的方法
  transDate (n) {
    let date = new Date(n)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let F = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return (Y + M + D + H + F + S)
  },
  // 转换日期时间的方法
  transDateHF (n) {
    let date = new Date(n)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let F = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    return (Y + M + D + H + F)
  },
  // 转换日期的方法
  transformDate (n) {
    let date = new Date(n)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    return (Y + M + D)
  },
  // 转换年月的方法
  transformDateMonth (n) {
    let date = new Date(n)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    return (Y + M)
  },
  //指定时间加2秒
  addThree2S (n) { // dateStr格式为yyyy-mm-dd hh:mm:ss
    var t = new Date(n) // 你已知的时间
    var t_s = t.getTime() // 转化为时间戳毫秒数
    var nt = new Date() // 定义一个新时间
    nt.setTime(t_s + 1000 * 2) // 设置新时间比旧时间多一天
    return nt
  },
  //指定时间加4秒
  addThree4S (n) { // dateStr格式为yyyy-mm-dd hh:mm:ss
    var t = new Date(n) // 你已知的时间
    var t_s = t.getTime() // 转化为时间戳毫秒数
    var nt = new Date() // 定义一个新时间
    nt.setTime(t_s + 1000 * 4) // 设置新时间比旧时间多一天
    return nt
  }
}
export default transformfunction
