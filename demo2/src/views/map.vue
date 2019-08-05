<template>
  <div class="a">
   <!-- <input v-model.number="center.lng">
    <input v-model.number="center.lat">
    <input v-model.number="zoom"> -->
    <baidu-map 
        class="map"
        :scroll-wheel-zoom="true"
        :center="center"
        :zoom="zoom"	
        @dragend="syncCenterAndZoom"
        @zoomend="zoomChange"
		@ready="handler">
		<!-- //缩放 -->
		<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
		<!-- //地图类型 -->
		<!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
	 -->	<!-- //定位 -->
		<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
       <!-- //城市列表 -->
		<bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
		<!-- <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_CIRCLE" color="#00F5FF" size="BMAP_POINT_SIZE_HUGE" @click="clickHandler"></bm-point-collection> -->
		<div v-if="show" v-for="(point,index) in points" :key="index"  >
			<div v-if="point.co=='正常'&&point.water=='正常'&&point.pressure=='正常'&&point.weiyi=='正常'">
				<bm-marker :position="{lng: point.lng, lat: point.lat}" :dragging="false" @click="infoWindowOpen($event,index)" :icon="{url: '/static/nomal.ico', size: {width: 60, height: 60}}">
					<bm-info-window :show="point.show" @close="infoWindowClose($event,index)" style="background:#71DD8A;" >
					<!-- 信息窗体内容 -->
					<p>编号:{{point.bianhao}}</p>
					<p>水位:{{point.water}}</p>
					<p>压力:{{point.pressure}}</p>
					<p>位移:{{point.weiyi}}</p>
					<p>天然气浓度:{{point.co}}</p>
					<p>经度:{{point.lng}}</p>
					<p>纬度:{{point.lat}}</p>
					</bm-info-window>
				</bm-marker>
			</div>
			<div v-else>
				<bm-marker :position="{lng: point.lng, lat: point.lat}" :dragging="false" @click="infoWindowOpen($event,index)" :icon="{url: '/static/warn.ico', size: {width: 60, height: 60}}">
					<bm-info-window :show="point.show" @close="infoWindowClose($event,index)" style="background:#842210;" >
					<!-- 信息窗体内容 -->
					<p>编号:{{point.bianhao}}</p>
					<p>水位:{{point.water}}</p>
					<p>压力:{{point.pressure}}</p>
					<p>位移:{{point.weiyi}}</p>
					<p>天然气浓度:{{point.co}}</p>
					<p>经度:{{point.lng}}</p>
					<p>纬度:{{point.lat}}</p>
					</bm-info-window>
				</bm-marker>
			</div>
		</div>
		<div v-if="show1">
			<bm-marker :position="{lng: 108.936, lat: 34.233}" :dragging="true"  :icon="{url: '/static/count.ico', size: {width: 60, height: 60}}">
			 <bm-label content="碑林区:正常:13 异常8" :labelStyle="{color: 'black', fontSize : '15px',backgroundColor:'0.05',border:'0',fontWeight:'bold'}" :offset="{width: -35, height: 65}"/>
			</bm-marker>
			<bm-marker :position="{lng: 108.975, lat: 34.203}" :dragging="false"  :icon="{url: '/static/count.ico', size: {width: 130, height: 130}}">
			 <bm-label content="雁塔区:正常:17 异常4" :labelStyle="{color: 'black', fontSize : '15px',backgroundColor:'0.05',border:'0',fontWeight:'bold'}" :offset="{width: -35, height: 65}"/>
			</bm-marker>
		</div>
		<div v-if="show2">
			<bm-marker :position="{lng: 108.948, lat: 34.347}" :dragging="false"  :icon="{url: '/static/province1.ico', size: {width: 130, height: 130}}">
			 <bm-label content="西安市:正常:21 异常21" :labelStyle="{color: 'black', fontSize : '15px',backgroundColor:'0.05',border:'0',fontWeight:'bold'}" :offset="{width: -15, height: 125}"/>
			</bm-marker>
		</div>
  </baidu-map>
	
  </div>
</template>

<script>
export default {
  data () {
    return {
      center: {
        lng: 108.987124,
        lat: 34.359067
      },
      zoom: 12,
	  lonMin: 0,//最小经度
      lonMax: 0,//最大经度
      latMin: 0,//最小纬度
      latMax: 0,//最大纬度
	  points: [],
	  show: false,
	  show1: false,
	  show2: false
    }
  },
  methods: {
	  //地图移动调用方法
     syncCenterAndZoom (e) {
	  this.zoom = e.target.getZoom()
	  this.lonMin=e.target.getBounds().getSouthWest().lng
	  this.lonMax=e.target.getBounds().getNorthEast().lng
	  this.latMin=e.target.getBounds().getSouthWest().lat
	  this.latMax=e.target.getBounds().getNorthEast().lat
	 
      const {lng, lat} = e.target.getCenter()
	  //根据范围显示
	  if(this.zoom>13){
	     this.show=true
		 this.show1=false
		 this.show2=false
		 this.getAllWellData()
	  }
	  //区
	  if(this.zoom<=13&&this.zoom>=12){
	  	this.show=false
		this.show1=true
		this.show2=false
	  }
	  //市
	  if(this.zoom<12&&this.zoom>9){
	  	this.show=false
	  	this.show1=false
		this.show2=true
	  }
	  if(this.zoom<=9){
	  	this.show=false
	  	this.show1=false
	  	this.show2=false
	  }
	 // console.log(e.target.getBounds().getSouthWest().lng+"adas")
      this.center.lng = lng
      this.center.lat = lat
	  console.log(e.target.getBounds().getSouthWest().lng)
	  console.log(e.target.getBounds().getSouthWest().lat)
	  console.log(e.target.getBounds().getNorthEast().lng)
	  console.log(e.target.getBounds().getNorthEast().lat)
	
    },
	//地图缩放级别改变调用方法
	zoomChange(e){
	  this.lonMin=e.target.getBounds().getSouthWest().lng
	  this.lonMax=e.target.getBounds().getNorthEast().lng
	  this.latMin=e.target.getBounds().getSouthWest().lat
	  this.latMax=e.target.getBounds().getNorthEast().lat
	  this.zoom = e.target.getZoom()
	  //根据范围显示
	 if(this.zoom>13){
	    this.show=true
	 		 this.show1=false
	 		 this.show2=false
	 		 this.getAllWellData()
	 }
	 //区
	 if(this.zoom<=13&&this.zoom>=12){
	 	this.show=false
	 		this.show1=true
	 		this.show2=false
	 }
	 //市
	 if(this.zoom<12&&this.zoom>9){
	 	this.show=false
	 	this.show1=false
	 		this.show2=true
	 }
	 if(this.zoom<=9){
	 	this.show=false
	 	this.show1=false
	 	this.show2=false
	 }
// 	  console.log(e.target.getBounds().getSouthWest().lng)
// 	  console.log(e.target.getBounds().getSouthWest().lat)
// 	  console.log(e.target.getBounds().getNorthEast().lng)
// 	  console.log(e.target.getBounds().getNorthEast().lat)
	},
	handler ({BMap, map}) {
		// 	  console.log(this.map.getBounds().getSouthWest().lng)
    },
	clickHandler (e) {
     // alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
	  alert("井盖信息:co:正常 水位:正常 压力:正常 位移:正常");
    },
	getAllWellData(){
		this.$http.get("/wellData/getAllWellData",{
			params:{lonMin:this.lonMin,lonMax:this.lonMax,latMin:this.latMin,latMax:this.latMax}
		}).then(res=>{
			//返回地图范围内动态数据
			this.points=res.data
			
		})
	},
//     addPoints () {
//       const points = [];
//       for (var i = 0; i < 25; i++) {
//         const position = {lng: 108.970+Math.random(), lat: 34.239+Math.random(),show:false,mes:"asda"}
//         points.push(position)
//       }
//       this.points = points
//     },
	infoWindowClose (event,index) {
     this.points[index].show = false;
    },
    infoWindowOpen (event,index) {
      let show = this.points[index].show;
      this.points[index].show = !show;
    }
  }
}
</script>
<style>
.a{
	height: 100%;
	width: 100%;
}
.map {
  width: 100%;
  height: 99%;
}
</style>