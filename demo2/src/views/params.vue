<template>
	<div >
		<section class="data_section">
		
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">180</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">180</span> 新增订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">180</span> 新增管理员</div></el-col>
				
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">180</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">180</span> 订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">180</span> 管理员</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">180</span> 管理员</div></el-col>
            </el-row>
		</section>
		
		<div id="myChart" :style="{width: '1000px', height: '550px'}"></div>
	</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { 
				text: '在Vue中使用echarts',
				
				},
            tooltip: {},
            xAxis: {
                data: ["温度","湿度","位移","压力","浓度","水位"]
            },
            yAxis: {},
            series: [{
                name: '参数值：',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
				itemStyle: { 
					normal: {
					 //随机显示
						color:function(params){
							if (params.data == 1) {
								return "#FFBA4A";
							}else if (params.data == 2) {
								return "#52BA9F";
							}else {
								return "#007F5E";
							}   
						 } 
					}
				}
            }],
        });
    }
  }
}
</script>

<style lang="less">
.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;
            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    
</style>
