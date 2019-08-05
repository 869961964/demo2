<template>
	<div>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{path: '/home/limit'  }" class="el-icon-arrow-left">返回</el-breadcrumb-item>
	<!--  <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item :to="{ path: '/home/users' }">角色列表</el-breadcrumb-item> -->
	  <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
	</el-breadcrumb>
	<el-divider></el-divider>
		<el-form ref="form" :model="form" label-width="68px" style="width: 500px;">
		  <el-form-item label="角色ID">
			<el-input v-model="form.role_id" ></el-input>
		  </el-form-item>
		   <el-form-item label="角色名称">
		  	<el-input v-model="form.role_name" ></el-input>
		  </el-form-item>
		   <el-form-item label="角色级别">
		  	<el-input v-model="form.role_leavel" ></el-input>
		  </el-form-item>
		   <el-form-item label="默认角色">
		  	<el-input v-model="form.roel_def" ></el-input>
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
          role_id: '',
          role_name: '',
		  role_leavel: '',
          roel_def: '',
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
			this.title="新增权限"
		}else{
			this.title="权限信息修改"
			this.form.role_id=this.$route.params.item.roleId
			this.form.role_name=this.$route.params.item.roleName
			this.form.role_leavel=this.$route.params.item.roleLevel
			this.form.roel_def=this.$route.params.item.roleDef
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
