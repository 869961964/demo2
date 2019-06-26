<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>消息通知</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="search">
			<el-input v-model="query" placeholder="请输入内容"  class="input-with-select">
				<el-button slot="append" icon="el-icon-search"></el-button>	
			</el-input>
			 <el-button type="primary" round @click="serch">筛选</el-button>
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
					  width="100"
					  v-show="false">
					</el-table-column>
		  			<el-table-column
		  			  prop="userId"
		  			  label="姓名"
		  			  width="180">
		  			</el-table-column>
		  			<el-table-column
		  			  prop="message"
		  			  label="公告消息">
		  			</el-table-column>
					<el-table-column
					  prop="readStuts"
					  label="查看情况"
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
					   <el-button type="success" icon="el-icon-check" circle @click="readOk(item.row)"></el-button>
		  			   <el-button type="danger" icon="el-icon-delete" circle @click="deleteMsg(item.row)"></el-button>
					   </template>	  
		  			</el-table-column>
		  </el-table>	 
		</template>
		 <el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
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
		pagenum:1,
		//查询条件
		query:""
      }
    },
	methods:{
		//获取WebSosgcket消息分页列表
		getWebSocketMsg(){
			let userID = localStorage.getItem("userID");
			this.$http.get("/websocket/getWebSocketMsge", {
			　　params: { 'userId': userID,pageIndex:this.pagenum,pageSize:this.pagesize }
			}).then(res=>{			
			this.total=res.data.total
			this.tableData=res.data.list
			})
		},
		// 消息已读事件
		readOk(item){
			console.log(item.id)
			this.$http.get("/websocket/readOk", {
			　　params: { id: item.id,"read":item.readStuts }
			}).then(res=>{			
			this.getWebSocketMsg()
			})
			 this.$message({
				  showClose: true,
				  message: '修改已读/未读成功！',
				  type: 'success'
				});
		},
		//删除公告消息
		deleteMsg(item){
			this.$http.get("/websocket/deleteMsg", {
			　　params: { id: item.id }
			}).then(res=>{			
			this.getWebSocketMsg()
			this.$message({
				  showClose: true,
				  message: ""+res.data.code,
				  type: 'success'
				});
			})
			
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
