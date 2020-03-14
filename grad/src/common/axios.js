import axios from 'axios'
import router from '../router/index'

axios.defaults.withCredentials = true
// 创建axios实例
var instance = axios.create({
  timeout: 5000, // 请求超过5秒即超时返回错误
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// request拦截器
instance.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token) {  
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => { 
    if (error.response) {
      switch (error.response.code) {
        case 401:
          router.push('/')
          console.log('222')
          window.sessionStorage.removeItem('ifLogin')
          window.sessionStorage.removeItem('userId')
          window.sessionStorage.removeItem('userType')
          window.sessionStorage.removeItem('userName')
      }
    }
    return Promise.reject(error.response)
  }
)

export default {
  // 用户登陆
  userLogin (data) {
    return instance.post('/api/login', data)
  },

  // 获取用户信息
  getUserMessage () {
    return instance.get('/api/getUserMessage')
  },

  // 获取用户权限
  getAuth () {
    return instance.get('/api/getUserAuth')
  },

  // 获取图片上传token
  getUploadToken () {
    return instance.get('/api/getUploadToken')
  },

  // 创建课程
  createClass (values) {
    return instance.post('/api/createClass', values)
  },

  // 搜索所有课程
  queryClass (values) {
    return instance.post('/api/queryClass', values)
  },

  // 获取课程详细信息
  getClassDetail (id) {
    return instance.post('/api/getClassDetail', id)
  },

  // 检查选课资格
  checkChooseAuth (id) {
    return instance.post('/api/checkChooseAuth', id)
  },

  // 选择课程
  chooseClass (id) {
    return instance.post('/api/chooseClass', id)
  },

  // 获取个人所选课程
  getUserClass (values) {
    return instance.post('/api/getUserClass', values)
  }
}
