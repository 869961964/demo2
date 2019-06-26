// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
import echarts from 'echarts'
//设置所有axios请求服务器之前，将headers的Authorization属性设置为token
axios.interceptors.request.use(config=>{
	console.log(config)
	let token = localStorage.getItem("token");
	if(token){
		console.log(token)
		config.headers["Authorization"]= token
	}
	return config
})

Vue.prototype.$http = axios;
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts 

Vue.use(ElementUI);

//路由全局守卫
router.beforeEach((to,from,next)=>{
	let token = localStorage.getItem('token')
	if(token){
		next()
	}else{
		if(to.path=="/"){
			next()
		}else{
			next("/")
		}
	}
	})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

