// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Echarts from 'echarts'
import htmlToPdf from '@/common/js/htmlToPdf'
Vue.use(htmlToPdf)
// import JsonExcel from 'vue-json-excel'
Vue.use(Echarts)
Vue.use(ElementUI)
Vue.prototype.echarts = Echarts
// Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
