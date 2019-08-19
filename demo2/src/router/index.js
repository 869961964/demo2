import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'//主页面路由
import Login from '@/components/Login'//登陆页面
import users from '@/views/users'//用户列表页面
import index from '@/views/index'//主页面
import webSocketMsg from '@/views/webSocketMsg'//用户公告页面
import userEdit from '@/views/userEdit'//用户信息编辑页面
import map from '@/views/map'//地图页面
import list from '@/views/list'//数据列表展示页面
import limit from '@/views/limit'//权限展示页面
import limitEdit from '@/views/limitEdit'//权限编辑页面
import modfiyLimit from '@/views/modfiyLimit'//用户权限修改页面
import app from '@/views/app'//app用户推送信息
import userList from '@/views/userList'//用户列表
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
				},
				{
					path:'index',
					component:index
				},
				{
					path:'webSocketMsg',
					component:webSocketMsg
				},
				{
					path:'userEdit',
					name:'userEdit',
					component:userEdit 
				},
				{
					path:'map',
					name:'map',
					component:map 
				},
				{
					path:'list',
					name:'list',
					component:list 
				},
				{
					path:'limit',
					name:'limit',
					component:limit
				},
				{
					path:'limitEdit',
					name:'limitEdit',
					component:limitEdit
				},
				{
					path:'modfiyLimit',
					name:'modfiyLimit',
					component:modfiyLimit
				},
				{
					path:'app',
					name:'app',
					component:app
				},
				{
					path:'userList',
					name:'userList',
					component:userList
				}
			]
		}
  ]
})
