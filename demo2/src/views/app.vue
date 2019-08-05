<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item ></el-breadcrumb-item>
		  <el-breadcrumb-item>App公告</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider>
		<div class="search">
			<el-input v-model="query" placeholder="请输入内容"  class="input-with-select">
				<el-button slot="append" icon="el-icon-search"></el-button>	
			</el-input>
			 <el-button  round @click="serch">筛选</el-button>
		</div>
		<template>
		<!-- 表格不需要循环数据，只需将数据传给table即可 -->
		  <el-table
		  			:data="tableData"
		  			border
		  			style="width: 100%">
					<el-table-column
					  prop="id"
					  label="#"
					  type="selection"
					  width="50">
					</el-table-column>
		  			<el-table-column
		  			  prop="userName"
		  			  label="姓名"
		  			  width="180">
		  			</el-table-column>
		  			<el-table-column
		  			  prop="userMsg"
		  			  label="公告消息">
		  			</el-table-column>
					<el-table-column
					  prop="sendStuts"
					  label="推送情况"
					  width="130">
					</el-table-column>
		  			<el-table-column
		  			  prop="creatTime"
		  			  label="日期"
		  			  width="220">
		  			</el-table-column>
		  			<el-table-column
		  			  prop=""
		  			  label="操作"
					  width="130">
					   <template slot-scope="item">
					   <el-button type="success" icon="el-icon-s-promotion" circle @click="sendMsg(item.row)"></el-button>
		  			   <el-button type="danger" icon="el-icon-delete" circle @click="deleteMsg(item.row)"></el-button>
					   </template>	  
		  			</el-table-column>
		  </el-table>	 
		</template>
		 <el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
			  :page-size="pagesize"
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
		query:""
      }
    },
	methods:{
		//获取WebSosgcket消息分页列表
		getWebSocketMsg(){
			this.$http.get("/appWebsocket/getAppMsge", {
			　　params: { 'userName': "lisi",pageIndex:this.pagenum,pageSize:this.pagesize }
			}).then(res=>{			
			this.total=res.data.total
			this.tableData=res.data.list
			})
		},
		// 消息已读事件
		sendMsg(item){
			console.log(item.sendStuts)
			this.$http.get("/appWebsocket/sendMsg", {
			　　params: { id: item.id,"sendStuts":item.sendStuts }
			}).then(res=>{			
			this.getWebSocketMsg()
			this.$message({
							  showClose: true,
							  message: res.data,
							  type: 'success'
							});
			})
			 
		},
		//删除公告消息
		deleteMsg(item){
			this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
			}).then(() => {
					this.$http.get("/appWebsocket/deleteMsg", {
				　　params: { id: item.id }
				}).then(res=>{			
				this.getWebSocketMsg()
				this.$message({
					  showClose: true,
					  message: ""+res.data.code,
					  type: 'success'
					});
				})
			}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					  });          
				});
	   },
		
		//改变每页显示多少条数据事件
		handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
		this.pagesize=val
		this.getWebSocketMsg()
		},
		//点击每一页触发事件
		handleCurrentChange(val) {
		//将当前页设置为跳转页面
		this.pagenum=val
		this.getWebSocketMsg()
        console.log(`当前页: ${val}`);
		},
		//搜索按钮
		serch(){
			this.getWebSocketMsg()
		}
		
	},
	created(){
		this.getWebSocketMsg()
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
