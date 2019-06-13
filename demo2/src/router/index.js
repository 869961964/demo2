import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import Login from '@/components/Login'
import users from '@/views/users'

Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/',
		  name: 'Login',
		  component: Login
		},
		{
		  path: '/home',
		  name: 'home',
		  component: home,
			children:[
				{
					path:'users',
					component:users
				}
			]
		}
  ]
})
