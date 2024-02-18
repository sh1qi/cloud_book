import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || false,
    name: sessionStorage.getItem('name') || '',
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
      sessionStorage.setItem('name', name)
    },
    setToken: (state, token) => {
      state.token = token
      sessionStorage.setItem('token', token)
    },
  },
  actions: {
  },
  modules: {
  }
})
