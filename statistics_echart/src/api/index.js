import axios from 'axios'
// import { Message } from 'element-ui'
// import store from '../store'
import system from './system'
// let server = '/dcmapi/'

const api = Object.assign(system)

// 初始化axios参数
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default api
