<template>
	<div >
	<el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{path: '/home/users'  }" class="el-icon-arrow-left">返回</el-breadcrumb-item>
	<!--  <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item :to="{ path: '/home/users' }">角色列表</el-breadcrumb-item> -->
	  <el-breadcrumb-item>权限修改</el-breadcrumb-item>
	</el-breadcrumb>
	
	<el-divider></el-divider><!-- 分割线 -->
  <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入角色名称"
    v-model="value"
    :data="data"
	:titles="title"
	style="margin-top: 20px;">
  </el-transfer>
  </div>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        const cities = ['超级管理员', '管理员', '巡检员'];
        const pinyin = ['chaojiguanliyuan', 'guanliyuan', 'xunjianyuan'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
		title: ['全部权限','已分配权限'],
        data: generateData(),
        value: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    },
	created(){	
		if(this.$route.params.item.roleName=="超级管理员"){
			this.value.push(0)
		}else if(this.$route.params.item.roleName=="管理员"){
			this.value.push(1)
		}else{
		this.value.push(2)
		}
	}
  };
</script>

<style>
</style>
