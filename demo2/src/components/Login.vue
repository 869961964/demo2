<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">智能井盖管理系统</h3>
      <el-form-item prop="username">
        <!-- <span class="el-icon-user">
          <svg-icon icon-class="user"/>
        </span> -->
		<i class="el-icon-user"></i>
        <el-input v-model="loginForm.username" autoComplete="on"/>
      </el-form-item>
      <el-form-item prop="password">
       <!-- <span class="el-icon-lock">
          <svg-icon icon-class="password"></svg-icon>
        </span> -->
		<i class="el-icon-lock"></i>
        <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on"></el-input>
      </el-form-item>
	  <el-checkbox class="login_remember" v-model="checked"
                 label-position="left">记住密码</el-checkbox>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin" @keyup.enter.native="loginEnter('loginData')" >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', message: "请输入用户名"}],
          password: [{required: true, trigger: 'blur', message: "请输入密码"}]
        },
        loading: false,
		checked: true,
      }
    },
    methods: {
      handleLogin() {
       	this.$http.post('/login123', {
       	username: this.loginForm.username,
       	password: this.loginForm.password
       }).then((response)=> {
			//将tokeny与userid存到loacalStorage中
			if(response.data.token==""){
				this.$message({
					message: response.data.data,
					type: 'error'
				});
			}else{
				localStorage.setItem("token",response.data.token)
				localStorage.setItem("userID",response.data.data)
				this.$message({
					message: '恭喜你，登陆成功！',
					type: 'success'
				});
				// 在请求成功后把document.onkeydown置为undefined
				document.onkeydown = undefined;
				//console.log(response.data.token);
				this.$router.replace({path: '/home'})  
			}	
       }).catch(function (error) {
       	console.log(error);
       });
				//this.$router.replace({path: '/home'})  
      },
			//按ENTER键登陆
			loginEnter(){
				this.handleLogin()
			}
    },
		created(){
			//绑定enter按键登陆
			var _self = this;
			document.onkeydown = function(e){
				if(window.event == undefined){
					var key = e.keyCode;
				}else{
					var key = window.event.keyCode;
				}
				if(key == 13){
					_self.loginEnter('loginData');
				}
			}
		}
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/mixin.scss";
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  
  .login-container {
	  height: 100%;
	background-image: url(" ../assets/denglu.jpg ");
    background-repeat: no-repeat;   //不重复
    background-size: 100% 100%;
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>