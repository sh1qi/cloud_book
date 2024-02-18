import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/reset.css'
import * as echarts from 'echarts';
import editor from "wangeditor"

import api from '@/api/index'


Vue.prototype.$echarts = echarts
Vue.prototype.$editor = editor
Vue.prototype.$api = api

Vue.config.productionTip = false



router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (store.state.token) {
      const res = await api.verifyToken(store.state.token)
      if (res.data.isValid) {
        next()
        return
      }
      alert(res.data.errorMag)
      next({ name: 'LoginView' })
      return
    }
    next({ name: 'LoginView' })
  }
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
