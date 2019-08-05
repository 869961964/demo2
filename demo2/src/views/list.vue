<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item >井盖管理</el-breadcrumb-item>
		  <el-breadcrumb-item>列表展示</el-breadcrumb-item>
		</el-breadcrumb>
		<el-divider></el-divider><!-- 分割线 -->
		<div class="search">
			<!-- <el-input v-model="query" placeholder="请输入内容"  class="input-with-select">
				<el-button slot="append" icon="el-icon-search"></el-button>	
			</el-input>
			 <el-button type="success" @click="serch">搜索</el-button> -->
			 区域：
			 <el-cascader
				:options="options"
				:props="{ checkStrictly: true }"
				clearable v-model="location"
				placeholder="请选择区域">
			</el-cascader>
			时间：
			<el-date-picker
			  v-model="value1"
			  type="datetimerange"
			  range-separator="至"
			  start-placeholder="开始日期"
			  end-placeholder="结束日期">
			</el-date-picker>
			 <el-button  @click="serch" round class="el-icon-search" style="background: ;">搜索</el-button> 
		</div>
		<template>
		<!-- 表格不需要循环数据，只需将数据传给table即可 -->
		  <el-table
			:data="tableData"
			border
			style="width: 100%;margin-top: 15px;">
			<!-- <el-table-column
			  type="index"
			  width="50">
			</el-table-column> -->
			<el-table-column
			  prop="bianhao"
			  label="编号"
			  width="50">
			</el-table-column>
			<el-table-column
			  prop="co"
			  label="天然气"
			  width="100">
			</el-table-column>
			<el-table-column
			  prop="water"
			  label="水位"
			  width="100">
			</el-table-column>
			<el-table-column
			  width="100"
			  prop="weiyi"
			  label="位移">
			</el-table-column>
			<el-table-column
			  prop="pressure"
			  label="压力"
			  width="100">
			</el-table-column>
			<el-table-column
			  prop="areas"
			  label="区"
			  width="100">
			</el-table-column>
			<el-table-column
			  prop="urban"
			  label="市"
			  width="100">
			</el-table-column>
			<el-table-column
			  prop="province"
			  label="省"
			  width="100">
			</el-table-column>
			<el-table-column
			  prop="time"
			  label="时间">
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
		location:"",
		value1: [new Date(),new Date()],
		options: [{
          value: '陕西省',
          label: '陕西省',
          children: [{
            value: '西安市',
            label: '西安市',
            children: [{
              value: '碑林区',
              label: '碑林区'
            }, {
              value: '雁塔区',
              label: '雁塔区'
            }, {
              value: '未央区',
              label: '未央区'
            }, {
              value: '长安区',
              label: '长安区'
            }]
          }, {
            value: '渭南市',
            label: '渭南市',
            children: [{
              value: '临渭区',
              label: '临渭区'
            }]
          }]
        }, {
          value: '江苏省',
          label: '江苏省',
          children: [{
            value: '南京市',
            label: '南京市',
            children: [{
              value: '建邺区',
              label: '建邺区'
            }, {
              value: '江宁区',
              label: '江宁区'
            }]
          }, {
            value: '镇江市',
            label: '镇江市',
            children: [{
              value: '后台镇',
              label: '后台镇'
            }]
          }]
        }, {
          value: '山西省',
          label: '山西省',
          children: [{
            value: '晋中市',
            label: '晋中市'
          }, {
            value: '太原市',
            label: '太原市'
          }, {
            value: '大同市',
            label: '大同市'
          }]
        }]
      }
    },
	methods:{
		//获取角色分页列表
		getUserPage(){
			this.$http.get("/wellData/listPage",{
				params:{pageIndex:this.pagenum,pageSize:this.pagesize,province:this.location[0],urban:this.location[1],areas:this.location[2]}
			}).then(res=>{
				//返回总条数
				this.total=res.data.total
				this.tableData=res.data.list
			})
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
			console.log(this.a[0])
		},
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
		margin-top: 15px;
		.el-input-group{
			width: 47%;
			margin-right: 5px;
		}
	}
</style>
