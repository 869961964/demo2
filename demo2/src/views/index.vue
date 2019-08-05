<template>
	<div>
		
	 <el-carousel :interval="5000"  type="card" height="200px"  @change="carouselChange">
		<el-carousel-item v-for="(img,index) in imgList" :key="index">
		  <img style="height: 100%;width: 100%;" v-bind:src="img.url" text="">
		 
		</el-carousel-item>
		
	</el-carousel>
	<section class="data_section">
	
		<el-row :gutter="20" style="margin-bottom: 10px;">
			<el-col :span="4"><div class="data_list all_head"><span class="data_num head">{{data[0]}}数据：</span></div></el-col>
			<el-col :span="4"><div class="data_list"><span class="data_num">{{data[1]}}</span> 总数</div></el-col>
			<el-col :span="4"><div class="data_list"><span class="data_num">{{data[2]}}</span> 正常</div></el-col>
			<el-col :span="4"><div class="data_list"><span class="data_num">{{data[3]}}</span> 异常</div></el-col>
			
		</el-row>
	  <!--  <el-row :gutter="20">
			<el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
			<el-col :span="4"><div class="data_list"><span class="data_num">180</span> 注册用户</div></el-col>
			<el-col :span="4"><div class="data_list"><span class="data_num">180</span> 订单</div></el-col>
			<el-col :span="4"><div class="data_list"><span class="data_num">180</span> 管理员</div></el-col>
			<el-col :span="4"><div class="data_list"><span class="data_num">180</span> 管理员</div></el-col>
		</el-row> -->
	</section>
		<div id="myChart" style="width: 900px; height: 550px;margin-top: -50px;"></div>
		
	 </div>
</template>

<script>

import Avatar from 'vue-avatar'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
	  show1:true,
	  imgList:[
        {url:require('../assets/xian.jpg')},
        {url:require('../assets/jiangsu.jpg')},
		{url:require('../assets/pingyao.jpg')},
		{url:require('../assets/anhui.jpg')},
		{url:require('../assets/beijing.png')}
      ],
	  data:["",,,]
	  }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
	carouselChange: function(key1, key2) {
		if(key1==0){this.data=["西安",42,21,21]}
		if(key1==1){this.data=["江苏",25,13,12]}
		if(key1==2){this.data=["平遥",36,20,16]}
		if(key1==3){this.data=["安徽",50,48,2]}
		if(key1==4){this.data=["北京",47,35,12]}
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
//         myChart.setOption({
//             title: { 
// 				text: '各地区井盖数量',
// 				
// 				},
//             tooltip: {},
//             xAxis: {
//                 data: ["西安","安徽","江苏","北京","平遥"]
//             },
//             yAxis: {},
//             series: [{
//                 name: '参数值：',
//                 type: 'bar',
//                 data: [5, 20, 36, 10, 10],
// 				itemStyle: { 
// 					normal: {
// 					 //随机显示
// 						color:function(params){
// 							if (params.data == 1) {
// 								return "#FFBA4A";
// 							}else if (params.data == 2) {
// 								return "#52BA9F";
// 							}else {
// 								return "#007F5E";
// 							}   
// 						 } 
// 					}
// 				}
//             }],
//         });
		myChart.setOption({ 
				legend: {},
				tooltip: {},
				dataset: {
					source: [
						['product', '总数', '正常', '异常'],
						['西安', 42, 21, 21],
						['江苏', 25, 13, 12],
						['平遥', 36, 20, 16],
						['安徽', 50, 48, 2],
						['北京', 47, 35, 12],
					]
				},
				xAxis: {type: 'category'},
				yAxis: {},
				// Declare several bar series, each will be mapped
				// to a column of dataset.source by default.
				series: [
					{type: 'bar'},
					{type: 'bar'},
					{type: 'bar'}
				]
			});
    }
  }
}
</script>

<style lang="less">
.data_section{
		padding: 20px;
		margin-bottom: 40px;
		margin-left: -15px;
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
    .notify-row{
        line-height:60px;
        float: right;
        margin-right: 20px;
        margin-top: 5px;
    }
	
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0 250px;
  }
  
  .el-carousel__item:nth-child(2n) {
    	 background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
