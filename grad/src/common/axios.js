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

  // 修改用户信息
  updateUserMessage (data) {
    return instance.post('/api/updateUserMessage', data)
  },

  // 修改用户密码
  updatePassword (data) {
    return instance.post('/api/updatePassword', data) 
  },

  // 增加用户
  addUser (data) {
    return instance.post('/api/addUser', data)
  },

  // 删除用户
  deleteUser (data) {
    return instance.post('/api/deleteUser', data)
  },

  // 获取用户权限
  getAuth () {
    return instance.get('/api/getUserAuth')
  },

  // 获取用户权限
  getUserList () {
    return instance.get('/api/getUserList')
  },

  // 获取图片上传token
  getUploadToken () {
    return instance.get('/api/getUploadToken')
  },

  // 创建课程
  createClass (values) {
    return instance.post('/api/createClass', values)
  },

  // 删除课程
  deleteClass (values) {
    return instance.post('/api/deleteClass', values)
  },

  // 关闭课程
  offClass (values) {
    return instance.post('/api/offClass', values)
  },

  // 开启课程
  openClass (values) {
    return instance.post('/api/openClass', values)
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

  // 退出课程
  quitClass (values) {
    return instance.post('/api/quitClass', values)
  },

  // 获取个人所选课程
  getUserClass (values) {
    return instance.post('/api/getUserClass', values)
  },

  // 获取课程当前教学进度
  getProcessList (values) {
    return instance.post('/api/getProcessList', values)
  },

  // 修改教学进度信息
  updateProcess (values) {
    return instance.post('/api/updateProcess', values)
  },

  // 增加教学进度
  addProcess (values) {
    return instance.post('/api/addProcess', values)
  },

  // 删除教学进度
  deleteProcess (values) {
    return instance.post('/api/deleteProcess', values)
  },

  // 获取课程所有通知
  getNoticeList (values) {
    return instance.post('/api/getNoticeList', values)
  },

  // 获取课程详情
  getNoticeDetail (values) {
    return instance.post('/api/getNotice', values)
  },

  // 删除课程通知
  deleteNotice (values) {
    return instance.post('/api/deleteNotice', values)
  },

  // 发放或编辑通知
  updateNotice (values) {
    return instance.post('/api/updateNotice', values)
  },

  // 获取课程所有作业
  getWorkList (values) {
    return instance.post('/api/getWorkList', values)
  },

  // 获取作业详情
  getWorkDetail (values) {
    return instance.post('/api/getWork', values)
  },

  // 发放或编辑作业
  updateWork (values) {
    return instance.post('/api/updateWork', values)
  },

  // 删除课程作业
  deleteWork (values) {
    return instance.post('/api/deleteWork', values)
  },

  // 获取个人提交作业状态
  getWorkStatus (values) {
    return instance.post('/api/getWorkStatus', values)
  },

  // 获取所有作业的提交情况
  getTotalList (values) {
    return instance.post('/api/getTotalList', values)
  },

  // 提交作业
  submitWork (values) {
    return instance.post('/api/submitWork', values)
  },

  // 提交作业
  submitPoint (values) {
    return instance.post('/api/submitPoint', values)
  },

  // 获取所有帖子
  getPostList (values) {
    return instance.post('/api/getPostList', values) 
  },

  // 获取帖子的信息
  getPost (values) {
    return instance.post('/api/getPost', values) 
  },

  // 获取帖子的所有评论
  getPostReply (values) {
    return instance.post('/api/getPostReply', values)  
  },

  // 发表帖子
  submitPost (values) {
    return instance.post('/api/submitPost', values)  
  },

  // 发表评论
  submitReply (values) {
    return instance.post('/api/submitReply', values)  
  },

  // 删除帖子
  deletePost (values) {
    return instance.post('/api/deletePost', values)  
  },

  // 删除评论
  deleteReply (values) {
    return instance.post('/api/deleteReply', values)  
  },

  // 上传资源
  uploadResource (values) {
    return instance.post('/api/uploadResource', values)  
  },

  // 获取资源列表
  getResourceList (values) {
    return instance.post('/api/getResourceList', values)  
  },

  // 删除资源
  deleteResource (values) {
    return instance.post('/api/deleteResource', values)  
  }
}
