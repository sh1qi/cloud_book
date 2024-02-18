import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || false,
    name: localStorage.getItem('name') || false,
    pic: localStorage.getItem('pic') || false,
    uid: localStorage.getItem('uid') || false,
    phone: localStorage.getItem('phone') || false,
    apply: localStorage.getItem('apply') || false,
    isLogin: localStorage.getItem('isLogin') || 2,
    BaseUrl: 'http://localhost:5000'
  },
  getters: {
    getToken: (state) => {
      return state.token
    }
  },
  mutations: {
    setName: (state, name) => {
      state.name = name
      localStorage.setItem('name', name)
    },
    setToken: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    setApply: (state, apply) => {
      state.apply = apply
      localStorage.setItem('apply', apply)
    },
    setPhone: (state, phone) => {
      state.phone = phone
      localStorage.setItem('phone', phone)
    },
    setPic: (state, pic) => {
      state.pic = pic
      localStorage.setItem('pic', pic)
    },
    setUid: (state, uid) => {
      state.uid = uid
      localStorage.setItem('uid', uid)
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
      localStorage.setItem('isLogin', isLogin)
    }
  },
  actions: {
  },
  modules: {
  }
})
