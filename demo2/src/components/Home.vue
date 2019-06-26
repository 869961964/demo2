<template>
	<div class="home">
		 <el-container>
			<el-aside v-bind:style="{width:activewidth}">
				<div class="logo">
				<img 
                  style="width: 100%; height: 60px" 
				  src="../assets/logo.jpg" ></img>
				</div>
				<el-menu
						default-active="2"
						class="el-menu-vertical-demo"
						@open="handleOpen" 
						@close="handleClose" 
						:collapse="isCollapse"
						background-color="#48576a"
						text-color="#fff"
						active-text-color="yellow"
						:router="true"><!-- 菜单导航中开启路由 -->
						<el-submenu :index="item.id+''" v-for="item in menusList" :key="item.id">
							<template slot="title">
								<i :class="item.imgurl"></i>
								<span>{{item.authName}}</span>
							</template>
								<el-menu-item :key="item.id+''" v-for="item of item.children" :index="'/home/'+item.path"><i :class="item.imgurl" ></i>{{item.authName}}</el-menu-item>
						</el-submenu>
				</el-menu>
			</el-aside>
				<el-container>
					<!-- //顶部代码 -->
					<el-header>
						<i class="el-icon-menu" @click="openanclose" ></i>
						<h3>后台管理系统</h3>
						<!-- 警告提示标记 -->
						<el-badge :value="200" :max="99" class="item" style="left: 280px;">
						  <i class="el-icon-warning-outline" > </i>
						</el-badge>
						<el-col :span="4" class="userinfo"  >
							<el-dropdown trigger="hover" style="left: 50px; margin-left: 45px;">	
								<span class="el-dropdown-link userinfo-inner">
									<!-- 头像 -->
									<el-avatar :size="40"  style="margin-bottom: -1px; right: 25px;">
										<img src="../assets/user.jpeg"/>
								    </el-avatar>
									<!-- <img src="../assets/user.jpeg"  style="width: 70px; height: 50px;" /> --><!-- 头像 -->
									<!-- 红色标记 -->
									<el-badge :value="message"   v-show="message>0" class="item one" style="bottom: 37px; right: 6px;">
									    <i class="fa fa-tasks"></i>
									</el-badge>
									<!-- 小三角 -->
									<i class="el-icon-caret-bottom" style="width: 50px; height: 20px; margin-top: 25px;" ></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item><i class="el-icon-user-solid"></i><i>{{user}}</i></el-dropdown-item>
									<el-dropdown-item >
										<i class="el-icon-message-solid" />
										<i @click="showMsg()">我的消息</i>
									    <el-badge :value="message" class="item one"  v-show="message>0"> 
									    </el-badge>
									</el-dropdown-item>
									<el-dropdown-item><i class="el-icon-s-tools"/><i>设置</i></el-dropdown-item>
									<el-dropdown-item divided @click.native="exit()"><i class="el-icon-switch-button"/><i>退出登录</i></el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-col>
					</el-header>
				<!-- 	主页面代码 -->
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
	 user:"",
	 isCollapse: false,
	 menucolor:"",
	 activewidth:"200px",
	 message:""
    }	
  },
  methods:{
	  //获取菜单列
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
	//上线主动获取websocket消息
	getWebSocketMsg(){
		this.$http.get("/websocket/sendOneMessage", {
		　　params: { 'userId': this.user }
		}).then(res=>{			
			console.log(res.data)
		})
	},
	exit(){
		//退出按钮，设置token为空，返回登陆页面
		localStorage.setItem("token","")
		this.$router.replace({path: '/'}) 
	},
	 handleOpen(key, keyPath) {
	     console.log(key, keyPath);
	   },
	 handleClose(key, keyPath) {
	     console.log(key, keyPath);
	   },
	   //收起展开按钮事件
	 openanclose(){
		 if(this.activewidth=="200px"){
			  this.activewidth="80px"
			 this.isCollapse=true 
		 }else{
			  this.isCollapse=false 
			  this.activewidth="200px"
			 
		 }
	   },
	   //websocket操作
		initWebSocket: function () {
				// WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
				this.websock = new WebSocket("ws://localhost:8085/websocket/"+this.user);
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			  },
		websocketonopen: function () {
				console.log("WebSocket连接成功");
			  },
		websocketonerror: function (e) {
				console.log("WebSocket连接发生错误");
			  },
		websocketonmessage: function (e) {
// 				var da = JSON.parse(e.data);
// 				console.log(da);
// 				this.message = da;
				console.log(e.data)
				this.message=e.data
				this.$message({
					message: '你有'+this.message+'条消息未读！',
					type: 'warning'
				});
			  },
		websocketclose: function (e) {
				console.log("connection closed (" + e.code + ")");
			  },
		//显示websocket消息
		showMsg(){
			this.$router.replace({path:'/home/webSocketMsg'})
		}	  
	},
	  created() {
		this.getMenus()
		this.initWebSocket()
		this.$router.replace({path:'/home/index'})
		this.getWebSocketMsg()
	  },
	   destroyed: function () { // 离开页面生命周期函数
		this.websocketclose();
	  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
		}
	.el-menu{
		border-right: none !important;
	}

	.home{
		text-align: left;
		height: 100%;
		.el-container{
			height: 100%;
			.el-aside{
				width:100px;
				background:#48576a;
				.logo{
					height: 60px;
					background:cadetblue;
				}
			}
		.el-header{
			background:cadetblue;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			i{
				cursor: pointer;
				font-size: 35px;
			}
			span{
			    vertical-align: 10%;
				cursor: pointer;
				color: white;
			}
		}
		
	}
}
</style>
