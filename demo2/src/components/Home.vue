<template>
	<div class="home">
		 <el-container>
			<el-aside width="200px">
				<div class="logo"></div>
				<el-menu
						default-active="2"
						class="el-menu-vertical-demo"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="yellow"
						:router="true"><!-- 菜单导航中开启路由 -->
						<el-submenu :index="item.id+''" v-for="item in menusList" :key="item.id">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>{{item.authName}}</span>
							</template>
								<el-menu-item :key="item.id+''" v-for="item of item.children" :index="'/home/'+item.path"><i class="el-icon-menu"></i>{{item.authName}}</el-menu-item>
						</el-submenu>
				</el-menu>
			</el-aside>
				<el-container>
					<el-header>
						<i class="el-icon-s-fold"></i>
						<h3>后台管理系统</h3>
						<div>
							你好，{{user}}  <span @click="exit">退出</span>
						</div>
					</el-header>
					<el-main>
						<router-view></router-view>
					</el-main>
				</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
     menusList:[],
	 user:""
    }	
  },
  methods:{
	getMenus(){
		let userID = localStorage.getItem("userID");
		this.user= userID
		console.log(userID)
		this.$http.get("/menus", {
		　　params: { 'userID': userID }
		}).then(res=>{			
			this.menusList=res.data
		})
		
	},
	exit(){
		//退出按钮，设置token为空，返回登陆页面
		localStorage.setItem("token","")
		this.$router.replace({path: '/'}) 
	}
  },
  created() {
  	this.getMenus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.el-menu{
		border-right: none !important;
	}
.home{
	text-align: left;
	height: 100%;
	.el-container{
		height: 100%;
		.el-aside{
			background: #545c64;
			.logo{
					height: 60px;
				background: sandybrown;
			}
		}
		.el-header{
			background: #545c64;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			i{
				cursor: pointer;
				font-size: 35px;
			}
			span{
				cursor: pointer;
				color: #409eff;
			}
		}
		
	}
}

</style>
