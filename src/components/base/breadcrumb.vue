<template>
    <el-breadcrumb style="margin-bottom:5px" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:data_breadcrumb.level1_to_url}">{{data_breadcrumb.level1}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:data_breadcrumb.level2_to_url}">{{data_breadcrumb.level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    name:'breadcrumb',
    data(){
      return{
        data_breadcrumb:{
          level1:'全国比赛',
          level1_to_url:'',
          level2:'活动详情',
          level2_to_url:'/detail'
        }
      }
    }
}
</script>
