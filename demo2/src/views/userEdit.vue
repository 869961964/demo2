<template>
	<div>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{path: '/home/users'  }" class="el-icon-arrow-left">返回</el-breadcrumb-item>
	<!--  <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item :to="{ path: '/home/users' }">角色列表</el-breadcrumb-item> -->
	  <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
	</el-breadcrumb>
		<el-form ref="form" :model="form" label-width="68px" style="width: 500px;">
		  <el-form-item label="姓名">
			<el-input v-model="form.userName" ></el-input>
		  </el-form-item>
		   <el-form-item label="邮箱">
		  	<el-input v-model="form.email" ></el-input>
		  </el-form-item>
		   <el-form-item label="密码">
		  	<el-input v-model="form.password" ></el-input>
		  </el-form-item>
		   <el-form-item label="再次输入">
		  	<el-input v-model="form.password" ></el-input>
		  </el-form-item>
		  <el-form-item label="性别">
			<el-select v-model="form.sex" placeholder="请选择性别">
			  <el-option label="男" value="男"></el-option>
			  <el-option label="女" value="女"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="用户状态">
			<el-switch v-model="form.status"></el-switch>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button>取消</el-button>
		  </el-form-item>
	</el-form>
	</div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          userName: '',
          email: '',
		  sex: '',
          status: false,
		  password:'123456',
		  title:""
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
	created(){	
		if(this.$route.params.item=="add"){
			this.title="新增用户"
		}else{
			this.title="用户信息修改"
			this.form.userName=this.$route.params.item.userName
			this.form.email=this.$route.params.item.email
			this.form.password=this.$route.params.item.passWord
			this.form.sex=this.$route.params.item.sex
			this.form.status=this.$route.params.item.status
		}
	}
  }
</script>

<style lang="less">
	.el-breadcrumb{
		color: #0000CC;
		font-size:18px;
		}
	.el-form{
		margin-top: 40px;
	}	
		
</style>
