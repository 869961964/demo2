<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
		  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>
		<div class="search">
			角色ID：
			<el-input v-model="query" placeholder="请输入角色ID" style="width: 20%;" >
			</el-input>
			角色名称：
			<el-input v-model="role_name" placeholder="请输入角色名称" style="width: 20%;" >
			</el-input>
			 <el-button type="success" @click="serch">搜索</el-button>
			  <el-button type="primary" @click="rest">重置</el-button>
			   <el-button  @click="add_limit" round style="margin-left: 180px;" class="el-icon-circle-plus">添加</el-button>
		</div>
		<template>
		<!-- 表格不需要循环数据，只需将数据传给table即可 -->
		  <el-table
			:data="tableData"
			border
			style="width: 100%">
			<el-table-column
			  type="index"
			  width="50">
			</el-table-column>
			<el-table-column
			  prop="roleId"
			  label="角色ID"
			  width="180">
			</el-table-column>
			<el-table-column
			  prop="roleName"
			  label="角色名称"
			  width="130">
			</el-table-column>
			<el-table-column
			  prop="roleLevel"
			  label="角色级别"
			   width="130">
			</el-table-column>
			<el-table-column
			  width="130"
			  prop="roleDef"
			  label="默认角色">
			</el-table-column>
			<el-table-column
			  prop=""
			  label="操作">
			  <template slot-scope="item">
			   <el-button type="primary" icon="el-icon-edit" circle  @click="userEdit(item.row)" ></el-button>
			   <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(item.row)"></el-button>
			    </template>	  
			</el-table-column>
		  </el-table>	 
		</template>
		 <el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
			  :page-size="10"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="total">
		</el-pagination>
	</div>
</template>

<script>
	export default {
    data() {
      return {
        tableData: [],
		// 每页显示条数
		pagesize:10,
		//总条数
		total:10,
		//当前页
		pagenum:1,
		//查询条件
		query:"",
		//删除返回数据
		msg:"",
		role_name:""
      }
    },
	methods:{
		//获取角色分页列表
		getUserPage(){
			this.$http.get("/limit/limit",{
				params:{query:this.query,pageIndex:this.pagenum,pageSize:this.pagesize}
			}).then(res=>{
				//返回总条数
				this.total=res.data.total
				this.tableData=res.data.list
			})
		},
		// switch开关事件	
		saveSwitch(item){
			console.log(item.id)
			 this.$message({
				  showClose: true,
				  message: item.userName+'修改状态成功！',
				  type: 'success'
				});
		},
		//改变每页显示多少条数据事件
		handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
		this.pagesize=val
		this.getUserPage()
		},
		//点击每一页触发事件
		handleCurrentChange(val) {
		//将当前页设置为跳转页面
		this.pagenum=val
		this.getUserPage()
        console.log(`当前页: ${val}`);
		},
		//搜索按钮
		serch(){
			this.getUserPage()
		},
		//重置
		rest(){
			this.query=""
			this.role_name=""
		},
		//新增权限
		add_limit(){
			this.$router.replace({ name: 'limitEdit', 
			 params: { item:"add"},
			})
		},
		//用户信息回显
		userEdit(item){
			//alert(item.id)
		 this.$router.push({ name: 'limitEdit',
		  params: { item:item},
		  });	
		},
		//确认删除
		deleteUser(item) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
			}).then(() => {
				this.$http.get("/user/deleteUser",{
					params:{username:item.userName}
				}).then(res=>{
					this.$message({
						type: 'success',
						message: res.data.msg+"!"
					  });
				this.getUserPage()	
				})
				
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
			});
		}
	},
	created(){
		this.getUserPage()
	}
  }
</script>

<style lang="less">
	.el-breadcrumb{
		color: #0000CC;
		font-size:18px;
	}
	.search{
		margin: 10px 0; 
		.el-input-group{
			width: 47%;
			margin-right: 5px;
		}
	}
</style>
