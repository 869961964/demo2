<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
		  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider><!-- 分割线 -->
		<div class="search">
			<el-input v-model="query" placeholder="请输入内容"  class="input-with-select">
				<el-button slot="append" icon="el-icon-search"></el-button>	
			</el-input>
			 <el-button type="success" @click="serch" round  >搜索</el-button>
			  <el-button type="primary" @click="addUser" round class="el-icon-circle-plus-outline" style="background: ;">新增用户</el-button>
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
			  prop="date"
			  label="日期"
			  width="180">
			</el-table-column>
			<el-table-column
			  prop="userName"
			  label="姓名"
			  width="130">
			</el-table-column>
			<el-table-column
			  prop="email"
			  label="邮箱">
			</el-table-column>
			<el-table-column
			  min-width="40%"
			  prop="sex"
			  label="性别">
			</el-table-column>
			<el-table-column
			  prop="roleName"
			  label="角色名称"
			  width="130">
			</el-table-column>
			<el-table-column
			  min-width="40%"
			  prop="sex"
			  label="用户状态">
			   <template slot-scope="item">
				  <!-- item.row是每一行的数据 -->
				   <el-switch
				    v-model="item.row.userStatus"
					active-color="#13ce66"
					inactive-color="#ff4949"
					@change="saveSwitch(item.row)">
					</el-switch>
			 </template>	  
			</el-table-column>
			<el-table-column
			  prop=""
			  label="操作">
			  <template slot-scope="item">
			   <el-button type="primary" icon="el-icon-edit" circle  @click="userEdit(item.row)" ></el-button>
			   <el-button type="success" icon="el-icon-unlock" circle @click="modify_limit(item.row)"></el-button>
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
		pagesize:8,
		//总条数
		total:10,
		//当前页
		pagenum:1,
		//查询条件
		query:"",
		//删除返回数据
		msg:""
      }
    },
	methods:{
		//获取角色分页列表
		getUserPage(){
			this.$http.get("/user/userPage",{
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
		//新增用户
		addUser(){
			this.$router.replace({ name: 'userEdit', 
			 params: { item:"add"},
			})
		},
		//用户信息回显
		userEdit(item){
			//alert(item.id)
		 this.$router.push({ name: 'userEdit',
		  params: { item:item},
		  });	
		},
		modify_limit(item){
		 this.$router.replace({ name: 'modfiyLimit', 
		  params: { item:item},
			})
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
