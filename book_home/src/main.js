import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/reset.css'
import api from "@/api/index"

Vue.config.productionTip = false
Vue.prototype.$api = api

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    console.log(1);
    if (store.state.token) {
      const res = await api.verifyToken(store.state.token)
      if (res.data.isValid) {
        store.state.isLogin = "1"
        next()
        return
      }
      alert(res.data.errorMag)
      store.state.isLogin = "2"
      store.state.token = false
      store.state.name = false
      store.state.uid = false
      store.state.pic = false
      next({ name: 'LoginView' })
      return
    }
  }

  if (store.state.token) {
    if (store.state.token != "false") {
      console.log(store.state.token);
      const res = await api.verifyToken(store.state.token)
      console.log(res);
      if (res.data.isValid) {
        store.state.isLogin = true
        next()
        return

      }
      store.state.isLogin = "2"
      store.state.token = false
      store.state.name = false
      store.state.uid = false
      store.state.pic = false
      next()
      return
    }
    console.log(3);
    store.state.isLogin = "2"
    store.state.token = false
    store.state.name = false
    store.state.uid = false
    store.state.pic = false
    next()
    return
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
