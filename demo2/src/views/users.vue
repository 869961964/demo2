<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
		  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="search">
			<el-input placeholder="请输入内容"  class="input-with-select">
				<el-button slot="append" icon="el-icon-search"></el-button>	
			</el-input>
			 <el-button type="success">主要按钮</el-button>
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
			  min-width="40%"
			  prop="sex"
			  label="用户状态">
			   <template slot-scope="item">
				  <!-- item.row是每一行的数据 -->
				   <el-switch
				    v-model="item.row.status"
					active-color="#13ce66"
					inactive-color="#ff4949"
					@change="saveSwitch(item.row)">
					</el-switch>
			 </template>	  
			</el-table-column>
			<el-table-column
			  prop=""
			  label="操作">
			   <el-button type="primary" icon="el-icon-edit" circle></el-button>
			   <el-button type="success" icon="el-icon-check" circle></el-button>
			   <el-button type="danger" icon="el-icon-delete" circle></el-button>
			</el-table-column>
		  </el-table>	 
		</template>
		 <el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :page-sizes="[1, 2, 3, 4]"
			  :page-size="2"
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
		pagesize:2,
		//总条数
		total:10,
		//当前页
		pagenum:1
      }
    },
	methods:{
		//获取角色分页列表
		getUserPage(){
			this.$http.get("/userPage",{
				params:{query:"",pageIndex:this.pagenum,pageSize:this.pagesize}
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
				  message: item.id+'修改状态成功！',
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
