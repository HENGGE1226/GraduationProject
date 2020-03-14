import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../common/axios.js'

Vue.use(Vuex)

const state = {
  token: window.localStorage.getItem('token') || '',
  ifLogin: sessionStorage.getItem('ifLogin') || false,
  userId: sessionStorage.getItem('userId') || '',
  userType: sessionStorage.getItem('userType') || '',
  userName: sessionStorage.getItem('userName') || '',
  ifaddRoute: false
}

const mutations = {
	LOGIN: (state, data) => {
    state.token = data.token
	},
	LOGOUT: (state) => {
    state.token = ''
	},
	USERINFO: (state, data) => {
    state.userId = data.userId
    state.userType = data.userType
    state.userName = data.userName
    sessionStorage.setItem('userId', data.userId)
    sessionStorage.setItem('userType', data.userType)
    sessionStorage.setItem('userName', data.userName)
    sessionStorage.setItem('ifLogin', true)
  },
  ADDROUTE: (state, bool) => {
    state.ifaddRoute = bool
  },
  IFLOGIN: (state, bool) => {
    state.ifLogin = bool
  }
}

const actions = {
	UserLogin ({ commit }, form) {
		return new Promise((resolve, reject) => {
			axios.userLogin(form)
				.then(({ data }) => {
					if (data.code === 200) {
            commit('LOGIN', data)
            commit('IFLOGIN', true)
            window.localStorage.setItem('token', data.token)
						resolve(data.mes)
					} else if (data.code === 201) {
						reject(data.mes)
					}
				})
		})
  },
  GetUserInfo ({ commit }, form) {
		return new Promise((resolve, reject) => {
			axios.getUserMessage()
				.then(({ data }) => {
					if (data.code === 200) {
            const res = data.data
            commit('USERINFO', res)
						resolve()
					} else if (data.code === 401) {
						reject(data.res)
					}
				})
		})
  },
  LogOut ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('LOGOUT')
      commit('IFLOGIN', false)
      window.localStorage.removeItem('token')
      window.sessionStorage.removeItem('ifLogin')
      window.sessionStorage.removeItem('userId')
      window.sessionStorage.removeItem('userType')
      window.sessionStorage.removeItem('userName')
    })
  },
	ChangeRoute ({ commit }, bool) {
		return new Promise((resolve, reject) => {
      commit('ADDROUTE', bool)
		})
  },
  ChangeIfLogin ({ commit }, bool) {
    return new Promise((resolve, reject) => {
      commit('IFLOGIN', bool)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
